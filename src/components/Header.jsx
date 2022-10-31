import { useState, useContext } from "react";
import { tagsContext } from "../Helpers-test/TagsContext";

//css
import "./Header.css";
//icons
import { CiDark } from "react-icons/ci";
import { MdWbSunny } from "react-icons/md";
import { RiQuestionnaireFill, RiQuestionnaireLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { GrAddCircle } from "react-icons/gr";

export default function Header() {
  const { isDarkMode, setIsDarkMode } = useContext(tagsContext);
  const { isShowAnswers, setIsShowAnswers } = useContext(tagsContext);

  return (
    <div className="header">
      <div
        className="dark-mode circle"
        onClick={() => {
          setIsDarkMode((prev) => !prev);
        }}
      >
        {isDarkMode && <CiDark size="3em" />}
        {!isDarkMode && <MdWbSunny size="3em" />}
      </div>

      <div
        className="show-answers  circle"
        onClick={() => {
          setIsShowAnswers((prev) => !prev);
        }}
      >
        {isShowAnswers && <RiQuestionnaireFill size="3em" />}
        {!isShowAnswers && <RiQuestionnaireLine size="3em" />}
      </div>
      <div className="contact  circle">
        <AiOutlineMail size="3em" />
      </div>
      <div className="information  circle">
        <IoInformationCircleOutline size="4em" />
      </div>
      <div className="account  circle">
        <VscAccount size="3em" />
      </div>
      <div className="new-question  circle">
        <GrAddCircle size="3em" />
      </div>
    </div>
  );
}
