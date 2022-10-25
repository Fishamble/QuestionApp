import "./CategoryBar.css";

import { FaPlus } from "react-icons/fa";
import db from "../Hooks/FirebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { useState } from "react";

export default function CategoryBar({ id }) {
  const [isShowCategoryInput, setIsShowCategoryInput] = useState(false);
  const [tagInput, SetTagInput] = useState("");

  const addCategory = () => {
    if (isShowCategoryInput) {
      console.log(tagInput);
    }

    setIsShowCategoryInput((prev) => !prev);

    // console.log(isShowCategoryInput);
    // const docRef = doc(db, "Questions1test", id);
    // const result = await getDoc(docRef);

    // console.log(result.data());
  };

  return (
    <div>
      <div className="categories-wrapper">
        <div className="categories"></div>

        <input type="text" className={isShowCategoryInput ? "input show" : "input"} placeholder="Add category tag" onChange={(e) => SetTagInput(e.target.value)} value={tagInput}></input>
        <button className="add" onClick={addCategory}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
