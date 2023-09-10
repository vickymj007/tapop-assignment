import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey:"AIzaSyBmn4e5qFj2hESwBferdLRfjrspyKem2gs",
  authDomain: "tapop-assignment-2fcaa.firebaseapp.com",
  projectId: "tapop-assignment-2fcaa",
  storageBucket: "tapop-assignment-2fcaa.appspot.com",
  messagingSenderId: "20484117706",
  appId: "1:20484117706:web:36ee3ea82b5dfb2e279033"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const provider = new GoogleAuthProvider()

export const db = getFirestore(app)
