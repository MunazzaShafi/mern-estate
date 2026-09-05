// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ern-estate.firebaseapp.com",
  projectId: "ern-estate",
  storageBucket: "ern-estate.firebasestorage.app",
  messagingSenderId: "616315824884",
  appId: "1:616315824884:web:8e6bd59f447bc468100ca1"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);