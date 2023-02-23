import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVTZUlpllWu2AaX6gddWn8kUu0L38LkZo",
  authDomain: "msci245-d3-7a81c.firebaseapp.com",
  databaseURL: "https://msci245-d3-7a81c-default-rtdb.firebaseio.com",
  projectId: "msci245-d3-7a81c",
  storageBucket: "msci245-d3-7a81c.appspot.com",
  messagingSenderId: "592846380585",
  appId: "1:592846380585:web:a1b6ee383e2f7cfc0a8638",
  measurementId: "G-5L2LC1BHQV",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
