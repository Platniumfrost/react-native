import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8K8Oaq9wYwzK-ELo-l3UCHcaAk2suFv8",
  authDomain: "chatapp-682a1.firebaseapp.com",
  projectId: "chatapp-682a1",
  storageBucket: "chatapp-682a1.appspot.com",
  messagingSenderId: "212732314826",
  appId: "1:212732314826:web:b9e05d52c290ba4fe02033",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
