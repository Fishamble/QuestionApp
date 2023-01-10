import "./LogInModal.css";
import { useContext } from "react";

import { tagsContext } from "../../Helpers-test/TagsContext";

export default function LogInModal() {
  const { setIsShowNotLoggedInModal } = useContext(tagsContext);

  const handleParentClick = (e) => {
    setIsShowNotLoggedInModal(false);
  };

  const handleChildClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="error-modal-background" onClick={(e) => handleParentClick(e)}>
      <div className="message-box" onClick={(e) => handleChildClick(e)}>
        <div className="error-text">You must be logged in to perform this action</div>
        <div className="cancel-wrapper">
          <button onClick={() => setIsShowNotLoggedInModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
