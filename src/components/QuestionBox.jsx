import useFetchQuestion from "../Hooks/useFetchQuestion";
import CategoryBar from "./CategoryBar";
import "./QuestionBox.css";

export default function QuestionBox() {
  const questionObj = useFetchQuestion();

  return (
    <div className="question-box" data-id={questionObj.id}>
      <CategoryBar id={questionObj.id} />
      <div className="question">{questionObj && <div>{questionObj.data().question}</div>}</div>
      <div className="answer">{questionObj && questionObj.data().answer}</div>
    </div>
  );
}
