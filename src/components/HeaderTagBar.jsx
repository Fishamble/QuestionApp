import { useContext } from "react";
import { tagsContext } from "../Helpers-test/TagsContext";

export default function HeaderTagBar() {
  const { tagsList } = useContext(tagsContext);
  const { setSearchTag } = useContext(tagsContext);

  const handleTagSelect = (tag) => {
    setSearchTag(tag);
  };

  return (
    <div className="header-tag-bar">
      <div className="tag-bar-wrapper">
        <div className="tag-bar" onClick={() => handleTagSelect("ShowAll")}>
          All
        </div>
        {tagsList.map((tag) => (
          <div className="tag-bar" key={tag} onClick={() => handleTagSelect(tag)}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
