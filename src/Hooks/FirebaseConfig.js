import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration

const { REACT_APP_API_KEY, REACT_APP_AUTH_DOMAIN, REACT_APP_PROJECT_ID, REACT_APP_STORAGE_BUCKET, REACT_APP_MESSAGING_SENDER_ID, REACT_APP_APP_ID } =
  process.env;

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
};

console.log(firebaseConfig);

// apiKey: "AIzaSyD9OnOzxApJOvM-XCae90fAiUSJ08Y47O8",
// authDomain: "js-questions-1941e.firebaseapp.com",
// projectId: "js-questions-1941e",
// storageBucket: "js-questions-1941e.appspot.com",
// messagingSenderId: "954757693369",
// appId: "1:954757693369:web:dc046aa6537d3e0f01c068",

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
