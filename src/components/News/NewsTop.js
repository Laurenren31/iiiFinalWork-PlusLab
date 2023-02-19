import React from "react";
import NewsData from "./news.json";
import news1 from "./newsHeadPic/news1.webp";
import news2 from "./newsHeadPic/auto.jpg";
import news3 from "./newsHeadPic/news3.webp";
import news4 from "./newsHeadPic/news4.webp";
import { Link } from "react-router-dom";

const NewsTop = () => {
  const highlightNews = NewsData.map((news) => {
    if (news.highLight == 1) {
      return (
        <div className="highlightNewsContainer" key={news.key}>
          <Link to="/news/news1">
            <div
              className="highlightNewsImg"
              style={{
                backgroundImage: `url(${news1})`,
              }}
            ></div>
          </Link>
          <Link to="/news/news1">
            <h2>{news.title}</h2>
          </Link>
          <h4>{news.time}</h4>
          <p>{news.article.slice(0, 50) + "..."}</p>
        </div>
      );
    }
  });

  const secondaryHighlightNews = NewsData.map((news) => {
    if (news.highLight == 21) {
      return (
        <div className="highlightNewsContainer2" key={news.key}>
          <Link to="/news/news2">
            <div
              className="highlightNewsImg2"
              style={{
                backgroundImage: `url(${news2})`,
              }}
            ></div>
          </Link>
          <div className="pBox">
            <Link to="/news/news2">
              <h3>{news.title}</h3>
            </Link>
            <h4>{news.time}</h4>
            <p>{news.article.slice(0, 30) + "..."}</p>
          </div>
        </div>
      );
    }
    if (news.highLight == 22) {
      return (
        <div className="highlightNewsContainer2" key={news.key}>
          <Link to="/news/news3">
            <div
              className="highlightNewsImg2"
              style={{
                backgroundImage: `url(${news3})`,
              }}
            ></div>
          </Link>
          <div className="pBox">
            <Link to="/news/news3">
              <h3>{news.title}</h3>
            </Link>
            <h4>{news.time}</h4>
            <p>{news.article.slice(0, 30) + "..."}</p>
          </div>
        </div>
      );
    }
    if (news.highLight == 23) {
      return (
        <div className="highlightNewsContainer2" key={news.key}>
          <Link to="/news/news4">
            <div
              className="highlightNewsImg2"
              style={{
                backgroundImage: `url(${news4})`,
              }}
            ></div>
          </Link>

          <div className="pBox">
            <Link to="/news/news4">
              <h3>{news.title}</h3>
            </Link>

            <h4>{news.time}</h4>
            <p>{news.article.slice(0, 30) + "..."}</p>
          </div>
        </div>
      );
    }
  });

  return (
    <div className="newsTop">
      <h1>最新資訊</h1>
      <div className="newsBox">
        <div className="newsBoxLeft">{highlightNews}</div>
        <div className="newsBoxRight">{secondaryHighlightNews}</div>
      </div>
    </div>
  );
};

export default NewsTop;
