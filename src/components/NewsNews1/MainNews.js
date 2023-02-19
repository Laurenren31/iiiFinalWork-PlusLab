import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import NewsData from "../News/news.json";
import news1 from "../News/newsHeadPic/news1.webp";
import empty from "../News/newsHeadPic/auto.jpg";
import news3 from "../News/newsHeadPic/news3.webp";
import news4 from "../News/newsHeadPic/news4.webp";
import news5 from "../News/newsHeadPic/news5.webp";
import news6 from "../News/newsHeadPic/news6.webp";
import news7 from "../News/newsHeadPic/news7.webp";
import news9 from "../News/newsHeadPic/news9.webp";
import news10 from "../News/newsHeadPic/news10.png";
import news12 from "../News/newsHeadPic/news12.webp";
import news14 from "../News/newsHeadPic/news14.webp";
import news16 from "../News/newsHeadPic/news16.webp";
import news17 from "../News/newsHeadPic/news17.webp";
import news18 from "../News/newsHeadPic/news18.webp";
import news19 from "../News/newsHeadPic/news19.webp";

const newsImages = {
  news1: news1,
  news2: empty,
  news3: news3,
  news4: news4,
  news5: news5,
  news6: news6,
  news7: news7,
  news8: empty,
  news9: news9,
  news10: news10,
  news11: empty,
  news12: news12,
  news13: empty,
  news14: news14,
  news15: empty,
  news16: news16,
  news17: news17,
  news18: news18,
  news19: news19,
  news20: empty,
};

let fontSizeStatus = false;
let articleCollection = false;

const MainNews = () => {
  const location = useLocation();

  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("連結已複製");
  };
  const collection = () => {
    if (articleCollection == false) {
      articleCollection = true;
      setColorCollection("active");
      return;
    }
    if (articleCollection == true) {
      articleCollection = false;
      setColorCollection("");
      return;
    }
  };

  const [fontSize, setFontSize] = useState("20px");
  const [lineHeight, setLineHeight] = useState("33px");
  const [colorCollection, setColorCollection] = useState("");

  const changeFontSize = () => {
    if (fontSizeStatus == false) {
      fontSizeStatus = true;
      setFontSize("28px");
      setLineHeight("40px");

      return;
    }
    if (fontSizeStatus == true) {
      fontSizeStatus = false;
      setFontSize("20px");
      setLineHeight("33px");

      return;
    }
  };

  const [showData, setShowData] = useState("");

  const showMainNews = () => {
    let dataMap = NewsData.map((news) => {
      if (
        news.key == window.location.href.split("/")[4].split("s")[1] &&
        newsImages[window.location.href.split("/")[4]] !== empty
      ) {
        return (
          <div className="newsBox" key={news.key}>
            <Link to="/news">
              <h3>
                <svg
                  width="24"
                  height="12"
                  viewBox="0 0 24 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.985 7.5L24 7.5L24 4.5L5.985 4.5L5.985 3.32427e-07L-1.38281e-06 6L5.985 12L5.985 7.5Z" />
                </svg>
                回上一頁
              </h3>
            </Link>
            <h2>{news.title}</h2>
            <h4>
              {news.time}
              <span>{"編輯：" + news.auther}</span>
            </h4>
            <div className="imgBox">
              <div className="iconBox">
                <svg
                  width="20"
                  height="22"
                  viewBox="0 0 20 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="share"
                  onClick={copyURL}
                >
                  <path
                    d="M16.6667 15.5502C15.8222 15.5502 15.0667 15.8815 14.4889 16.4006L6.56667 11.8173C6.62222 11.5633 6.66667 11.3092 6.66667 11.0442C6.66667 10.7791 6.62222 10.5251 6.56667 10.2711L14.4 5.73193C15 6.28414 15.7889 6.62651 16.6667 6.62651C18.5111 6.62651 20 5.14659 20 3.31325C20 1.47992 18.5111 0 16.6667 0C14.8222 0 13.3333 1.47992 13.3333 3.31325C13.3333 3.57831 13.3778 3.83233 13.4333 4.08635L5.6 8.6255C5 8.07329 4.21111 7.73092 3.33333 7.73092C1.48889 7.73092 0 9.21084 0 11.0442C0 12.8775 1.48889 14.3574 3.33333 14.3574C4.21111 14.3574 5 14.0151 5.6 13.4629L13.5111 18.0572C13.4556 18.2892 13.4222 18.5321 13.4222 18.7751C13.4222 20.5532 14.8778 22 16.6667 22C18.4556 22 19.9111 20.5532 19.9111 18.7751C19.9111 16.997 18.4556 15.5502 16.6667 15.5502Z"
                    fill="#E23965"
                  />
                </svg>
                <svg
                  width="23"
                  height="18"
                  viewBox="0 0 23 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fontSize"
                  onClick={changeFontSize}
                >
                  <path
                    d="M7.26316 0V3.6H13.3158V18H16.9474V3.6H23V0H7.26316ZM0 9.6H3.63158V18H7.26316V9.6H10.8947V6H0V9.6Z"
                    fill="#E23965"
                  />
                </svg>
              </div>

              <div className="imgContainer">
                <img
                  src={newsImages[window.location.href.split("/")[4]]}
                  className="newsImage"
                />
              </div>
            </div>

            <p style={{ fontSize: `${fontSize}`, lineHeight: `${lineHeight}` }}>
              {news.article
                .split("。")
                .map((sentence, index) => (
                  <React.Fragment key={index}>
                    {sentence + "。"}
                    <br />
                    <br />
                  </React.Fragment>
                ))
                .slice(0, -1)}
              <br />
            </p>
          </div>
        );
      }
      if (
        news.key == window.location.href.split("/")[4].split("s")[1] &&
        newsImages[window.location.href.split("/")[4]] == empty
      ) {
        return (
          <div className="newsBox" key={news.key}>
            <Link to="/news">
              <h3>
                <svg
                  width="24"
                  height="12"
                  viewBox="0 0 24 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.985 7.5L24 7.5L24 4.5L5.985 4.5L5.985 3.32427e-07L-1.38281e-06 6L5.985 12L5.985 7.5Z" />
                </svg>
                回上一頁
              </h3>
            </Link>
            <h2>{news.title}</h2>
            <h4>
              {news.time}
              <span>{"編輯：" + news.auther}</span>
            </h4>
            <div className="noImgNews">
              <div className="imgBox">
                <div className="iconBox">
                  <svg
                    width="20"
                    height="22"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="share"
                    onClick={copyURL}
                  >
                    <path
                      d="M16.6667 15.5502C15.8222 15.5502 15.0667 15.8815 14.4889 16.4006L6.56667 11.8173C6.62222 11.5633 6.66667 11.3092 6.66667 11.0442C6.66667 10.7791 6.62222 10.5251 6.56667 10.2711L14.4 5.73193C15 6.28414 15.7889 6.62651 16.6667 6.62651C18.5111 6.62651 20 5.14659 20 3.31325C20 1.47992 18.5111 0 16.6667 0C14.8222 0 13.3333 1.47992 13.3333 3.31325C13.3333 3.57831 13.3778 3.83233 13.4333 4.08635L5.6 8.6255C5 8.07329 4.21111 7.73092 3.33333 7.73092C1.48889 7.73092 0 9.21084 0 11.0442C0 12.8775 1.48889 14.3574 3.33333 14.3574C4.21111 14.3574 5 14.0151 5.6 13.4629L13.5111 18.0572C13.4556 18.2892 13.4222 18.5321 13.4222 18.7751C13.4222 20.5532 14.8778 22 16.6667 22C18.4556 22 19.9111 20.5532 19.9111 18.7751C19.9111 16.997 18.4556 15.5502 16.6667 15.5502Z"
                      fill="#E23965"
                    />
                  </svg>
                  <svg
                    width="23"
                    height="18"
                    viewBox="0 0 23 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fontSize"
                    onClick={changeFontSize}
                  >
                    <path
                      d="M7.26316 0V3.6H13.3158V18H16.9474V3.6H23V0H7.26316ZM0 9.6H3.63158V18H7.26316V9.6H10.8947V6H0V9.6Z"
                      fill="#E23965"
                    />
                  </svg>
                </div>
              </div>
              <p
                style={{ fontSize: `${fontSize}`, lineHeight: `${lineHeight}` }}
              >
                {news.article
                  .split("。")
                  .map((sentence, index) => (
                    <React.Fragment key={index}>
                      {sentence + "。"}
                      <br />
                      <br />
                    </React.Fragment>
                  ))
                  .slice(0, -1)}
                <br />
              </p>
            </div>
          </div>
        );
      }
    });
    setShowData(dataMap);
  };

  useMemo(() => {
    showMainNews();
  }, [fontSize, location, colorCollection]);

  return <div className="mainNews">{showData}</div>;
};

export default MainNews;
