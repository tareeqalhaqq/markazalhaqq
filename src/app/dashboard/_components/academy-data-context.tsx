'use client'

import { createContext, useCallback, useContext, useMemo, useReducer } from "react"
import type { ReactNode } from "react"

export type LessonStatus = "draft" | "ready" | "published"

export type Lesson = {
  id: string
  title: string
  status: LessonStatus
  releaseDate?: string
  order: number
}

export type Session = {
  id: string
  title: string
  format: string
  date: string
  time: string
}

export type SessionWithCourse = Session & { courseTitle: string }

export type Resource = {
  id: string
  title: string
  type: string
  size: string
}

export type ResourceWithCourse = Resource & { courseTitle: string }

export type CoursePhase = "Drafting" | "Enrollment" | "Active" | "Revision" | "Archived"

export type Course = {
  id: string
  title: string
  cohort: string
  instructor: string
  phase: CoursePhase
  startDate: string
  isVisibleToStudents: boolean
  lessons: Lesson[]
  sessions: Session[]
  resources: Resource[]
  completedLessonIds: string[]
}

type State = {
  courses: Course[]
}

type CreateCoursePayload = {
  title: string
  instructor: string
  cohort: string
  startDate: string
}

type PublishLessonPayload = {
  courseId: string
  lesson: {
    title: string
    releaseDate?: string
    status?: LessonStatus
  }
  makeCourseVisible?: boolean
}

type ScheduleSessionPayload = {
  courseId: string
  session: {
    title: string
    format: string
    date: string
    time: string
  }
}

type AddResourcePayload = {
  courseId: string
  resource: {
    title: string
    type: string
    size: string
  }
}

type ToggleVisibilityPayload = {
  courseId: string
  isVisible: boolean
}

type MarkLessonCompletePayload = {
  courseId: string
  lessonId: string
}

type SetCoursePhasePayload = {
  courseId: string
  phase: CoursePhase
}

type Action =
  | { type: "CREATE_COURSE"; payload: CreateCoursePayload }
  | { type: "DELETE_COURSE"; payload: { courseId: string } }
  | { type: "PUBLISH_LESSON"; payload: PublishLessonPayload }
  | { type: "SCHEDULE_SESSION"; payload: ScheduleSessionPayload }
  | { type: "ADD_RESOURCE"; payload: AddResourcePayload }
  | { type: "TOGGLE_VISIBILITY"; payload: ToggleVisibilityPayload }
  | { type: "MARK_LESSON_COMPLETE"; payload: MarkLessonCompletePayload }
  | { type: "SET_COURSE_PHASE"; payload: SetCoursePhasePayload }

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

const initialState: State = {
  courses: [
    {
      id: "seerah-foundations",
      title: "Seerah Foundations",
      cohort: "Cohort 1",
      instructor: "Shaykh Musa",
      phase: "Enrollment",
      startDate: "Apr 15, 2024",
      isVisibleToStudents: true,
      lessons: [
        {
          id: "seerah-lesson-1",
          title: "Early life of the Messenger ﷺ",
          status: "published",
          releaseDate: "Apr 5, 2024",
          order: 1,
        },
        {
          id: "seerah-lesson-2",
          title: "The first revelations",
          status: "published",
          releaseDate: "Apr 8, 2024",
          order: 2,
        },
        {
          id: "seerah-lesson-3",
          title: "The Year of Sorrow",
          status: "published",
          releaseDate: "Apr 12, 2024",
          order: 3,
        },
        {
          id: "seerah-lesson-4",
          title: "Migration to Madinah",
          status: "ready",
          releaseDate: "Apr 19, 2024",
          order: 4,
        },
        {
          id: "seerah-lesson-5",
          title: "The Constitution of Madinah",
          status: "draft",
          order: 5,
        },
        {
          id: "seerah-lesson-6",
          title: "Lessons from the Makkan period",
          status: "draft",
          order: 6,
        },
      ],
      sessions: [
        {
          id: "seerah-session-1",
          title: "Live review circle",
          format: "Live seminar",
          date: "Apr 20, 2024",
          time: "7:00 PM GMT",
        },
        {
          id: "seerah-session-2",
          title: "Office hours",
          format: "Q&A",
          date: "Apr 24, 2024",
          time: "5:00 PM GMT",
        },
      ],
      resources: [
        {
          id: "seerah-resource-1",
          title: "Seerah Foundations workbook",
          type: "PDF",
          size: "4.2 MB",
        },
        {
          id: "seerah-resource-2",
          title: "Du'a collection",
          type: "PDF",
          size: "1.4 MB",
        },
      ],
      completedLessonIds: ["seerah-lesson-1", "seerah-lesson-2", "seerah-lesson-3"],
    },
    {
      id: "arabic-primer",
      title: "Arabic Primer",
      cohort: "Cohort 2",
      instructor: "Ustadha Mariam",
      phase: "Drafting",
      startDate: "May 8, 2024",
      isVisibleToStudents: true,
      lessons: [
        {
          id: "arabic-lesson-1",
          title: "Alphabet mastery",
          status: "published",
          releaseDate: "Apr 10, 2024",
          order: 1,
        },
        {
          id: "arabic-lesson-2",
          title: "Nominal sentences",
          status: "ready",
          releaseDate: "Apr 22, 2024",
          order: 2,
        },
        {
          id: "arabic-lesson-3",
          title: "Verb patterns introduction",
          status: "draft",
          order: 3,
        },
      ],
      sessions: [
        {
          id: "arabic-session-1",
          title: "Q&A circle",
          format: "Q&A",
          date: "Apr 24, 2024",
          time: "5:00 PM GMT",
        },
      ],
      resources: [
        {
          id: "arabic-resource-1",
          title: "Arabic vocabulary audio set",
          type: "Audio",
          size: "35 MB",
        },
      ],
      completedLessonIds: ["arabic-lesson-1"],
    },
    {
      id: "fiqh-of-worship",
      title: "Fiqh of Worship",
      cohort: "Founders",
      instructor: "Shaykh Bilal",
      phase: "Revision",
      startDate: "TBD",
      isVisibleToStudents: false,
      lessons: [
        {
          id: "fiqh-lesson-1",
          title: "Purification essentials",
          status: "ready",
          order: 1,
        },
        {
          id: "fiqh-lesson-2",
          title: "Prayer obligations",
          status: "draft",
          order: 2,
        },
      ],
      sessions: [],
      resources: [],
      completedLessonIds: [],
    },
  ],
}

function academyDataReducer(state: State, action: Action): State {
  switch (action.type) {
    case "CREATE_COURSE": {
      const { title, instructor, cohort, startDate } = action.payload
      const newCourse: Course = {
        id: createId("course"),
        title,
        instructor,
        cohort,
        startDate,
        phase: "Drafting",
        isVisibleToStudents: false,
        lessons: [],
        sessions: [],
        resources: [],
        completedLessonIds: [],
      }

      return {
        ...state,
        courses: [...state.courses, newCourse],
      }
    }
    case "DELETE_COURSE": {
      const { courseId } = action.payload
      return {
        ...state,
        courses: state.courses.filter((course) => course.id !== courseId),
      }
    }
    case "PUBLISH_LESSON": {
      const { courseId, lesson, makeCourseVisible } = action.payload
      return {
        ...state,
        courses: state.courses.map((course) => {
          if (course.id !== courseId) {
            return course
          }

          const nextOrder = course.lessons.reduce((max, current) => Math.max(max, current.order), 0) + 1
          const newLesson: Lesson = {
            id: createId("lesson"),
            title: lesson.title,
            status: lesson.status ?? "published",
            releaseDate: lesson.releaseDate,
            order: nextOrder,
          }

          return {
            ...course,
            lessons: [...course.lessons, newLesson],
            phase: makeCourseVisible ? "Active" : course.phase,
            isVisibleToStudents: makeCourseVisible ?? course.isVisibleToStudents,
          }
        }),
      }
    }
    case "SCHEDULE_SESSION": {
      const { courseId, session } = action.payload
      return {
        ...state,
        courses: state.courses.map((course) => {
          if (course.id !== courseId) {
            return course
          }

          const newSession: Session = {
            id: createId("session"),
            ...session,
          }

          return {
            ...course,
            sessions: [...course.sessions, newSession],
          }
        }),
      }
    }
    case "ADD_RESOURCE": {
      const { courseId, resource } = action.payload
      return {
        ...state,
        courses: state.courses.map((course) => {
          if (course.id !== courseId) {
            return course
          }

          const newResource: Resource = {
            id: createId("resource"),
            ...resource,
          }

          return {
            ...course,
            resources: [...course.resources, newResource],
          }
        }),
      }
    }
    case "TOGGLE_VISIBILITY": {
      const { courseId, isVisible } = action.payload
      return {
        ...state,
        courses: state.courses.map((course) =>
          course.id === courseId
            ? {
                ...course,
                isVisibleToStudents: isVisible,
                phase: isVisible && course.phase === "Drafting" ? "Enrollment" : course.phase,
              }
            : course,
        ),
      }
    }
    case "MARK_LESSON_COMPLETE": {
      const { courseId, lessonId } = action.payload
      return {
        ...state,
        courses: state.courses.map((course) => {
          if (course.id !== courseId) {
            return course
          }

          if (course.completedLessonIds.includes(lessonId)) {
            return course
          }

          return {
            ...course,
            completedLessonIds: [...course.completedLessonIds, lessonId],
          }
        }),
      }
    }
    case "SET_COURSE_PHASE": {
      const { courseId, phase } = action.payload
      return {
        ...state,
        courses: state.courses.map((course) =>
          course.id === courseId
            ? {
                ...course,
                phase,
              }
            : course,
        ),
      }
    }
    default:
      return state
  }
}

const AcademyDataContext = createContext<{
  state: State
  createCourse: (payload: CreateCoursePayload) => void
  deleteCourse: (courseId: string) => void
  publishLesson: (payload: PublishLessonPayload) => void
  scheduleSession: (payload: ScheduleSessionPayload) => void
  addResource: (payload: AddResourcePayload) => void
  toggleVisibility: (payload: ToggleVisibilityPayload) => void
  markLessonComplete: (payload: MarkLessonCompletePayload) => void
  setCoursePhase: (payload: SetCoursePhasePayload) => void
} | null>(null)

export function AcademyDataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(academyDataReducer, initialState)

  const createCourse = useCallback((payload: CreateCoursePayload) => {
    dispatch({ type: "CREATE_COURSE", payload })
  }, [])

  const deleteCourse = useCallback((courseId: string) => {
    dispatch({ type: "DELETE_COURSE", payload: { courseId } })
  }, [])

  const publishLesson = useCallback((payload: PublishLessonPayload) => {
    dispatch({ type: "PUBLISH_LESSON", payload })
  }, [])

  const scheduleSession = useCallback((payload: ScheduleSessionPayload) => {
    dispatch({ type: "SCHEDULE_SESSION", payload })
  }, [])

  const addResource = useCallback((payload: AddResourcePayload) => {
    dispatch({ type: "ADD_RESOURCE", payload })
  }, [])

  const toggleVisibility = useCallback((payload: ToggleVisibilityPayload) => {
    dispatch({ type: "TOGGLE_VISIBILITY", payload })
  }, [])

  const markLessonComplete = useCallback((payload: MarkLessonCompletePayload) => {
    dispatch({ type: "MARK_LESSON_COMPLETE", payload })
  }, [])

  const setCoursePhase = useCallback((payload: SetCoursePhasePayload) => {
    dispatch({ type: "SET_COURSE_PHASE", payload })
  }, [])

  const value = useMemo(
    () => ({
      state,
      createCourse,
      deleteCourse,
      publishLesson,
      scheduleSession,
      addResource,
      toggleVisibility,
      markLessonComplete,
      setCoursePhase,
    }),
    [state, createCourse, deleteCourse, publishLesson, scheduleSession, addResource, toggleVisibility, markLessonComplete, setCoursePhase],
  )

  return <AcademyDataContext.Provider value={value}>{children}</AcademyDataContext.Provider>
}

export function useAcademyData() {
  const context = useContext(AcademyDataContext)

  if (!context) {
    throw new Error("useAcademyData must be used within an AcademyDataProvider")
  }

  return context
}

export function getPublishedLessons(course: Course) {
  return course.lessons.filter((lesson) => lesson.status === "published")
}

export function getNextLesson(course: Course) {
  const published = getPublishedLessons(course).sort((a, b) => a.order - b.order)
  return published.find((lesson) => !course.completedLessonIds.includes(lesson.id)) ?? published[published.length - 1]
}

export function getCourseProgress(course: Course) {
  const published = getPublishedLessons(course)
  if (published.length === 0) {
    return 0
  }
  const completed = course.completedLessonIds.filter((id) => published.some((lesson) => lesson.id === id)).length
  return Math.round((completed / published.length) * 100)
}

export function getUpcomingSessions(courses: Course[]): SessionWithCourse[] {
  return courses.flatMap((course) =>
    course.sessions.map((session) => ({ ...session, courseTitle: course.title })),
  )
}

export function getResourceLibrary(courses: Course[]): ResourceWithCourse[] {
  return courses.flatMap((course) =>
    course.resources.map((resource) => ({ ...resource, courseTitle: course.title })),
  )
}
