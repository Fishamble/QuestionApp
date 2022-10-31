import useFetchQuestion from "./Hooks/useFetchQuestion";

import "./App.css";

import QuestionBox from "./components/QuestionBox.jsx";
// import SearchBar from "./components/SearchBar";
// import useFetchSearch from "./Hooks/useFetchSearch";
import { useRef, useCallback, useState, useContext } from "react";
import { tagsContext } from "./Helpers-test/TagsContext";
import Header from "./components/Header";

function App() {
  // const [questions, setQuestions] = useState([]);
  const observer = useRef();
  const [more, setMore] = useState(1);

  const { searchTag, isDarkMode } = useContext(tagsContext);

  let questions = useFetchQuestion(more, searchTag);

  const lastQuestionOnScreen = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setMore((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <div className={isDarkMode ? "dark background" : "light"}>
      <Header />
      <div className="App">
        {questions &&
          questions.map((q, index) => {
            return <QuestionBox key={q.id} questionObj={q} index={index} ref={lastQuestionOnScreen} length={questions.length} />;
          })}
        {!questions && <div>Loading...</div>}
      </div>
    </div>
  );
}

export default App;
