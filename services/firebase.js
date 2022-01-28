// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "y2c-2-25b4e.firebaseapp.com",
  projectId: "y2c-2-25b4e",
  storageBucket: "y2c-2-25b4e.appspot.com",
  messagingSenderId: "387349373540",
  appId: "1:387349373540:web:cbbfdae86f775be872f571"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


const db = getFirestore();

const storage = getStorage();


export { app, db, storage };