import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import logo from "../img/logo.svg";

import { loginStatusContext } from "../App.js";

let n = "";

const NavLogOut = () => {
  const { login, setLogin } = useContext(loginStatusContext);

  const [idNews, setIdNews] = useState("");
  const [idDashboard, setIdDashboard] = useState("");
  const [idCourse, setIdCourse] = useState("");

  const colorNone = () => {
    n = "none";
    colorActive();
  };
  const colorNews = () => {
    n = "news";
    colorActive();
  };
  const colorDashboard = () => {
    n = "dashboard";
    colorActive();
  };
  const colorCourse = () => {
    n = "course";
    colorActive();
  };

  const colorActive = () => {
    if (n == "news") {
      setIdNews("active");
      setIdDashboard("");
      setIdCourse("");
      return;
    }
    if (n == "dashboard") {
      setIdNews("");
      setIdDashboard("active");
      setIdCourse("");
      return;
    }
    if (n == "course") {
      setIdNews("");
      setIdDashboard("");
      setIdCourse("active");
      return;
    } else {
      setIdNews("");
      setIdDashboard("");
      setIdCourse("");
      return;
    }
  };

  useEffect(() => {
    n = window.location.href.split("/")[3];
    colorActive();
  }, []);

  return (
    <nav className="navLogOut" onClick={colorNone}>
      <Link to="/" onClick={colorNone}>
        <img src={logo} alt="" />
      </Link>
      <input type="text" placeholder="查股市、查課程" id="disableInput" />
      <Link to="/news" onClick={colorNews} id={`${idNews}`}>
        最新資訊
      </Link>
      <Link to="/dashboard" onClick={colorDashboard} id={`${idDashboard}`}>
        交易模擬器
      </Link>
      <Link
        to="/"
        onClick={colorCourse}
        // id={`${idCourse}`}
        id="disable"
      >
        課程列表
      </Link>
      <Link>
        <button
          onClick={() => {
            setLogin(true);
          }}
        >
          登入/註冊
        </button>
      </Link>
    </nav>
  );
};

export default NavLogOut;
