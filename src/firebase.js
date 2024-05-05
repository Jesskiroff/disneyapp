import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAoU8xrAQqWj558fWZwDngkE9Z2AP9oUHY",
  authDomain: "disneyapp-ac50c.firebaseapp.com",
  projectId: "disneyapp-ac50c",
  storageBucket: "disneyapp-ac50c.appspot.com",
  messagingSenderId: "105660964623",
  appId: "1:105660964623:web:abc668c898e8b93f6a287a",
  measurementId: "G-CRCTQJ527C",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
//const storage= firebase.storage();

export { db, auth, provider };
