"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { collection, doc, getDoc, getDocs, type DocumentData } from "firebase/firestore"

import { auth, db } from "@/lib/firebaseClient"
import { ensureAcademyUser } from "@/lib/ensureAcademyUser"

type AcademyCourse = DocumentData & { id: string }

type UseAcademyUserResult = {
  firebaseUser: User | null
  userDoc: (DocumentData & { id: string }) | null
  courses: AcademyCourse[]
  loading: boolean
}

export function useAcademyUser(): UseAcademyUserResult {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null)
  const [userDoc, setUserDoc] = useState<(DocumentData & { id: string }) | null>(null)
  const [courses, setCourses] = useState<AcademyCourse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setFirebaseUser(currentUser)

      if (!currentUser) {
        setUserDoc(null)
        setCourses([])
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        await ensureAcademyUser(currentUser)
        const userRef = doc(db, "users", currentUser.uid)
        const userSnapshot = await getDoc(userRef)

        setUserDoc(userSnapshot.exists() ? { id: userSnapshot.id, ...userSnapshot.data() } : null)

        const coursesSnapshot = await getDocs(collection(userRef, "academyCourses"))
        const nextCourses: AcademyCourse[] = coursesSnapshot.docs.map((courseDoc) => ({
          id: courseDoc.id,
          ...courseDoc.data(),
        }))

        setCourses(nextCourses)
      } catch (error) {
        console.error("Failed to load academy user data", error)
        setCourses([])
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return { firebaseUser, userDoc, courses, loading }
}
