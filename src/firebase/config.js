import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC27Nj2N3OQ_F9mBKMKbQsKsvKIybY0kRQ",
  authDomain: "project-webv.firebaseapp.com",
  projectId: "project-webv",
  storageBucket: "project-webv.firebasestorage.app",
  messagingSenderId: "37090753649",
  appId: "1:37090753649:web:5aaee35ffb90783384afd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);