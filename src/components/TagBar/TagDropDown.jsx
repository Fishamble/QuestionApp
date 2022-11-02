import { useContext } from "react";
import { tagsContext } from "../../Helpers-test/TagsContext";

export default function TagDropDown({ isShowTagInput, setTagInput }) {
  const { tagsList } = useContext(tagsContext);

  const handleTagSelectChange = (e) => {
    setTagInput(e.target.value);
  };

  return (
    <div className={isShowTagInput ? "drop-down show" : "input"}>
      <select onChange={handleTagSelectChange} name="tags" id="tags">
        <option defaultValue={""}>Choose a tag</option>
        {tagsList.map((tag) => {
          return (
            <option key={tag} value={tag}>
              {tag}
            </option>
          );
        })}
      </select>
    </div>
  );
}
