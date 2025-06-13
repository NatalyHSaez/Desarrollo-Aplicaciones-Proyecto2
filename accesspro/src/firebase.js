// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD08xAOXv_YMwqqNUz9aBj02Z8-Q5X2cg4",
    authDomain: "accesspro-usuarios.firebaseapp.com",
    projectId: "accesspro-usuarios",
    storageBucket: "accesspro-usuarios.firebasestorage.app",  // corregido
    messagingSenderId: "753755689011",
    appId: "1:753755689011:web:9b90931c990bb8acb75346",
    measurementId: "G-Y0H5X1HMPL"};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Servicios que vas a usar
const auth = getAuth(app);
const db = getFirestore(app);

  console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);


export { auth, db };
