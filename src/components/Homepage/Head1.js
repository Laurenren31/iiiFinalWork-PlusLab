import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "./homepageImg/logo.svg";
import arrow from "./homepageImg/arrow.svg";
import { loginStatusContext } from "../../App.js";

const Head1 = () => {
  const { login, setLogin } = useContext(loginStatusContext);

  const backgroundMove = (e) => {
    let cx = e.clientX;
    let cy = e.clientY;
    let x = -80 + cx / 24;
    let y = -80 + (cy - 88) / 13;
    e.target.style.backgroundPosition = `right ${x}px bottom ${y}px`;
    e.target.style.transition = "0s";
  };

  const backgroundStop = (e) => {
    e.target.style.backgroundPosition = " right -80px bottom -80px";
    e.target.style.transition = "1s";
  };

  const button = (
    <Link to="/">
      <button
        onClick={() => {
          setLogin(true);
        }}
      >
        立即登入，開始體驗
        <img src={arrow} alt="" />
      </button>
    </Link>
  );
  const [showLoginButton, setShowLoginButton] = useState(button);

  useEffect(() => {
    showButton();
  }, [login]);

  const showButton = () => {
    if (localStorage.login == "false") {
      setShowLoginButton(button);
      return;
    }
    if (localStorage.login == "true") {
      setShowLoginButton("");
      return;
    }
  };

  return (
    <div
      className="head1"
      onMouseMove={backgroundMove}
      onMouseLeave={backgroundStop}
    >
      <h2 style={{ pointerEvents: "none" }}>
        最清晰直覺的
        <br />
        投資模擬教學網站
      </h2>
      <img src={logo} alt="" style={{ pointerEvents: "none" }} />
      {showLoginButton}
    </div>
  );
};

export default Head1;
