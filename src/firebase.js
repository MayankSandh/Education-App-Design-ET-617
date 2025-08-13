import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBP46xqqf5BtDiQTAm-ivL4qM-aTxMVsFE",
  authDomain: "et617-5d4b1.firebaseapp.com",
  projectId: "et617-5d4b1",
  storageBucket: "et617-5d4b1.firebasestorage.app",
  messagingSenderId: "402274463358",
  appId: "1:402274463358:web:1bb6255317217186c3722f",
  measurementId: "G-3P8BBM3NV3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
