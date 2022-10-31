import TagDropDown from "./TagDropDown";

export default function TagInput({ cateogryInputRef, isShowTagInput, setTagInput, tagInput }) {
  return (
    <div className="tag-input">
      <input
        type="text"
        ref={cateogryInputRef}
        className={isShowTagInput ? "input show" : "input"}
        placeholder="Add category tag"
        onChange={(e) => setTagInput(e.target.value)}
        value={tagInput}
      ></input>
    <TagDropDown isShowTagInput={isShowTagInput} setTagInput={setTagInput}/>
    </div>
  );
}
