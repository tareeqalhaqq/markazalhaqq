import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  type DocumentSnapshot,
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

export async function getPublishedCourses(): Promise<Course[]> {
  const coursesQuery = query(collection(db, "courses"), where("status", "in", ["active", "upcoming"]), orderBy("updatedAt", "desc"))
  const snapshot = await getDocs(coursesQuery)
  return snapshot.docs.map((doc) => mapCourse(doc))
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
