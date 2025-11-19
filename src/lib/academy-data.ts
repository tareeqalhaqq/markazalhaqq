"use client"

import { addDoc, collection, serverTimestamp, type Timestamp } from "firebase/firestore"

import { db } from "./firebaseClient"

export type AcademyCourse = {
  title: string
  instructor: string
  level: string
  status: "upcoming" | "active" | "completed"
  slug?: string
  description: string
  startDate?: string | Date | Timestamp
  lessonCount?: number
  completedLessons?: number
  coverImage?: string
  updatedAt?: string | Date | Timestamp
}

export type LiveSession = {
  title: string
  courseTitle: string
  presenter: string
  scheduledAt: string
  format: string
  link?: string
}

export type ResourceLibraryItem = {
  title: string
  courseTitle: string
  type: string
  embedUrl: string
  downloadUrl: string
}

export type Announcement = {
  title: string
  body: string
  audience: string
  publishedAt?: string
}

export type ExamOrCertification = {
  title: string
  courseTitle: string
  status: string
  availableOn?: string
  proctored?: boolean
}

export type TeacherProfile = {
  fullName: string
  email: string
  specialty: string
}

function withTimestamps<T extends Record<string, unknown>>(payload: T) {
  return {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
}

export async function createCourse(course: AcademyCourse) {
  await addDoc(collection(db, "courses"), withTimestamps(course))
}

export async function createLiveSession(session: LiveSession) {
  await addDoc(collection(db, "liveSessions"), withTimestamps(session))
}

export async function createResource(resource: ResourceLibraryItem) {
  await addDoc(collection(db, "resources"), withTimestamps(resource))
}

export async function createAnnouncement(announcement: Announcement) {
  await addDoc(collection(db, "announcements"), withTimestamps(announcement))
}

export async function createExamOrCertification(exam: ExamOrCertification) {
  await addDoc(collection(db, "exams"), withTimestamps(exam))
}

export async function createTeacherProfile(teacher: TeacherProfile) {
  await addDoc(collection(db, "teachers"), withTimestamps(teacher))
}
