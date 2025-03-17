// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAlAwk---40vv1smRltRwNKYLh8M0GLZ08",
  authDomain: "discord-clone-yt-817c5.firebaseapp.com",
  projectId: "discord-clone-yt-817c5",
  storageBucket: "discord-clone-yt-817c5.appspot.com",
  messagingSenderId: "326973991915",
  appId: "1:326973991915:web:52f7e4b35620fd834b47ae",
  measurementId: "G-PBTDRBEDC9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
