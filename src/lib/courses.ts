import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  type DocumentSnapshot,
  type FirestoreError,
  type QueryDocumentSnapshot,
  type Timestamp,
} from "firebase/firestore"

import { db } from "./firebaseClient"
import type { AcademyCourse } from "./academy-data"

export type Course = AcademyCourse & { id: string; updatedAt?: Timestamp | Date | string | null }

function mapCourse(snapshot: QueryDocumentSnapshot | DocumentSnapshot): Course {
  const data = snapshot.data() as AcademyCourse
  return { id: snapshot.id, ...data }
}

function coerceDate(value: Timestamp | Date | string | null | undefined) {
  if (!value) return null
  if (value instanceof Date) return value
  if (typeof value === "string") {
    const parsed = new Date(value)
    return Number.isNaN(parsed.getTime()) ? null : parsed
  }

  if (typeof value === "object" && "toDate" in value && typeof value.toDate === "function") {
    return value.toDate()
  }

  return null
}

export async function getPublishedCourses(): Promise<Course[]> {
  const coursesQuery = query(collection(db, "courses"), where("status", "in", ["active", "upcoming"]))

  try {
    const snapshot = await getDocs(coursesQuery)
    return snapshot.docs
      .map((doc) => mapCourse(doc))
      .sort((a, b) => {
        const aDate = coerceDate(a.updatedAt)?.getTime() ?? 0
        const bDate = coerceDate(b.updatedAt)?.getTime() ?? 0
        return bDate - aDate
      })
  } catch (error) {
    const firestoreError = error as FirestoreError
    console.error("Failed to fetch published courses", firestoreError)
    return []
  }
}

export async function getAllCourses(): Promise<Course[]> {
  const coursesQuery = query(collection(db, "courses"), orderBy("updatedAt", "desc"))
  const snapshot = await getDocs(coursesQuery)
  return snapshot.docs.map((doc) => mapCourse(doc))
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const courseDoc = doc(db, "courses", slug)
  const snapshot = await getDoc(courseDoc)

  if (snapshot.exists()) {
    return mapCourse(snapshot)
  }

  const slugQuery = query(collection(db, "courses"), where("slug", "==", slug))
  const slugSnapshot = await getDocs(slugQuery)
  const firstMatch = slugSnapshot.docs[0]
  return firstMatch ? mapCourse(firstMatch) : null
}
