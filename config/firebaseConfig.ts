import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA3bozcECwtrK7NLyOjRzSNq8x0eonsWQw",
    authDomain: "mafundi-chat-app.firebaseapp.com",
    projectId: "mafundi-chat-app",
    storageBucket: "mafundi-chat-app.appspot.com",
    messagingSenderId: "638055527369",
    appId: "1:638055527369:web:85a5b100500adb86206e18",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
