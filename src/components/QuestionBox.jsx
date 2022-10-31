import TagBar from "./TagBar/TagBar";
import "./QuestionBox.css";
import { forwardRef } from "react";

const QuestionBox = forwardRef(function QuestionBox(props, ref) {
  const { questionObj, index, length } = props;

  // This adds the ref forwarded from app.js
  // to the last element. Nescessary for intersection observer
  if (index + 1 === length) {
    return (
      <div className="question-box" data-id={questionObj.id} ref={ref} id="last">
        <TagBar id={questionObj.id} tags={questionObj.data().tags} questionObj={questionObj} />

        <div className="question">
          <div>{questionObj.data().question}</div>
          <span style={{ fontSize: ".5em" }}>{questionObj.data().id}</span>
        </div>
        <div className="answer">{questionObj.data().answer}</div>
      </div>
    );
  } else {
    return (
      <div className="question-box" data-id={questionObj.id}>
        <TagBar id={questionObj.id} tags={questionObj.data().tags} questionObj={questionObj} />

        <div className="question">
          <div>{questionObj.data().question}</div>
          <span style={{ fontSize: ".5em" }}>{questionObj.data().id}</span>
        </div>
        <div className="answer">{questionObj.data().answer}</div>
      </div>
    );
  }
});

export default QuestionBox;
