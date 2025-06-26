import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

// ============================================================
// IMPORTANT: Make sure to enable Google Sign-In in Firebase Console:
//  1. Go to Firebase Console > Authentication > Sign-in method
//  2. Enable Google as a provider
//  3. Add your authorized domain (local, production)
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyD55Gn1JRbfLWdT5OPvwuh1Kb7E3INEUM4",
  authDomain: "taekwondo-website-project.firebaseapp.com",
  projectId: "taekwondo-website-project",
  storageBucket: "taekwondo-website-project.appspot.com",
  messagingSenderId: "1017811256098",
  appId: "1:1017811256098:web:b19d3fadaf54b39d2a9b7b",
  measurementId: "G-4N1T3VQZ3D"
};

// Initialize Firebase
console.log("Initializing Firebase with config:", firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let analytics = null;

// Set auth persistence if needed
// setPersistence(auth, browserLocalPersistence);

// Configure Google provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

try {
  // Initialize Analytics in non-localhost environments
  const isLocalhost = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';
  
  if (!isLocalhost) {
    analytics = getAnalytics(app);
  }
  
  console.log("Firebase initialization successful");
  console.log("Auth domain:", auth.config.authDomain);
  console.log("Auth initialized:", !!auth);
  console.log("Google provider configured:", !!googleProvider);
  
} catch (error) {
  console.error("Firebase initialization error:", error);
  console.error("Error code:", error.code);
  console.error("Error message:", error.message);
}

export { app, auth, analytics, googleProvider }; 