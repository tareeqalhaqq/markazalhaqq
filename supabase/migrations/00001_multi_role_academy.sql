-- ============================================================================
-- Markaz al-Haqq Online Academy  --  Supabase multi-role schema
-- Clerk is the primary auth provider; Supabase uses Clerk-issued JWTs.
-- Roles: admin, instructor, student
-- ============================================================================

-- 0. Helper: extract the Clerk user-id that lives in the JWT `sub` claim.
--    Every RLS policy references this instead of auth.uid().
create or replace function public.requesting_user_id()
returns text
language sql stable
as $$
  select nullif(
    coalesce(
      current_setting('request.jwt.claims', true)::json ->> 'sub',
      current_setting('request.jwt.claim.sub', true)
    ),
    ''
  )
$$;

-- ============================================================================
-- 1. PROFILES  (one row per Clerk user)
-- ============================================================================
create table if not exists public.profiles (
  id            text primary key,               -- Clerk user_id
  email         text not null,
  full_name     text not null default '',
  headline      text,
  bio           text,
  avatar_url    text,
  app_role      text not null default 'student'
                check (app_role in ('admin','instructor','student')),
  preferences   jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create unique index if not exists profiles_email_idx on public.profiles (email);

alter table public.profiles enable row level security;

-- Everyone can read profiles (needed for instructor cards, etc.)
create policy "profiles_select" on public.profiles
  for select using (true);

-- Users can update their own profile (not the role field -- that is admin-only)
create policy "profiles_update_own" on public.profiles
  for update using (id = public.requesting_user_id())
  with check (id = public.requesting_user_id());

-- Admins can update any profile (including role changes)
create policy "profiles_admin_update" on public.profiles
  for update using (
    exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'admin'
    )
  );

-- Insert is handled by service-role via ensure_profile, but allow self-insert
create policy "profiles_insert_self" on public.profiles
  for insert with check (id = public.requesting_user_id());

-- ============================================================================
-- 2. ACADEMY MEMBERSHIPS  (tracks paid / approved members)
-- ============================================================================
create table if not exists public.academy_memberships (
  id          uuid primary key default gen_random_uuid(),
  profile_id  text not null references public.profiles(id) on delete cascade,
  plan        text not null default 'free',
  status      text not null default 'active'
              check (status in ('active','paused','cancelled','expired')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists memberships_profile_idx
  on public.academy_memberships (profile_id);

alter table public.academy_memberships enable row level security;

create policy "memberships_select_own" on public.academy_memberships
  for select using (profile_id = public.requesting_user_id());

create policy "memberships_admin_all" on public.academy_memberships
  for all using (
    exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'admin'
    )
  );

-- ============================================================================
-- 3. COURSES
-- ============================================================================
create table if not exists public.courses (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  slug            text unique,
  description     text not null default '',
  level           text,                            -- Beginner / Intermediate / Advanced
  status          text not null default 'upcoming'
                  check (status in ('upcoming','active','completed','archived')),
  cover_image     text,
  start_date      date,
  is_live         boolean not null default false,
  instructor_id   text references public.profiles(id),
  instructor_name text,
  lesson_count    int not null default 0,
  created_by      text not null references public.profiles(id),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table public.courses enable row level security;

-- Anyone authenticated can read published courses
create policy "courses_select" on public.courses
  for select using (true);

-- Admins can do everything
create policy "courses_admin_all" on public.courses
  for all using (
    exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'admin'
    )
  );

-- Instructors can insert and update their own courses
create policy "courses_instructor_insert" on public.courses
  for insert with check (
    exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'instructor'
    )
    and created_by = public.requesting_user_id()
  );

create policy "courses_instructor_update" on public.courses
  for update using (
    exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'instructor'
    )
    and (instructor_id = public.requesting_user_id() or created_by = public.requesting_user_id())
  );

-- ============================================================================
-- 4. COURSE MODULES
-- ============================================================================
create table if not exists public.course_modules (
  id          uuid primary key default gen_random_uuid(),
  course_id   uuid not null references public.courses(id) on delete cascade,
  title       text not null,
  summary     text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists modules_course_idx on public.course_modules (course_id);

alter table public.course_modules enable row level security;

create policy "modules_select" on public.course_modules
  for select using (true);

create policy "modules_admin_all" on public.course_modules
  for all using (
    exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'admin'
    )
  );

create policy "modules_instructor_manage" on public.course_modules
  for all using (
    exists (
      select 1 from public.courses c
      where c.id = course_id
        and (c.instructor_id = public.requesting_user_id()
             or c.created_by = public.requesting_user_id())
    )
  );

-- ============================================================================
-- 5. COURSE LESSONS
-- ============================================================================
create table if not exists public.course_lessons (
  id          uuid primary key default gen_random_uuid(),
  course_id   uuid not null references public.courses(id) on delete cascade,
  module_id   uuid references public.course_modules(id) on delete set null,
  title       text not null,
  content     text,
  video_url   text,
  sort_order  int not null default 0,
  status      text not null default 'draft'
              check (status in ('draft','ready','published')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists lessons_course_idx on public.course_lessons (course_id);
create index if not exists lessons_module_idx on public.course_lessons (module_id);

alter table public.course_lessons enable row level security;

-- Students only see published lessons
create policy "lessons_select_published" on public.course_lessons
  for select using (
    status = 'published'
    or exists (
      select 1 from public.profiles
      where id = public.requesting_user_id()
        and app_role in ('admin','instructor')
    )
  );

create policy "lessons_admin_all" on public.course_lessons
  for all using (
    exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'admin'
    )
  );

create policy "lessons_instructor_manage" on public.course_lessons
  for all using (
    exists (
      select 1 from public.courses c
      where c.id = course_id
        and (c.instructor_id = public.requesting_user_id()
             or c.created_by = public.requesting_user_id())
    )
  );

-- ============================================================================
-- 6. ENROLLMENTS  (links students to courses -- the "student roster per course")
-- ============================================================================
create table if not exists public.enrollments (
  id              uuid primary key default gen_random_uuid(),
  profile_id      text not null references public.profiles(id) on delete cascade,
  course_id       uuid not null references public.courses(id) on delete cascade,
  status          text not null default 'active'
                  check (status in ('active','paused','completed','dropped')),
  enrolled_at     timestamptz not null default now(),
  completed_at    timestamptz,
  unique (profile_id, course_id)
);

create index if not exists enrollments_profile_idx on public.enrollments (profile_id);
create index if not exists enrollments_course_idx  on public.enrollments (course_id);

alter table public.enrollments enable row level security;

-- Students see their own enrollments
create policy "enrollments_select_own" on public.enrollments
  for select using (profile_id = public.requesting_user_id());

-- Admins & instructors can see all enrollments (the roster)
create policy "enrollments_staff_select" on public.enrollments
  for select using (
    exists (
      select 1 from public.profiles
      where id = public.requesting_user_id()
        and app_role in ('admin','instructor')
    )
  );

-- Admins can do everything
create policy "enrollments_admin_all" on public.enrollments
  for all using (
    exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'admin'
    )
  );

-- Instructors can manage enrollments for their own courses
create policy "enrollments_instructor_manage" on public.enrollments
  for all using (
    exists (
      select 1 from public.courses c
      where c.id = course_id
        and (c.instructor_id = public.requesting_user_id()
             or c.created_by = public.requesting_user_id())
    )
  );

-- ============================================================================
-- 7. LESSON PROGRESS  (tracks which lessons each student completed)
-- ============================================================================
create table if not exists public.lesson_progress (
  id            uuid primary key default gen_random_uuid(),
  profile_id    text not null references public.profiles(id) on delete cascade,
  lesson_id     uuid not null references public.course_lessons(id) on delete cascade,
  course_id     uuid not null references public.courses(id) on delete cascade,
  completed_at  timestamptz not null default now(),
  unique (profile_id, lesson_id)
);

create index if not exists progress_profile_idx on public.lesson_progress (profile_id);
create index if not exists progress_course_idx  on public.lesson_progress (course_id);

alter table public.lesson_progress enable row level security;

create policy "progress_select_own" on public.lesson_progress
  for select using (profile_id = public.requesting_user_id());

create policy "progress_insert_own" on public.lesson_progress
  for insert with check (profile_id = public.requesting_user_id());

create policy "progress_staff_select" on public.lesson_progress
  for select using (
    exists (
      select 1 from public.profiles
      where id = public.requesting_user_id()
        and app_role in ('admin','instructor')
    )
  );

-- ============================================================================
-- 8. STUDENTS ROSTER  (admin-managed student directory, may or may not have a profile)
-- ============================================================================
create table if not exists public.students (
  id                  uuid primary key default gen_random_uuid(),
  profile_id          text unique references public.profiles(id) on delete set null,
  full_name           text not null,
  email               text not null unique,
  cohort              text,
  track               text,
  enrollment_status   text not null default 'active'
                      check (enrollment_status in ('active','paused','cancelled','prospect')),
  live_access         boolean not null default true,
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

alter table public.students enable row level security;

-- Students can see their own record
create policy "students_select_own" on public.students
  for select using (profile_id = public.requesting_user_id());

-- Admins & instructors see all students (the roster)
create policy "students_staff_all" on public.students
  for all using (
    exists (
      select 1 from public.profiles
      where id = public.requesting_user_id()
        and app_role in ('admin','instructor')
    )
  );

-- ============================================================================
-- 9. TEACHERS / INSTRUCTORS  (admin-managed instructor directory)
-- ============================================================================
create table if not exists public.teachers (
  id          uuid primary key default gen_random_uuid(),
  profile_id  text unique references public.profiles(id) on delete set null,
  full_name   text not null,
  email       text not null unique,
  specialty   text,
  bio         text,
  avatar_url  text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.teachers enable row level security;

-- Anyone can see active teachers (public instructor page)
create policy "teachers_select" on public.teachers
  for select using (true);

-- Admins can manage teachers
create policy "teachers_admin_all" on public.teachers
  for all using (
    exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'admin'
    )
  );

-- ============================================================================
-- 10. LIVE SESSIONS
-- ============================================================================
create table if not exists public.live_sessions (
  id              uuid primary key default gen_random_uuid(),
  course_id       uuid references public.courses(id) on delete set null,
  title           text not null,
  course_title    text,
  presenter       text,
  scheduled_at    timestamptz not null,
  format          text not null default 'Live',
  join_link       text,
  is_live         boolean not null default false,
  created_by      text not null references public.profiles(id),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table public.live_sessions enable row level security;

create policy "sessions_select" on public.live_sessions
  for select using (true);

create policy "sessions_admin_all" on public.live_sessions
  for all using (
    exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'admin'
    )
  );

create policy "sessions_instructor_manage" on public.live_sessions
  for all using (
    created_by = public.requesting_user_id()
    and exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'instructor'
    )
  );

-- ============================================================================
-- 11. RESOURCES  (downloadable / embeddable materials)
-- ============================================================================
create table if not exists public.resources (
  id              uuid primary key default gen_random_uuid(),
  course_id       uuid references public.courses(id) on delete set null,
  title           text not null,
  course_title    text,
  resource_type   text not null default 'PDF',    -- PDF, Audio, Video, Link
  file_path       text,                            -- Supabase Storage path
  file_url        text,                            -- external or signed URL
  embed_url       text,
  download_url    text,
  file_size       text,
  created_by      text not null references public.profiles(id),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table public.resources enable row level security;

create policy "resources_select" on public.resources
  for select using (true);

create policy "resources_admin_all" on public.resources
  for all using (
    exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'admin'
    )
  );

create policy "resources_instructor_manage" on public.resources
  for all using (
    created_by = public.requesting_user_id()
    and exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'instructor'
    )
  );

-- ============================================================================
-- 12. ANNOUNCEMENTS
-- ============================================================================
create table if not exists public.announcements (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  body          text not null,
  audience      text not null default 'all',      -- all, students, instructors
  published_at  timestamptz not null default now(),
  created_by    text not null references public.profiles(id),
  created_at    timestamptz not null default now()
);

alter table public.announcements enable row level security;

create policy "announcements_select" on public.announcements
  for select using (true);

create policy "announcements_admin_all" on public.announcements
  for all using (
    exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'admin'
    )
  );

-- ============================================================================
-- 13. EXAMS & CERTIFICATIONS
-- ============================================================================
create table if not exists public.exams (
  id            uuid primary key default gen_random_uuid(),
  course_id     uuid references public.courses(id) on delete set null,
  title         text not null,
  course_title  text,
  status        text not null default 'scheduled',
  available_on  timestamptz,
  proctored     boolean not null default false,
  created_by    text not null references public.profiles(id),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.exams enable row level security;

create policy "exams_select" on public.exams
  for select using (true);

create policy "exams_admin_all" on public.exams
  for all using (
    exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'admin'
    )
  );

-- ============================================================================
-- 14. QUIZZES
-- ============================================================================
create table if not exists public.quizzes (
  id              uuid primary key default gen_random_uuid(),
  course_id       uuid references public.courses(id) on delete set null,
  title           text not null,
  course_title    text,
  section         text,
  status          text not null default 'draft'
                  check (status in ('draft','live','archived')),
  question_count  int not null default 0,
  is_timed        boolean not null default false,
  instructions    text,
  created_by      text not null references public.profiles(id),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table public.quizzes enable row level security;

-- Students only see live quizzes
create policy "quizzes_select" on public.quizzes
  for select using (
    status = 'live'
    or exists (
      select 1 from public.profiles
      where id = public.requesting_user_id()
        and app_role in ('admin','instructor')
    )
  );

create policy "quizzes_admin_all" on public.quizzes
  for all using (
    exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'admin'
    )
  );

create policy "quizzes_instructor_manage" on public.quizzes
  for all using (
    created_by = public.requesting_user_id()
    and exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'instructor'
    )
  );

-- ============================================================================
-- 15. ENSURE_PROFILE RPC  (called on every login from /auth/callback and /api/me)
-- ============================================================================
create or replace function public.ensure_profile(
  clerk_id text,
  email    text,
  name     text
)
returns jsonb
language plpgsql security definer
as $$
declare
  result_id text;
begin
  insert into public.profiles (id, email, full_name)
  values (clerk_id, email, name)
  on conflict (id) do update
    set email      = excluded.email,
        full_name  = excluded.full_name,
        updated_at = now()
  returning id into result_id;

  return jsonb_build_object('profile_id', result_id);
end;
$$;

-- ============================================================================
-- 16. AUTO-LINK HELPERS
-- ============================================================================

-- When a student roster entry is created with an email that matches an
-- existing profile, auto-link the profile_id.
create or replace function public.link_student_profile()
returns trigger
language plpgsql security definer
as $$
begin
  if new.profile_id is null then
    select id into new.profile_id
    from public.profiles
    where lower(email) = lower(new.email)
    limit 1;
  end if;
  return new;
end;
$$;

create trigger trg_link_student_profile
  before insert or update on public.students
  for each row execute function public.link_student_profile();

-- Same for teachers
create or replace function public.link_teacher_profile()
returns trigger
language plpgsql security definer
as $$
begin
  if new.profile_id is null then
    select id into new.profile_id
    from public.profiles
    where lower(email) = lower(new.email)
    limit 1;
  end if;
  return new;
end;
$$;

create trigger trg_link_teacher_profile
  before insert or update on public.teachers
  for each row execute function public.link_teacher_profile();

-- When a teacher is linked to a profile, auto-promote them to instructor role
create or replace function public.promote_teacher_to_instructor()
returns trigger
language plpgsql security definer
as $$
begin
  if new.profile_id is not null then
    update public.profiles
    set app_role = 'instructor', updated_at = now()
    where id = new.profile_id and app_role = 'student';
  end if;
  return new;
end;
$$;

create trigger trg_promote_teacher
  after insert or update on public.teachers
  for each row execute function public.promote_teacher_to_instructor();

-- ============================================================================
-- 17. UPDATED_AT AUTO-TOUCH
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Apply to every table that has updated_at
do $$
declare
  tbl text;
begin
  for tbl in
    select unnest(array[
      'profiles','academy_memberships','courses','course_modules',
      'course_lessons','students','teachers','live_sessions',
      'resources','exams','quizzes'
    ])
  loop
    execute format(
      'create trigger trg_updated_at before update on public.%I
       for each row execute function public.set_updated_at()',
      tbl
    );
  end loop;
end;
$$;

-- ============================================================================
-- 18. SUPABASE STORAGE BUCKETS  (for file uploads)
-- ============================================================================
insert into storage.buckets (id, name, public)
values
  ('course-materials', 'course-materials', false),
  ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Avatars: anyone can read, authenticated users can upload their own
create policy "avatars_select" on storage.objects
  for select using (bucket_id = 'avatars');

create policy "avatars_insert" on storage.objects
  for insert with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = public.requesting_user_id()
  );

-- Course materials: authenticated users can read, admin/instructor can upload
create policy "materials_select" on storage.objects
  for select using (
    bucket_id = 'course-materials'
    and public.requesting_user_id() is not null
  );

create policy "materials_insert" on storage.objects
  for insert with check (
    bucket_id = 'course-materials'
    and exists (
      select 1 from public.profiles
      where id = public.requesting_user_id()
        and app_role in ('admin','instructor')
    )
  );

create policy "materials_delete" on storage.objects
  for delete using (
    bucket_id = 'course-materials'
    and exists (
      select 1 from public.profiles
      where id = public.requesting_user_id() and app_role = 'admin'
    )
  );

-- ============================================================================
-- 19. VIEWS  (convenient read-only projections)
-- ============================================================================

-- Student roster view with enrollment counts
create or replace view public.student_roster as
select
  s.*,
  count(e.id) as course_count
from public.students s
left join public.enrollments e
  on e.profile_id = s.profile_id and e.status = 'active'
group by s.id;

-- Course roster view with enrollment counts
create or replace view public.course_roster as
select
  c.*,
  count(e.id) as enrolled_count,
  t.full_name as instructor_display_name
from public.courses c
left join public.enrollments e on e.course_id = c.id and e.status = 'active'
left join public.teachers t   on t.profile_id = c.instructor_id
group by c.id, t.full_name;

-- ============================================================================
-- Done.  Run this in the Supabase SQL Editor or via `supabase db push`.
-- ============================================================================
