import React, { useState, useEffect, useContext } from "react";
import Top from "../components/Top";
import DashboardMain from "../components/Dashboard/DashboardMain";
import DashBoardBottom from "../components/Dashboard/DashboardBottom";
import lock from "../img/dashBoardLock.png";

import { loginStatusContext } from "../App.js";

const DashBoard = () => {
  const { login, setLogin } = useContext(loginStatusContext);

  let dashBoardLock = (
    <>
      <div className="lockDashBoardBackgroung"></div>
      <div className="lockDashBoardAlert">
        <img src={lock} alt="" />
        <h4>登入以開始使用交易模擬器</h4>
      </div>
    </>
  );

  const [showLoginLock, setShowLoginLock] = useState("");

  const showLock = () => {
    if (localStorage.login == "false") {
      setShowLoginLock(dashBoardLock);
      return;
    }
    if (localStorage.login == "true") {
      setShowLoginLock("");
      alert(
        "目前即時圖表功能僅開放元大台灣50反1、陽明、南光、寶齡富錦、元大滬深300正2查詢，不便之處，敬請見諒"
      );
      return;
    }
  };

  useEffect(() => {
    showLock();
  }, [login]);

  return (
    <>
      <DashboardMain />
      <DashBoardBottom />
      {showLoginLock}
      <Top />
    </>
  );
};
export default DashBoard;
