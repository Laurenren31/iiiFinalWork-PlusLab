import React from "react";
import { useContext, useState, useEffect } from "react";
import NewsData from "./news.json";
import { Link } from "react-router-dom";
import news5 from "./newsHeadPic/news5.webp";
import news6 from "./newsHeadPic/news6.webp";
import news7 from "./newsHeadPic/news7.webp";
import news8 from "./newsHeadPic/auto.jpg";
import news9 from "./newsHeadPic/news9.webp";
import news10 from "./newsHeadPic/news10.png";
import news11 from "./newsHeadPic/auto.jpg";
import news12 from "./newsHeadPic/news12.webp";
import news13 from "./newsHeadPic/auto.jpg";
import news14 from "./newsHeadPic/news14.webp";
import news15 from "./newsHeadPic/auto.jpg";
import news16 from "./newsHeadPic/news16.webp";
import news17 from "./newsHeadPic/news17.webp";
import news18 from "./newsHeadPic/news18.webp";
import news19 from "./newsHeadPic/news19.webp";
import news20 from "./newsHeadPic/auto.jpg";
import { articleValueContext } from "../../App.js";

const newsImages = {
  news5: news5,
  news6: news6,
  news7: news7,
  news8: news8,
  news9: news9,
  news10: news10,
  news11: news11,
  news12: news12,
  news13: news13,
  news14: news14,
  news15: news15,
  news16: news16,
  news17: news17,
  news18: news18,
  news19: news19,
  news20: news20,
};

const NewsBottom = () => {
  const articleValue = useContext(articleValueContext);

  const newsBottomInfo = NewsData.map((news, index) => {
    if (news.highLight == 3 && index < articleValue) {
      let n = "news" + news.key;
      return (
        <div className="newsBottomBox" key={news.key}>
          <Link to={`/news/news${news.key}`}>
            <div
              className="newsBottomImg"
              style={{
                backgroundImage: `url(${newsImages[n]})`,
              }}
            ></div>
          </Link>
          <div className="pBox">
            <h3>{news.title}</h3>
            <h4>{news.time}</h4>
            <p>{news.article.slice(0, 100) + "..."}</p>
          </div>
        </div>
      );
    }
  });
  return (
    <div className="newsBottom">
      {newsBottomInfo}
      <h1>已經沒有更多資訊了</h1>
    </div>
  );
};

export default NewsBottom;
