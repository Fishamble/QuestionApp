//react
import { useEffect, useState, createContext } from "react";
//firebase
import { db } from "../Hooks/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

//context
export const tagsContext = createContext([]);

export function TagsProvider({ children }) {
  const [tagsList, setTagsList] = useState([]);
  const [searchTag, setSearchTag] = useState("");

  const [totalNoOfQuestions, setTotalNoOfQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isShowNotLoggedInModal, setIsShowNotLoggedInModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isShowAnswers, setIsShowAnswers] = useState(false);



  useEffect(() => {
    const fetchListOfTags = async () => {
      const docRef = doc(db, "tags", "tagsID");
      const result = await getDoc(docRef);
      setTagsList(result.data().tag);
    };

    fetchListOfTags();
  }, []);

  return (
    <tagsContext.Provider
      value={{
        totalNoOfQuestions,
        setTotalNoOfQuestions,
        tagsList,
        setTagsList,
        searchTag,
        setSearchTag,
        questions,
        setQuestions,
        isShowNotLoggedInModal,
        setIsShowNotLoggedInModal,
        isDarkMode, setIsDarkMode,
        isShowAnswers, setIsShowAnswers
      }}
    >
      {children}
    </tagsContext.Provider>
  );
}
