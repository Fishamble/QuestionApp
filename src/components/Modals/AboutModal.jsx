import "./AboutModal.css";

export default function AboutModal({ setIsShowAboutModal }) {
  const handleBrClick = () => {
    console.log("here");
    setIsShowAboutModal(false);
  };

  const handleChildClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="about-modal-background" onClick={() => handleBrClick()}>
      <div className="about-box" onClick={(e) => handleChildClick(e)}>
        <div className="about-text">
          <ul>
            <li>
              During my studies, I would google terms which I had not yet come across. I kept a doc open on chrome and would write the question and
              answers into it, ocassionaly reading back over them to refresh my memory.{" "}
            </li>
            <li>
              At some stage I challenged myself to parse the text document, seperating each question and uploading them to a firestore collection.
              This app was built around the resulting collection.
            </li>
            <li>
              Please note I have not gone back to edit the original questions. Some of them are likely incorrect, so dont judge me on the content.
            </li>
            <li>My main goal while building this app was to apply my knowledge of react, js and css fundamentals.</li>
            <li>
              Along the way I learned about firestore and the basics of auth. In react I implemented basic global state, using the useContext hook.
            </li>
          </ul>
        </div>
        <div className="button-wrapper">
          <button onClick={() => setIsShowAboutModal(false)}>Close</button>
        </div>
      </div>
    </div>
  );
}
