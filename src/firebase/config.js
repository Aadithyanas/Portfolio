// Firebase configuration
// Your web app's Firebase configuration

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDfJQvSmWyh7C8eWvCNyL6Be6BLBAgQcoY",
  authDomain: "protfolio-ai.firebaseapp.com",
  projectId: "protfolio-ai",
  storageBucket: "protfolio-ai.firebasestorage.app",
  messagingSenderId: "528991668662",
  appId: "1:528991668662:web:bfe07064605d78a3dcd917",
  measurementId: "G-KW2D66N4GD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
