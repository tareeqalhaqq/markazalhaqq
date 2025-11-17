# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Firestore security rules

Publish these rules in Firebase to support authenticated onboarding and admin-only collections:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() {
      return request.auth != null;
    }

    function isSameUser(userId) {
      return signedIn() && request.auth.uid == userId;
    }

    function isAdmin() {
      return signedIn() &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    match /users/{userId} {
      allow create: if isSameUser(userId);
      allow read: if isSameUser(userId);
      allow update: if (isSameUser(userId) && request.resource.data.role == resource.data.role) || isAdmin();
    }

    match /users/{userId}/academyCourses/{courseId} {
      allow read, write: if isSameUser(userId);
    }

    match /admin_content/{document=**} {
      allow read, write: if isAdmin();
    }
  }
}
```

These rules ensure:

- Every authenticated user can create and manage their own `users/{uid}` profile document.
- Only admins (users whose Firestore `role` is set to `admin`) may change another user’s role or access `admin_content`.
- Students cannot self-promote because updates that change the `role` field are rejected unless the request is made by an admin.
