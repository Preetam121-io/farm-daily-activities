# Farmers Community Platform

A full-featured social community platform for farmers to share daily farm activities, images, videos, and interact through likes and comments.

## Features

- **Google Authentication**: Secure login with Google accounts
- **Admin-Only Posting**: Only admin can create posts
- **Media Upload**: Support for images and videos
- **Social Features**: Likes and comments on posts
- **Admin Dashboard**: Manage posts and moderate comments
- **Responsive Design**: Works on desktop and mobile

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Firebase
  - Authentication (Google)
  - Firestore Database
  - Storage (images/videos)
- **Hosting**: Firebase Hosting
- **Routing**: React Router

## Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher)
- npm or yarn
- A Firebase account
- A Google account for admin access

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Preetam121-io/farm-daily-activities.git
cd farm-daily-activities
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable services:
   - **Authentication** → Sign-in method → Enable Google
   - **Firestore Database** → Create database (production mode)
   - **Storage** → Create default bucket

4. Get your Firebase config:
   - Go to Project Settings → Your apps → Web app
   - Copy the firebaseConfig object

5. Update `src/firebase.js` with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### 4. Set Admin Email

Update `src/hooks/useAuth.js` with your Google account email:

```javascript
const ADMIN_EMAIL = "your-admin-email@gmail.com";
```

Only this email will have admin access to create/delete posts.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment

### Deploy to Firebase Hosting

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3. Initialize Firebase in your project:

```bash
firebase init hosting
```

- Select your Firebase project
- Set `dist` as public directory
- Configure as single-page app: **Yes**
- Don't overwrite index.html

4. Build and deploy:

```bash
npm run build
firebase deploy
```

Your site will be live at `https://your-project-id.web.app`

## Project Structure

```
farm-daily-activities/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PostList.jsx
│   │   ├── PostCard.jsx
│   │   ├── NewPostForm.jsx
│   │   └── CommentsSection.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Admin.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── firebase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
└── README.md
```

## Usage

### For Admin

1. Login with your admin Google account
2. Navigate to `/admin` route
3. Create new posts with title, content, and optional media
4. View all posts and manage them
5. Delete inappropriate comments

### For Users

1. Login with any Google account
2. View farm activity feed on home page
3. Like posts
4. Add comments on posts
5. View images and videos

## Firestore Data Model

### Posts Collection (`posts`)

```javascript
{
  title: string,
  content: string,
  mediaUrl: string,
  mediaType: "image" | "video",
  createdAt: timestamp,
  likes: number
}
```

### Comments Subcollection (`posts/{postId}/comments`)

```javascript
{
  text: string,
  authorName: string,
  createdAt: timestamp
}
```

## Customization

### Styling

Edit `src/index.css` to customize colors, fonts, and layout.

### Features

You can extend the platform with:

- User profiles
- Post categories
- Search functionality
- Notifications
- Direct messaging

## Security Rules

### Firestore Rules

Add these rules in Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
      
      match /comments/{commentId} {
        allow read: if true;
        allow create: if request.auth != null;
        allow delete: if request.auth != null;
      }
    }
  }
}
```

### Storage Rules

Add these rules in Firebase Console → Storage → Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /posts/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Troubleshooting

**Issue**: Can't login
- Check Firebase Authentication is enabled
- Verify Google sign-in method is enabled
- Check browser allows popups

**Issue**: Can't upload media
- Verify Firebase Storage is created
- Check storage rules allow authenticated writes
- Ensure file size is under 5MB

**Issue**: Can't access admin dashboard
- Verify your email matches ADMIN_EMAIL in useAuth.js
- Must login with exact email address

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.

## Author

Preetam121-io
