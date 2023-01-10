import { useContext } from "react";
import { tagsContext } from "../Helpers-test/TagsContext";

import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../Hooks/FirebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


//css
import "./Header.css";
//icons
import { CiDark } from "react-icons/ci";
import { MdWbSunny } from "react-icons/md";
import { RiQuestionnaireFill, RiQuestionnaireLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { CgAdd } from "react-icons/cg";
import HeaderTagBar from "./HeaderTagBar";


export default function Header() {
  const { isDarkMode, setIsDarkMode } = useContext(tagsContext);
  const { isShowAnswers, setIsShowAnswers } = useContext(tagsContext);

  const handleLogin = () => {
  
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

  };

  return (
    <div className="header-wrapper">
      <div className="header">
        <div
          className="dark-mode circle"
          onClick={() => {
            setIsDarkMode((prev) => !prev);
          }}
        >
          {isDarkMode && <MdWbSunny size="3em" />}
          {!isDarkMode && <CiDark size="3em" />}

          {!isDarkMode && <span className="tooltiptext">Dark Mode</span>}
          {isDarkMode && <span className="tooltiptext">Light Mode</span>}
        </div>

        <div
          className="show-answers-icon circle"
          onClick={() => {
            setIsShowAnswers((prev) => !prev);
          }}
        >
          {isShowAnswers && <RiQuestionnaireFill size="3em" />}
          {!isShowAnswers && <RiQuestionnaireLine size="3em" />}

          {isShowAnswers && <span className="tooltiptext">Hide all answers</span>}
          {!isShowAnswers && <span className="tooltiptext">Show all answers</span>}
        </div>

        <div className="contact  circle">
          <AiOutlineMail size="3em" />
        </div>
        <div className="information  circle">
          <IoInformationCircleOutline size="4em" />
        </div>

        <div className="account circle" onClick={() => handleLogin()}>
          <VscAccount size="3em" />
          <span className="tooltiptext">Login</span>
        </div>

        <div className="new-question  circle">
          <CgAdd size="3.5em" />
        </div>
      </div>

      <HeaderTagBar />
    </div>
  );
}
