import { useContext } from "react";
import { tagsContext } from "../../Helpers-test/TagsContext";

export default function TagDropDown({ setTagInput }) {
  const { tagsList } = useContext(tagsContext);

  return (
    <div className="drop-down show">
      <select onChange={(e) => setTagInput(e.target.value)} name="tags" id="tags">
        <option defaultValue={""}>Choose existing tag</option>
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
