import questionFile from "../Assets/questions1.txt";

import { useEffect } from "react";

import db from "./FirebaseConfig";
import { collection, addDoc } from "@firebase/firestore";


export default function useParseQuestions() {
  useEffect(() => {
    fetch(questionFile)
      .then((response) => response.text())
      .then((text) => process(text));

    const process = (data) => {
      const carriageReturnChar = 13;
      const lineFeedChar = 10;
      const questionMarkChar = "?";
      let questionsArray = [];
      let id = 169;

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

      for (let i = 0; i < questionsArray.length; i++) {
        addDoc(collection(db, "Questions2"), questionsArray[i]);
      }
    };
  }, []);
}

// <----Note---->
//question1 file has id ranging from 1 to 168
//collection has been changed to Questions2
//remove strict mode from index.js
//
// move to App.js
//
//   useParseQuestions();
//
