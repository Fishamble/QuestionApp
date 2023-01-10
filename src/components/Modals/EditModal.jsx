//react
import { useState, useContext } from "react";
//css
import "./EditModal.css";
//firebase
import { db } from "../../Hooks/FirebaseConfig";
import { doc, updateDoc, collection, addDoc } from "firebase/firestore";
//components
import TagBar from "../TagBar/TagBar";
//context
import { tagsContext } from "../../Helpers-test/TagsContext";

export default function EditModal({ questionObj, setShowModal }) {
  const [question, setQuestion] = useState(questionObj.data().question);
  const [answer, setAnswer] = useState(questionObj.data().answer);

  const { setIsShowNotLoggedInModal } = useContext(tagsContext);

  const handleEdit = async (e) => {
    e.preventDefault();

    //backup the exisiting quesiton/answer to seperate collection
    try {
      await addDoc(collection(db, "QuestionsModified"), {
        question: questionObj.data().question,
        answer: questionObj.data().answer,
        id: questionObj.data().id,
        modifiedAt: new Date(),
      });

      //update the edited document
      const docRef = doc(db, "Questions1test", questionObj.id);
      await updateDoc(docRef, {
        question: question,
        answer: answer,
      });
    } catch (err) {
      setIsShowNotLoggedInModal(true);
    }

    setShowModal(false);
  };

  return (
    <div className="edit-modal-background">
      <div className="edit-heading-wrapper">
        <div className="edit-heading">Edit</div>
      </div>

      <div className="edit-box">
        <TagBar id={questionObj.id} tags={questionObj.data().tags} questionObj={questionObj} showEdit={false} />
        <div className="edit-wrapper">
          <form className="edit-form">
            <input className="edit-question" type="text" onChange={(e) => setQuestion(e.target.value)} value={question} id="edit-question" />

            <textarea className="edit-answer" onChange={(e) => setAnswer(e.target.value)} value={answer} id="edit-answer" />

            <div className="edit-buttons">
              <button className="edit-button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="edit-button" onClick={(e) => handleEdit(e)}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
