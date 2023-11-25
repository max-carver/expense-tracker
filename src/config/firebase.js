import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCH1kQw2pzWyMXx-wqZd2-NQXzhp6EJj8k",
  authDomain: "carver-expenses.firebaseapp.com",
  projectId: "carver-expenses",
  storageBucket: "carver-expenses.appspot.com",
  messagingSenderId: "968909887334",
  appId: "1:968909887334:web:fd391a0d6eaea97edbdaa7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();