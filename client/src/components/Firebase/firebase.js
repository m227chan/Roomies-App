import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FB_APIKEY}`,
  authDomain: `${process.env.REACT_APP_FB_AUTHDOMAIN}`,
  databaseURL: `${process.env.REACT_APP_FB_DATABASEURL}`,
  projectId: `${process.env.REACT_APP_FB_PROJECTID}`,
  storageBucket: `${process.env.REACT_APP_FB_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FB_MESSAGINGSENDERID}`,
  appId: `${process.env.REACT_APP_FB_APPID}`,
  measurementId: `${process.env.REACT_APP_FB_MEASUREMENTID}`,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
