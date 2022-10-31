import "./TagBar.css";

import { FaPlus } from "react-icons/fa";
import db from "../../Hooks/FirebaseConfig";
import { doc, updateDoc, arrayUnion, getDoc, setDoc, collection, getDocs } from "firebase/firestore";

import { useState, useRef, useEffect } from "react";

import TagInput from "./TagInput";

export default function TagBar({ id, tags, questionObj }) {
  const [isShowTagInput, setisShowTagInput] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const cateogryInputRef = useRef(null);

  const addCategoryTag = async () => {
    //Add tag to the tag array on the document
    let docRef = doc(db, "Questions1test", id);
    await updateDoc(docRef, {
      tags: arrayUnion(tagInput),
    });

    //Add tag to an overall array of tags in a seperate collection
    docRef = doc(db, "tags", "tagsID");
    await updateDoc(docRef, {
      tag: arrayUnion(tagInput),
    });
  };

  const consoleLogQuestionObject = async () => {
    const docRef = doc(db, "Questions1test", id);
    const result = await getDoc(docRef);

    console.log(result.data());
  };

  const handleAddButton = () => {
    if (isShowTagInput && tagInput) {
      addCategoryTag(tagInput);
      setTagInput("");
    }
    consoleLogQuestionObject();
    setisShowTagInput((prev) => !prev);
  };

  // Set focus on the input button
  useEffect(() => {
    cateogryInputRef.current.focus();
  }, [isShowTagInput]);

  return (
    <div>
      <div className="tags-wrapper">
        <div className="tags">
          {tags &&
            tags.map((tag) => (
              <div key={tag} className="tag">
                {tag}
              </div>
            ))}
          <button className="add" onClick={handleAddButton}>
            {" "}
            <FaPlus />
          </button>
          <TagInput cateogryInputRef={cateogryInputRef} isShowTagInput={isShowTagInput} tagInput={tagInput} setTagInput={setTagInput} />
        </div>
      </div>
    </div>
  );
}
