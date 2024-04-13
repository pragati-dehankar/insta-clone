import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBxDMbaEh-JHMPpYbVLt1d__Btm4BYAtRk",
    authDomain: "instagram-2390b.firebaseapp.com",
    projectId: "instagram-2390b",
    storageBucket: "instagram-2390b.appspot.com",
    messagingSenderId: "175108346586",
    appId: "1:175108346586:web:b8c369f0448ec8da574be3",
    measurementId: "G-Q5SP4QGZHF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth();


