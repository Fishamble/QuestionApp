import questionFile from "../Assets/questions1.txt";

import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "@firebase/app";
import { collection, addDoc } from "@firebase/firestore";

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

export default function parseQuestions() {
  console.log("useparse");
  fetch(questionFile)
    .then((response) => response.text())
    .then((text) => process(text));

  const process = (data) => {
    const carriageReturnChar = 13;
    const lineFeedChar = 10;
    const questionMarkChar = "?";
    let questionsArray = [];
    let id = 1;

    do {
      //Removes new line and carriage returns
      const firstNotLForCR = (string) => {
        let out = 0;

        while (string.charCodeAt(out) === lineFeedChar || string.charCodeAt(out) === carriageReturnChar) {
          out++;
        }
        return out;
      };

      const locationFirstQuestionMark = data.indexOf(questionMarkChar);
      const theQuestion = data.slice(firstNotLForCR(data), locationFirstQuestionMark + 1);
      data = data.slice(locationFirstQuestionMark + 1);
      const locationFirstNewline = data.indexOf(String.fromCharCode(lineFeedChar, carriageReturnChar));
      const theAnswer = data.slice(2, locationFirstNewline - 1);
      data = data.slice(locationFirstNewline - 1);

      questionsArray.push({
        id: id,
        answer: theAnswer,
        question: theQuestion,
      });
      id++;
    } while (data.length > 10);

    // console.log(questionsArray);

    //Note question1 file has id ranging from 1 to 168

    for (let i = 0; i < 2; i++) {
      addDoc(collection(db, "Questions1"), questionsArray[i]);
    }
  };
}
