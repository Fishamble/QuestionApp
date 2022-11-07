//css
import "./QuestionBox.css";
//context
import { tagsContext } from "../Helpers-test/TagsContext";
//react
import { forwardRef, useContext, useState } from "react";
//components
import TagBar from "./TagBar/TagBar";
import EditModal from "./EditModal";

//forward ref required to add intersetion observer
const QuestionBox = forwardRef(function QuestionBox(props, ref) {
  const { questionObj, index, length } = props;

  const { isShowAnswers } = useContext(tagsContext);

  const [isShowIndividualAnswer, setIsShowIndividualAnswer] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const showAnswerOrNot = () => {
    if (isShowAnswers) return "show-answers";
    else if (isShowIndividualAnswer) return "show-individual";
    else return "answer noselect";
  };

  const handleEdit = () => {
    console.log(questionObj.data().question);
    setShowModal(true);
  };

  // ref = index + 1 adds a ref to the last component. Nescessary for intersection observer.
  return (
    <div className="question-box" data-id={questionObj.id} ref={index + 1 === length ? ref : null}>
      <TagBar id={questionObj.id} tagsProp={questionObj.data().tags} questionObj={questionObj} handleEdit={handleEdit} />
      <div className="answer-click" onClick={() => setIsShowIndividualAnswer((prev) => !prev)}>
        {" "}
        {!isShowAnswers && !isShowIndividualAnswer && <div> Reveal answer.</div>}
      </div>

      <div>
        <div className="question">
          <div>{questionObj.data().question}</div>
          <span style={{ fontSize: ".5em" }}>id:{questionObj.data().id}</span>
        </div>
        <div className={showAnswerOrNot()}>{questionObj.data().answer}</div>
      </div>
      {showModal && <EditModal questionObj={questionObj} setShowModal={setShowModal} />}
    </div>
  );
});

export default QuestionBox;
