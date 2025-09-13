import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyANta1w3R8ZUNc1Vlg_5baypALhDOAjyms",
  authDomain: "graphicafirebase.firebaseapp.com",
  projectId: "graphicafirebase",
  storageBucket: "graphicafirebase.appspot.com",
  messagingSenderId: "1085055488692",
  appId: "1:1085055488692:web:266a2a06a7af448d24fde1",
  measurementId: "G-4L02B05S7N"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
