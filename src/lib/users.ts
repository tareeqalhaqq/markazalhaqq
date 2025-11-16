import { doc, setDoc } from "firebase/firestore"

import { db } from "./firebaseClient"

interface UpsertUserDocumentOptions {
  uid: string
  email: string
  fullName: string
}

export async function upsertUserDocument({ uid, email, fullName }: UpsertUserDocumentOptions) {
  const userRef = doc(db, "users", uid)

  await setDoc(
    userRef,
    {
      email,
      fullName,
    },
    { merge: true }
  )
}
