import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbXe1_-g0XrDqw0Uy_zFd2QnvsV8OsiHE",
  authDomain: "boardapp-391eb.firebaseapp.com",
  projectId: "boardapp-391eb",
  storageBucket: "boardapp-391eb.appspot.com",
  messagingSenderId: "649422106510",
  appId: "1:649422106510:web:5e2d4e06f51fe9d3f03edf",
  measurementId: "G-4DX6608SKL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db}