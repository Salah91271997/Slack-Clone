import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAc9w2woE3dIAbAM5gfcBw41qnDOKaQgsI",
  authDomain: "slack-clone-15b50.firebaseapp.com",
  projectId: "slack-clone-15b50",
  storageBucket: "slack-clone-15b50.appspot.com",
  messagingSenderId: "461580967838",
  appId: "1:461580967838:web:2cb13b4a13c91b7986408f",
  measurementId: "G-M651FBM9G7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
