// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwwO92YSeZG9IxMbkQJFxsHyEph7RVWxA",
  authDomain: "distribuidos-1-2022.firebaseapp.com",
  databaseURL: "https://distribuidos-1-2022-default-rtdb.firebaseio.com",
  projectId: "distribuidos-1-2022",
  storageBucket: "distribuidos-1-2022.appspot.com",
  messagingSenderId: "879255770371",
  appId: "1:879255770371:web:c29cd26fa863f81f534536",
  measurementId: "G-4DL9H5JPS6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default getFirestore();
