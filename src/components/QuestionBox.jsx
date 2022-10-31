import TagBar from "./TagBar/TagBar";
import "./QuestionBox.css";
import { forwardRef, useContext } from "react";
import { tagsContext } from "../Helpers-test/TagsContext";
import { useState } from "react";

const QuestionBox = forwardRef(function QuestionBox(props, ref) {
  const { questionObj, index, length } = props;

  const { isShowAnswers } = useContext(tagsContext);

  const [isShowIndividualAnswer, setIsShowIndividualAnswer] = useState(false);

  const handleShowAnswer = () => {
    setIsShowIndividualAnswer((prev) => !prev);
  };

  const showOrNot = () => {
    console.log("individual", isShowIndividualAnswer);
    console.log(isShowAnswers);

    if (isShowIndividualAnswer) return "show-answers";
    else if (isShowAnswers) return "show-answers";
    else return "answer";
  };

  // This adds the ref forwarded from app.js
  // to the last element. Nescessary for intersection observer
  if (index + 1 === length) {
    return (
      <div className="question-box" data-id={questionObj.id} ref={ref} id="last">
        <TagBar id={questionObj.id} tags={questionObj.data().tags} questionObj={questionObj} />

        <div className="question" onClick={() => handleShowAnswer()}>
          <div>{questionObj.data().question}</div>
          <span style={{ fontSize: ".5em" }}>{questionObj.data().id}</span>
        </div>
        <div className={isShowAnswers ? "answer" : "answer show-answers"}>{questionObj.data().answer}</div>
      </div>
    );
  } else {
    return (
      <div className="question-box" data-id={questionObj.id}>
        <TagBar id={questionObj.id} tags={questionObj.data().tags} questionObj={questionObj} />
        <div className="answer-click" onClick={() => handleShowAnswer()}>
          <div className="question">
            <div>{questionObj.data().question}</div>
            <span style={{ fontSize: ".5em" }}>{questionObj.data().id}</span>
          </div>
          {/* <div className={isShowAnswers ? "answer" : "answer show-answers"}>{questionObj.data().answer}</div> */}
          <div className={showOrNot()}>{questionObj.data().answer}</div>
        </div>
      </div>
    );
  }
});

export default QuestionBox;
