
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBZ6Gp7C4nO1rOQUh1UtthOuH7UGJMcbT0",
  authDomain: "insta-clone-8d795.firebaseapp.com",
  projectId: "insta-clone-8d795",
  storageBucket: "insta-clone-8d795.appspot.com",
  messagingSenderId: "824952728849",
  appId: "1:824952728849:web:94391186b5aaaa6208b0b0",
  measurementId: "G-2Q3JPEB1CS"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const firestore=getFirestore(app);
const storage=getStorage(app);

export {app,auth,firestore,storage};
