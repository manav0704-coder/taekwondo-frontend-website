import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

// ============================================================
// Firebase configuration with correct project details
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyB0EpxWkYql0UVCqToDSlbLI87RTyGycLc",
  authDomain: "taekwondo-association-6bd14.firebaseapp.com",
  projectId: "taekwondo-association-6bd14",
  storageBucket: "taekwondo-association-6bd14.firebasestorage.app",
  messagingSenderId: "97425352266",
  appId: "1:97425352266:web:d990851a923c46a08de8b3",
  measurementId: "G-KG538TSBFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Analytics
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (error) {
  // Analytics might not work in SSR or some environments
  console.log("Analytics initialization error:", error);
}

// Configure Google provider with custom parameters
const googleProvider = new GoogleAuthProvider();

// Add scopes if needed
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');

export { auth, googleProvider, analytics }; 