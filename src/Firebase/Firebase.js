import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const provider = new firebase.auth.GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyAvCNNAcKQPuAmQ98IK02ywpiynmDYCTbA",
  authDomain: "chatnova-7e379.firebaseapp.com",
  projectId: "chatnova-7e379",
  storageBucket: "chatnova-7e379.appspot.com",
  messagingSenderId: "863004038671",
  appId: "1:863004038671:web:4445c6925801790b3ef57a",
  measurementId: "G-FRKVB4W0NV"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, provider, storage };
