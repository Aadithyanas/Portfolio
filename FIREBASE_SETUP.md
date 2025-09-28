# Firebase Setup Guide

## 🚀 Quick Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `your-portfolio`
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Firestore Database
1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose closest to you)
5. Click "Done"

### 3. Enable Storage
1. Go to "Storage" in Firebase Console
2. Click "Get started"
3. Choose "Start in test mode"
4. Select same location as Firestore
5. Click "Done"

### 4. Get Firebase Config
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon (`</>`)
4. Enter app nickname: `portfolio-web`
5. Click "Register app"
6. Copy the config object

### 5. Update Firebase Config
Replace the placeholder values in `src/firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id"
};
```

### 6. Install Firebase (if not already installed)
```bash
npm install firebase
```

## 🔒 Security Rules (Optional)

### Firestore Rules
Go to Firestore > Rules and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to projects
    match /projects/{document} {
      allow read: if true;
      allow write: if false; // Only allow through admin panel
    }
  }
}
```

### Storage Rules
Go to Storage > Rules and update:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{allPaths=**} {
      allow read: if true;
      allow write: if false; // Only allow through admin panel
    }
  }
}
```

## 🎯 Features

### ✅ What Works Now
- **Static Data Fallback**: Works without Firebase
- **Dynamic Project Addition**: Add projects via admin panel
- **Image Upload**: Upload project images to Firebase Storage
- **Password Protection**: Admin access with password
- **Real-time Updates**: Projects update automatically

### 🔧 Admin Access
- **Password**: `admin123` (change in `AddProject.jsx`)
- **Access**: Click "Add Project" in navbar
- **Security**: Only you can add projects

## 🚨 Important Notes

1. **Change Admin Password**: Update `ADMIN_PASSWORD` in `AddProject.jsx`
2. **Firebase Security**: Set up proper security rules for production
3. **Image Optimization**: Consider compressing images before upload
4. **Backup**: Keep your static data as backup

## 🐛 Troubleshooting

### Firebase Not Working?
- Check console for errors
- Verify Firebase config is correct
- Ensure Firestore and Storage are enabled
- Check internet connection

### Images Not Uploading?
- Verify Storage rules allow uploads
- Check file size (max 10MB)
- Ensure image format is supported

### Projects Not Showing?
- Check Firestore has data
- Verify collection name is "projects"
- Check browser console for errors

## 📱 Testing

1. **Without Firebase**: Should show static projects
2. **With Firebase**: Should show Firebase projects
3. **Add Project**: Should work with correct password
4. **Image Upload**: Should upload and display correctly

## 🔄 Migration from Static to Dynamic

1. Set up Firebase (steps above)
2. Your static projects will still work
3. New projects added via admin panel
4. Gradually migrate static projects to Firebase
5. Remove static data when ready

---

**Need Help?** Check the Firebase documentation or create an issue in your repository.
