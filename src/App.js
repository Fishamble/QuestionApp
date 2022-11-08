import "./App.css";
import { useState } from "react";

import QuestionBox from "./components/QuestionBox.jsx";
// import SearchBar from "./components/SearchBar";
// import useFetchSearch from "./Hooks/useFetchSearch";
import React, { useContext, useEffect } from "react";
import { tagsContext } from "./Helpers-test/TagsContext";
import Header from "./components/Header";
import WebFont from "webfontloader";

//hooks
import useFetchQuestion from "./Hooks/useFetchQuestion";

function App() {
  const { isDarkMode } = useContext(tagsContext);
  const { questions } = useContext(tagsContext);

  const [more, setMore] = useState(1);
  useFetchQuestion(more);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto Mono"],
      },
    });
  }, []);

  return (
    <div className={isDarkMode ? "dark background" : "light"}>
      <Header />
      <div className="header-spacer"></div>
      <div className="app">
        {questions &&
          questions.map((q, index) => {
            return <QuestionBox key={q.id} questionObj={q} index={index} length={questions.length} setMore={setMore} />;
          })}
        {!questions && <div>Loading...</div>}
      </div>
    </div>
  );
}

export default App;
