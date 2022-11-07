import useFetchQuestion from "./Hooks/useFetchQuestion";

import "./App.css";

import QuestionBox from "./components/QuestionBox.jsx";
// import SearchBar from "./components/SearchBar";
// import useFetchSearch from "./Hooks/useFetchSearch";
import {  useState, useContext, useEffect } from "react";
import { tagsContext } from "./Helpers-test/TagsContext";
import Header from "./components/Header";
import WebFont from "webfontloader";

function App() {
  const { isDarkMode } = useContext(tagsContext);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto Mono"],
      },
    });
  }, []);

  const [more, setMore] = useState(1);
  let questions = useFetchQuestion(more);

  return (
    <div className={isDarkMode ? "dark background" : "light"}>
      <Header />
      <div className="header-spacer"></div>
      <div className="app">
        {questions &&
          questions.map((q, index) => {
            return <QuestionBox key={q.id} questionObj={q} index={index} length={questions.length} setMore={setMore}/>;
          })}
        {!questions && <div>Loading...</div>}
      </div>
    </div>
  );
}

export default App;
