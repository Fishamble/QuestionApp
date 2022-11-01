import { VscEdit } from "react-icons/vsc";

export default function Edit({ handleEdit }) {
  return (
    <div className="edit" onClick={handleEdit}>
      <VscEdit className="edit-font" />
    </div>
  );
}
