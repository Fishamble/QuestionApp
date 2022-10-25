// import { useEffect } from "react";
// import useParseQuestions from "./Hooks/UseParseQuestions";
// useParseQuestions();

import "./App.css";
import QuestionBox from "./components/QuestionBox.jsx";

function App() {
  return (
    <div className="App">
      <QuestionBox />
      <QuestionBox />
      <QuestionBox />
      <QuestionBox />
    </div>
  );
}

export default App;
