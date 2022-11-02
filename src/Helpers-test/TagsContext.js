import { useEffect, useState } from "react";
import { createContext } from "react";
import db from "../Hooks/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const tagsContext = createContext([]);

export function TagsProvider({ children }) {
  const [tagsList, setTagsList] = useState([]);
  const [searchTag, setSearchTag] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isShowAnswers, setIsShowAnswers] = useState(false);
  const [totalNoOfQuestions, setTotalNoOfQuestions] = useState(0);

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
        isDarkMode,
        setIsDarkMode,
        tagsList,
        setTagsList,
        searchTag,
        setSearchTag,
        isShowAnswers,
        setIsShowAnswers,
      }}
    >
      {children}
    </tagsContext.Provider>
  );
}
