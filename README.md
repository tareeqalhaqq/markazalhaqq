# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Firestore security rules

To allow the client helpers to create the `users/{uid}` document for every authenticated user, publish the following rules in
Firebase:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /users/{userId}/academyCourses/{courseId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /academyCourses/{courseId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```
