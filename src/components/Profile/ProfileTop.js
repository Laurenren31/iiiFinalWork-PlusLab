import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import arrow from "../Homepage/homepageImg/arrow.svg";
import backStage from "./profilePageImg/backStageIcon.svg";
import userPic from "./profilePageImg/lanceProfilePic.jpg";
import Top from "../Top";

const ProfileTop = () => {
  let userInfo = [
    {
      key: 1,
      userID: "lance0608",
      password: "lovelauren8787",
      mail: "maggie40796@gmail.com",
      nickName: "Lance Chen",
      profilePic: "./profilePageImg/lanceProfilePic.jpg",
      leftMoney: 98572,
      grade: 3,
    },
  ];

  const [originUserData, setOriginUserData] = useState(userInfo);
  const [showTitle, setShowTitle] = useState([]);
  const [display, setDisplay] = useState("none");

  const changeDisplay = () => {
    if (display == "none") {
      setDisplay("block");
      console.log(display);
      console.log(1);

      return;
    }
    if (display == "block") {
      setDisplay("none");
      console.log(display);

      return;
    }
  };

  useEffect(() => {
    setShowTitle(titleDataMap());
  }, [display]);

  const dotNumber = new Intl.NumberFormat("en-US");

  const titleDataMap = () =>
    originUserData.map((userData) => {
      if (userData.grade == 3) {
        return (
          <div className="profileTitleBox" key={userData.key}>
            <div className="profileContainer">
              <div
                className="profilePic"
                style={{
                  backgroundImage: `url(${userPic})`,
                }}
              ></div>
              <div className="titleContainer">
                <h1>
                  {"Lv." + userData.grade}
                  <span>{userData.nickName}</span>
                </h1>
                <h2>
                  {"當前體驗金餘額：$ " + dotNumber.format(userData.leftMoney)}
                </h2>
              </div>
            </div>
            <div className="buttonBox">
              <Link to="/" id="disableButton">
                <button className="goToBackStage">
                  <img src={backStage} alt="" />
                  <p>前往後臺</p>
                  <img src={arrow} alt="" style={{ paddingLeft: "6px" }} />
                </button>
              </Link>
              <button className="changeInfo" onClick={changeDisplay}>
                修改個人帳戶資訊
              </button>
            </div>
            <div
              className="changeInfoBackgroung"
              style={{ display: `${display}` }}
              onClick={changeDisplay}
            ></div>
            <div className="changeInfoModel" style={{ display: `${display}` }}>
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={changeDisplay}
              >
                <rect
                  x="7.77832"
                  y="24.749"
                  width="24"
                  height="2"
                  transform="rotate(-45 7.77832 24.749)"
                />
                <rect
                  x="9.19238"
                  y="7.77832"
                  width="24"
                  height="2"
                  transform="rotate(45 9.19238 7.77832)"
                />
              </svg>
              <h2>修改個人資料</h2>
              <form>
                <div
                  className="changeProfilePic"
                  style={{
                    backgroundImage: `url(${userPic})`,
                  }}
                >
                  <label htmlFor="uploadProfilePic">
                    <input type="file" id="uploadProfilePic" />
                  </label>
                </div>
                <p>上傳頭像</p>
                <input
                  type="text"
                  placeholder="請輸入新的暱稱"
                  className="changeNickName"
                />
                <input
                  type="text"
                  placeholder="請輸入新的帳號"
                  className="changeUserID"
                />
                <input
                  type="text"
                  placeholder="請輸入新的信箱"
                  className="changeMail"
                />
                <input
                  type="submit"
                  className="submit"
                  onClick={changeDisplay}
                />
              </form>
            </div>
          </div>
        );
      }
    });

  return (
    <div className="profileTop">
      {showTitle}
      <Top />
    </div>
  );
};

export default ProfileTop;
