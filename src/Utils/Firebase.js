// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNpRc39SdR8xHmJeJHv3-vrQVJkhZl2_0",
  authDomain: "yahayajumai.firebaseapp.com",
  databaseURL: "https://yahayajumai-default-rtdb.firebaseio.com",
  projectId: "yahayajumai",
  storageBucket: "yahayajumai.appspot.com",
  messagingSenderId: "252669103951",
  appId: "1:252669103951:web:40c208526cbdc2ff52ff3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
