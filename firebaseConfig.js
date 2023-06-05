// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKAf7lrpjkSAwWZi5bWQrZZuYBDW4FSi4",
  authDomain: "gavinwang-dev-contact-me.firebaseapp.com",
  projectId: "gavinwang-dev-contact-me",
  storageBucket: "gavinwang-dev-contact-me.appspot.com",
  messagingSenderId: "284285875484",
  appId: "1:284285875484:web:4a958f138f4c60345436d9",
  measurementId: "G-P6LQE6QD85"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
