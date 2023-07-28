import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.FB_APIKEY}`,
  authDomain: `${process.env.FB_AUTHDOMAIN}`,
  projectId: `${process.env.FB_PROJECTID}`,
  storageBucket: `${process.env.FB_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.FB_MESSAGINGSENDERID}`,
  appId: `${process.env.FB_APPID}`,
  measurementId: `${process.env.FB_MEASUREMENTID}`,
};
//test
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
