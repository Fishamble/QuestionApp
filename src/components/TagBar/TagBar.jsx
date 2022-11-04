//react
import { useState, useContext } from "react";

//icons
import { FaPlus } from "react-icons/fa";
//css
import "./TagBar.css";
//components
import TagInput from "./TagInput";
import Edit from "./Edit";

import { tagsContext } from "../../Helpers-test/TagsContext";

export default function TagBar({ id, tagsProp, handleEdit }) {
  const [tags, setTags] = useState(tagsProp);
  const [isShowTagInput, setIsShowTagInput] = useState(false);

  const { setSearchTag } = useContext(tagsContext);

  return (
    <div>
      <div className="tags-wrapper">
        <div className="tags">
          {tags &&
            tags.map((tag) => (
              <div key={tag} className="tag" onClick={() => setSearchTag(tag)}>
                {tag}
              </div>
            ))}
          {!isShowTagInput && (
            <button className="add" onClick={() => setIsShowTagInput(true)}>
              <FaPlus />
            </button>
          )}
          {isShowTagInput && <TagInput tags={tags} setTags={setTags} id={id} setIsShowTagInput={setIsShowTagInput} />}
        </div>
        <Edit handleEdit={handleEdit} />
      </div>
    </div>
  );
}
