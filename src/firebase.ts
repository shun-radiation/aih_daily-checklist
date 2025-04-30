import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE__API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE__AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE__PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE__STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE__MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE__APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE__MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { firebaseConfig, auth, db };
