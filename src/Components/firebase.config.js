// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA6rdX-IvD-tsMgUqaJM4bVqSk_11eNd8",
  authDomain: "authentication-with-fire-ae64e.firebaseapp.com",
  projectId: "authentication-with-fire-ae64e",
  storageBucket: "authentication-with-fire-ae64e.appspot.com",
  messagingSenderId: "440849398583",
  appId: "1:440849398583:web:487247214c87337eebb8b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth