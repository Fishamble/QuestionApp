import "./ErrorModal.css";

export default function ErrorModal({ errorMessage }) {
  return (
    <div className="error-modal-background">
      <div className="message-box">
        <div>{errorMessage}</div>
      </div>
    </div>
  );
}




