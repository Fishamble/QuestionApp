//react
import { useState, useRef, useEffect } from "react";
//firestore
import db from "../../Hooks/FirebaseConfig";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
//icons
import { FaPlus } from "react-icons/fa";
//css
import "./TagBar.css";
//components
import TagInput from "./TagInput";
import Edit from "./Edit";

export default function TagBar({ id, tagsProp, handleEdit, showEdit }) {
  const [isShowTagInput, setIsShowTagInput] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(tagsProp);

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

  const handleAddButton = () => {
    if (isShowTagInput && tagInput) {
      addCategoryTag(tagInput);
      setTagInput("");
      setTags((prev) => [...prev, tagInput]);
    }

    setIsShowTagInput((prev) => !prev);
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
            <FaPlus />
          </button>
          <TagInput cateogryInputRef={cateogryInputRef} isShowTagInput={isShowTagInput} tagInput={tagInput} setTagInput={setTagInput} />
        </div>
        {showEdit && <Edit handleEdit={handleEdit} />}
      </div>
    </div>
  );
}
