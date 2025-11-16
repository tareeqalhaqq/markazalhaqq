import type { User } from "firebase/auth"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore"

import { db } from "@/lib/firebaseClient"

const STARTER_COURSE_ID = "welcome"
const STARTER_COURSE_DOC = {
  title: "Welcome to Markaz al Haqq",
  description: "An introductory course to help you get started with the academy.",
  progress: 0,
}

type EnsureAcademyUserOptions = {
  backfillStarterCourse?: boolean
}

export async function ensureAcademyUser(
  user: User,
  options: EnsureAcademyUserOptions = { backfillStarterCourse: true },
): Promise<void> {
  const userRef = doc(db, "users", user.uid)
  const snapshot = await getDoc(userRef)
  const existing = snapshot.exists() ? snapshot.data() : {}
  const now = serverTimestamp()

  const dataToWrite: Record<string, unknown> = {
    displayName: existing.displayName ?? user.displayName ?? user.email ?? "Academy student",
    email: existing.email ?? user.email ?? null,
    photoURL: existing.photoURL ?? user.photoURL ?? null,
    role: existing.role ?? "student",
    academyRole: existing.academyRole ?? "Student",
    isAcademyStudent: existing.isAcademyStudent ?? false,
    lastLoginAt: now,
    updatedAt: now,
  }

  if (!snapshot.exists()) {
    dataToWrite.createdAt = now
  }

  await setDoc(userRef, dataToWrite, { merge: true })

  if (!options.backfillStarterCourse) {
    return
  }

  const coursesSnapshot = await getDocs(collection(userRef, "academyCourses"))
  if (!coursesSnapshot.empty) {
    return
  }

  const starterCourseRef = doc(collection(userRef, "academyCourses"), STARTER_COURSE_ID)
  await setDoc(
    starterCourseRef,
    {
      ...STARTER_COURSE_DOC,
      createdAt: now,
      updatedAt: now,
    },
    { merge: true },
  )
}
