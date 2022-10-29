// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYIogAHyPfYK9EpxyWaJdk34vbjnurbGg",
  authDomain: "basic-todolist-nextjs.firebaseapp.com",
  projectId: "basic-todolist-nextjs",
  storageBucket: "basic-todolist-nextjs.appspot.com",
  messagingSenderId: "49159996202",
  appId: "1:49159996202:web:8c72b7fe71e0860f3a1453"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 