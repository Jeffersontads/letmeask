import firebase from "firebase";
// importar os servicos que eu vou usar do FIREBASE
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA4RLlRR6sDb4Yl9QBqM09IKmgTfAhuVUY",
  authDomain: "letmeask-7ce0d.firebaseapp.com",
  databaseURL: "https://letmeask-7ce0d-default-rtdb.firebaseio.com",
  projectId: "letmeask-7ce0d",
  storageBucket: "letmeask-7ce0d.appspot.com",
  messagingSenderId: "108132491554",
  appId: "1:108132491554:web:fd33382379ee2d5016457b"
};

 firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export {firebase, auth, database}