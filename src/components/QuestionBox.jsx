//css
import "./QuestionBox.css";
//components
import TagBar from "./TagBar/TagBar";
import EditModal from "./EditModal";

import { tagsContext } from "../Helpers-test/TagsContext";
//react
import { forwardRef, useContext, useState } from "react";

const QuestionBox = forwardRef(function QuestionBox(props, ref) {
  const { questionObj, index, length } = props;

  const { isShowAnswers } = useContext(tagsContext);

  const [isShowIndividualAnswer, setIsShowIndividualAnswer] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShowAnswer = () => {
    setIsShowIndividualAnswer((prev) => !prev);
  };

  const showAnswerOrNot = () => {
    if (isShowIndividualAnswer) return "show-answers";
    else if (isShowAnswers) return "show-answers";
    else return "answer";
  };

  const handleEdit = () => {
    console.log(questionObj.data().question);
    setShowModal(true);
  };

  console.log("in question box");

  // This adds the ref forwarded from app.js
  // to the last element. Nescessary for intersection observer
  if (index + 1 === length) {
    return (
      <div className="question-box" data-id={questionObj.id} ref={ref}>
        <TagBar id={questionObj.id} tagsProp={questionObj.data().tags} questionObj={questionObj} handleEdit={handleEdit} />
        <div className="answer-click" onClick={() => handleShowAnswer()}>
          <div className="question">
            <div>{questionObj.data().question}</div>
            <span style={{ fontSize: ".5em" }}>id:{questionObj.data().id}</span>
          </div>
          <div className={showAnswerOrNot()}>{questionObj.data().answer}</div>
        </div>
        {showModal && <EditModal questionObj={questionObj} />}
      </div>
    );
  } else {
    return (
      <div className="question-box" data-id={questionObj.id}>
        <TagBar id={questionObj.id} tagsProp={questionObj.data().tags} questionObj={questionObj} handleEdit={handleEdit} showEdit={true} />
        <div className="answer-click" onClick={() => handleShowAnswer()}>
          <div className="question">
            <div>{questionObj.data().question}</div>
            <span style={{ fontSize: ".5em" }}>{questionObj.data().id}</span>
          </div>
          <div className={showAnswerOrNot()}>{questionObj.data().answer}</div>
        </div>
        {showModal && <EditModal setShowModal={setShowModal} questionObj={questionObj} />}
      </div>
    );
  }
});

export default QuestionBox;
