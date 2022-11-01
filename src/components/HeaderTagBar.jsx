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
        {tagsList.map((tag) => (
          <span className="tag-bar" key={tag} onClick={() => handleTagSelect(tag)}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
