"use client"

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
  type Timestamp,
} from "firebase/firestore"

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
  instructorId?: string
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

export type CourseModule = {
  title: string
  order: number
  summary?: string
}

export type CourseLesson = {
  title: string
  order: number
  content?: string
  videoUrl?: string
}

function withTimestamps<T extends Record<string, unknown>>(payload: T) {
  return {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
}

function withUpdateTimestamp<T extends Record<string, unknown>>(payload: T) {
  return {
    ...payload,
    updatedAt: serverTimestamp(),
  }
}

export async function createCourse(course: AcademyCourse) {
  await addDoc(collection(db, "courses"), withTimestamps(course))
}

export async function updateCourse(courseId: string, updates: Partial<AcademyCourse>) {
  const courseRef = doc(db, "courses", courseId)
  await updateDoc(courseRef, withUpdateTimestamp(updates))
}

export async function deleteCourse(courseId: string) {
  const courseRef = doc(db, "courses", courseId)
  await deleteDoc(courseRef)
}

export async function createCourseModule(courseId: string, module: CourseModule) {
  const modulesCollection = collection(db, "courses", courseId, "modules")
  await addDoc(modulesCollection, withTimestamps(module))
}

export async function updateCourseModule(
  courseId: string,
  moduleId: string,
  updates: Partial<CourseModule>,
) {
  const moduleRef = doc(db, "courses", courseId, "modules", moduleId)
  await updateDoc(moduleRef, withUpdateTimestamp(updates))
}

export async function deleteCourseModule(courseId: string, moduleId: string) {
  const moduleRef = doc(db, "courses", courseId, "modules", moduleId)
  await deleteDoc(moduleRef)
}

export async function createCourseLesson(courseId: string, moduleId: string, lesson: CourseLesson) {
  const lessonsCollection = collection(db, "courses", courseId, "modules", moduleId, "lessons")
  await addDoc(lessonsCollection, withTimestamps(lesson))
}

export async function updateCourseLesson(
  courseId: string,
  moduleId: string,
  lessonId: string,
  updates: Partial<CourseLesson>,
) {
  const lessonRef = doc(db, "courses", courseId, "modules", moduleId, "lessons", lessonId)
  await updateDoc(lessonRef, withUpdateTimestamp(updates))
}

export async function deleteCourseLesson(courseId: string, moduleId: string, lessonId: string) {
  const lessonRef = doc(db, "courses", courseId, "modules", moduleId, "lessons", lessonId)
  await deleteDoc(lessonRef)
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
