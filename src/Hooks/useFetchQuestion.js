import db from "./FirebaseConfig";

import { query, where, getDocs, getDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { random } from "lodash";
// import { collection, addDoc } from "@firebase/firestore";

export default function useFetchQuestion() {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const getData = async () => {
      const randomID = random(1, 168);

      const q = query(collection(db, "Questions1test"), where("id", "==", randomID));
      const result = await getDocs(q);

      setQuestion(result.docs[0]);
    };
    getData();
  }, []);

  return question;
}
