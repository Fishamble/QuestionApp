import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9OnOzxApJOvM-XCae90fAiUSJ08Y47O8",
  authDomain: "js-questions-1941e.firebaseapp.com",
  projectId: "js-questions-1941e",
  storageBucket: "js-questions-1941e.appspot.com",
  messagingSenderId: "954757693369",
  appId: "1:954757693369:web:dc046aa6537d3e0f01c068",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
