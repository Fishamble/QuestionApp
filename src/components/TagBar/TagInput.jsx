//firestore
import { db } from "../../Hooks/FirebaseConfig";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { useState, useEffect, useRef, useContext } from "react";

import TagDropDown from "./TagDropDown";
import { tagsContext } from "../../Helpers-test/TagsContext";

import { auth } from "../../Hooks/FirebaseConfig"

export default function TagInput({ tags, setTags, id, setIsShowTagInput }) {
  const [tagInput, setTagInput] = useState("");
  const cateogryInputRef = useRef(null);

  const { setIsShowNotLoggedInModal } = useContext(tagsContext);

  // Set focus on the input button
  useEffect(() => {
    cateogryInputRef.current.focus();
  }, []);

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

  const handleClick = () => {

    if(auth.currentUser === null){
      setIsShowNotLoggedInModal(true);
    } else if (tagInput && !tags.includes(tagInput)) {
      addCategoryTag(tagInput);
      setTagInput("");
      setTags((prev) => [...prev, tagInput]);
    }
    setIsShowTagInput(false);
  };

  return (
    <div className="tag-input">
      <div>
        <button onClick={() => setIsShowTagInput(false)}>Cancel</button>
      </div>
      <div>
        <TagDropDown setTagInput={setTagInput} />
      </div>
      <div>
        <input
          type="text"
          ref={cateogryInputRef}
          className="input show"
          placeholder="Or create a new tag"
          onChange={(e) => setTagInput(e.target.value)}
          value={tagInput}
        ></input>
      </div>
      <div>
        <button onClick={handleClick}>Add</button>
      </div>
    </div>
  );
}
