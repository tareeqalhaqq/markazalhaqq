import { type FirebaseApp, getApp, getApps, initializeApp } from "firebase/app"
import { type Firestore, getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let app: FirebaseApp
let db: Firestore

try {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  db = getFirestore(app)
} catch (error) {
  console.error("Firebase initialization failed:", error)
  app = getApps().length ? getApp() : initializeApp({ projectId: "placeholder" })
  db = getFirestore(app)
}

export { app, db }
