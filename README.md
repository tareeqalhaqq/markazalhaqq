# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Firestore security rules

Publish these rules in Firebase to support authenticated onboarding and admin-only collections:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() {
      return request.auth != null;
    }

    function isSameUser(userId) {
      return signedIn() && request.auth.uid == userId;
    }

    function isAdmin() {
      return signedIn() &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    match /users/{userId} {
      allow create: if isSameUser(userId);
      allow read: if isSameUser(userId);
      allow update: if (isSameUser(userId) && request.resource.data.role == resource.data.role) || isAdmin();
    }

    match /users/{userId}/academyCourses/{courseId} {
      allow read, write: if isSameUser(userId);
    }

    match /admin_content/{document=**} {
      allow read, write: if isAdmin();
    }
  }
}
```

These rules ensure:

- Every authenticated user can create and manage their own `users/{uid}` profile document.
- Only admins (users whose Firestore `role` is set to `admin`) may change another user’s role or access `admin_content`.
- Students cannot self-promote because updates that change the `role` field are rejected unless the request is made by an admin.

## Course management model

For a full course catalog with modules and lessons, organise Firestore like this:

- `courses` collection (one document per course) with fields such as `title`, `description`, `instructorId`, `status`, `createdAt`, and `updatedAt`.
- `modules` subcollection under each course document with `title` and `order` fields to control sequencing.
- `lessons` subcollection under each module document with `title`, `content`, `videoUrl`, and `order` fields.
- `users` collection stores profile data including a boolean `isAdmin` flag that gates write access.

Recommended security rules to mirror this structure:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }

    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }

    match /courses/{courseId} {
      allow read: if isAuthenticated();
      allow create, update, delete: if isAdmin();

      match /modules/{moduleId} {
        allow read: if isAuthenticated();
        allow create, update, delete: if isAdmin();

        match /lessons/{lessonId} {
          allow read: if isAuthenticated();
          allow create, update, delete: if isAdmin();
        }
      }
    }

    match /users/{userId} {
      allow read: if isAuthenticated() && (userId == request.auth.uid || isAdmin());
      allow create, update: if isAdmin();
    }
  }
}
```

These rules keep course content readable to all signed-in learners while restricting course, module, and lesson edits to admins.

## Deploying to Cloudflare Pages

Generate the static output with the Cloudflare Next.js adapter, then deploy the Pages build output. A single command wraps both steps and guarantees the Pages-specific deploy command is used:

```bash
npm run cf:deploy
```

`cf:deploy` runs the adapter build (`npx @cloudflare/next-on-pages build`) and then executes `wrangler pages deploy .vercel/output/static` so Pages deployments use the correct command instead of the Workers-only `wrangler deploy`.

If you see the error "Workers-specific command in a Pages project," it means `wrangler deploy` was used by mistake. Switch to `npm run cf:deploy` (or at least `npm run deploy`, which wraps `wrangler pages deploy`) or run `wrangler pages deploy .vercel/output/static` directly after the Next.js adapter build.
