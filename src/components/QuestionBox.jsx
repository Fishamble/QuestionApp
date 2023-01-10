//css
import "./QuestionBox.css";
//context
import { tagsContext } from "../Helpers-test/TagsContext";
//react
import { useRef, useCallback, useContext, useState } from "react";
//components
import TagBar from "./TagBar/TagBar";
import EditModal from "./Modals/EditModal";

//forward ref required to add intersetion observer
export default function QuestionBox(props) {
  const { questionObj, index, length, setMore } = props;

  const { isShowAnswers } = useContext(tagsContext);

  const [isShowIndividualAnswer, setIsShowIndividualAnswer] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const observer = useRef();

  const questionOnScreen = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (index === length - 4) setMore((prev) => prev + 1); // When 4 left on screen, load more questions.
          node.classList.add("Q-box-transition");
        } else {
          node.classList.remove("Q-box-transition");
        }
      });
      if (node) observer.current.observe(node);
    },
    [setMore, index, length]
  );

  const showAnswerOrNot = () => {
    if (isShowAnswers) return "show-answers";
    else if (isShowIndividualAnswer) return "show-individual";
    else return "answer noselect";
  };

  const handleEdit = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="question-box" data-id={questionObj.id} ref={questionOnScreen}>
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
      </div>
      {showModal && <EditModal questionObj={questionObj} setShowModal={setShowModal} />}
    </>
  );
}
