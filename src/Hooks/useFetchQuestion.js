import db from "./FirebaseConfig";

import { query, where,  getDocs, collection } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import {  shuffle, range } from "lodash";

export default function useFetchQuestion(more, searchTag) {
  // console.log("searchTag in use fetch", searchTag);

  const totalNoOfQuestions = 168;

  const [question, setQuestion] = useState([]);

  let randomIDArray = useRef(shuffle(range(totalNoOfQuestions)));

  useEffect(() => {
    // const controller = new AbortController();

    const output = [];

    const getData = async () => {
      for (let i = 0; i < 5; i++) {
        const q = query(collection(db, "Questions1test"), where("id", "==", randomIDArray.current.pop()));
        const result = await getDocs(q);
        output.push(result.docs[0]);
      }
      setQuestion((prev) => [...prev, ...output]);
    };

    const getDataByTag = async () => {
      const q = query(collection(db, "Questions1test"), where("tags", "array-contains", searchTag));
      const result = await getDocs(q);
      setQuestion(result.docs);
    };

    if (searchTag) {
      getDataByTag();
    } else {
      getData();
    }
  }, [more, searchTag]);

  return question;
}


// const ref = collection(db, "Questions1test")
      // const q = query(ref, where("tags", "array-contains", "OOP"));
