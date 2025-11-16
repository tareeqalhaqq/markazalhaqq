import { getApp, getApps, initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCYmVw7fvvpL4kLZ8tltIq7AhZ1BLk46Qo",
  authDomain: "tareeqalhaqqorg.firebaseapp.com",
  projectId: "tareeqalhaqqorg",
  storageBucket: "tareeqalhaqqorg.firebasestorage.app",
  messagingSenderId: "145363788648",
  appId: "1:145363788648:web:8119054fb3f9f9bd7facdd",
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

export const googleProvider = new GoogleAuthProvider()

const appleAuthEnabled = process.env.NEXT_PUBLIC_ENABLE_APPLE_AUTH === "true"
export const appleProvider = appleAuthEnabled ? new OAuthProvider("apple.com") : null

export { app }
