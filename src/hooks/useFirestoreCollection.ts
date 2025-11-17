"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query, type OrderByDirection } from "firebase/firestore"

import { db } from "@/lib/firebaseClient"

type UseFirestoreCollectionOptions = {
  orderByField?: string
  orderDirection?: OrderByDirection
}

export type FirestoreDocument<T> = T & { id: string }

export function useFirestoreCollection<T>(
  collectionPath: string,
  { orderByField, orderDirection = "desc" }: UseFirestoreCollectionOptions = {},
) {
  const [data, setData] = useState<FirestoreDocument<T>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const collectionRef = collection(db, collectionPath)
    const queryConstraints: QueryConstraint[] = []

    if (orderByField) {
      queryConstraints.push(orderBy(orderByField, orderDirection))
    }

    const collectionQuery = queryConstraints.length ? query(collectionRef, ...queryConstraints) : collectionRef

    const unsubscribe = onSnapshot(
      collectionQuery,
      (snapshot) => {
        const nextData: FirestoreDocument<T>[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as T),
        }))

        setData(nextData)
        setLoading(false)
        setError(null)
      },
      (snapshotError) => {
        console.error(`Failed to load collection ${collectionPath}`, snapshotError)
        setError("Unable to load the latest data. Please refresh and try again.")
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [collectionPath, orderByField, orderDirection])

  return { data, loading, error }
}
