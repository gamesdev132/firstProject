import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjaMUfNoIn7_rYDjsK3lpvGnDC7kXG848",
  authDomain: "gamesdev-da605.firebaseapp.com",
  projectId: "gamesdev-da605",
  storageBucket: "gamesdev-da605.appspot.com",
  messagingSenderId: "12930865587",
  appId: "1:12930865587:web:0343723891394fa8f393c6"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };