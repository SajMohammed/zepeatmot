import { initializeApp } from "firebase/app"; 
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCy5w7f9Ev5RIfsJKin2Tv5ujB09NiVMY8",
    authDomain: "zepeat-6594c.firebaseapp.com",
    projectId: "zepeat-6594c",
    storageBucket: "zepeat-6594c.appspot.com",
    messagingSenderId: "134827193819",
    appId: "1:134827193819:web:e60599a088b0794ccd63fe",
    measurementId: "G-EPKNT82TFE"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

