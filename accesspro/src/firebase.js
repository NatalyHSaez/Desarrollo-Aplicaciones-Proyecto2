
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjDqoYvtNzrkTQlt0Tr0IARUKc3SF7X1k",
  authDomain: "accesspro-ffb7e.firebaseapp.com",
  projectId: "accesspro-ffb7e",
  storageBucket: "accesspro-ffb7e.firebasestorage.app",
  messagingSenderId: "392006084502",
  appId: "1:392006084502:web:aff3bb19a21b6bf4b85fb7",
  measurementId: "G-5R00Q89QCV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
