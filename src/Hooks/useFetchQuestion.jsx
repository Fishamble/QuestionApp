//firebase
import db from "./FirebaseConfig";
import { query, where, getDocs, collection, doc, getDoc } from "firebase/firestore";
//react
import { useEffect, useState, useContext } from "react";
//lodash
import { shuffle, range } from "lodash";
import { tagsContext } from "../Helpers-test/TagsContext";

// called by APP.js to populate the main screen with questions.
// each time the user scrolls to the bottom app.js calls for another 5 questions
// also called by headertagbar when user clicks on a tag.
export default function useFetchQuestion(more, searchTag) {
  const { totalNoOfQuestions, setTotalNoOfQuestions } = useContext(tagsContext);

  const [question, setQuestion] = useState([]);
  const [randomIDArray, setRandomIDArray] = useState([]);

  useEffect(() => {
    const fetchTotalNumberOfQuestions = async () => {
      const docRef = doc(db, "tags", "upZ8UFtfdyOPOZAUQzZl");
      const result = await getDoc(docRef);
      setTotalNoOfQuestions(result.data().totalNumberOfQuestions);
    };
    fetchTotalNumberOfQuestions();
  }, [totalNoOfQuestions, setTotalNoOfQuestions]);

  useEffect(() => {
    setRandomIDArray(shuffle(range(totalNoOfQuestions)));
  }, [totalNoOfQuestions]);

  useEffect(() => {
    // const controller = new AbortController();

    const output = [];

    //fetch 5 more questions when we reach bottom of infinite scroll
    const fetchQuestions = async () => {
      for (let i = 0; i < 5; i++) {
        const q = query(collection(db, "Questions1test"), where("id", "==", randomIDArray.pop()));
        const result = await getDocs(q);
        output.push(result.docs[0]);
      }
      setQuestion((prev) => [...prev, ...output]);
    };

    //Fetch all questions specified by a tag
    const getQuestionsByTag = async () => {
      const q = query(collection(db, "Questions1test"), where("tags", "array-contains", searchTag));
      const result = await getDocs(q);
      setQuestion(result.docs);
    };

    //If invoked with a search tag
    if (searchTag && searchTag !== "ShowAll") {
      getQuestionsByTag();
    }

    //If tag selected is to show all
    if (searchTag && searchTag === "ShowAll") {
      setQuestion(() => []); // removes rendered questions to avoid key duplication
      fetchQuestions();
    }

    console.log(totalNoOfQuestions, " ", randomIDArray);

    //Continue infintite scroll until there are less than five questions left
    if (!searchTag && randomIDArray.length > 5) {
      fetchQuestions();
    }
  }, [more, searchTag, totalNoOfQuestions, setTotalNoOfQuestions, randomIDArray]);

  return question;
}
