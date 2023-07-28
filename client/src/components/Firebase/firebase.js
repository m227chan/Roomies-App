import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHLDSAi7OsHcpGfJ_uU_RZgZK_-1352XU",
  authDomain: "roomiesapp-fb750.firebaseapp.com",
  projectId: "roomiesapp-fb750",
  storageBucket: "roomiesapp-fb750.appspot.com",
  messagingSenderId: "721855547947",
  appId: "1:721855547947:web:5f9e61fe07a4417332f86e",
  measurementId: "G-R373J2JX0D"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
