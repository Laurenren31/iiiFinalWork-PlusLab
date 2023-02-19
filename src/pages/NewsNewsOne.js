import React from "react";
import HotNews from "../components/NewsNews1/HotNews";
import MainNews from "../components/NewsNews1/MainNews";
import news1 from "../components/News/newsHeadPic/news1.webp";
import news2 from "../components/News/newsHeadPic/auto.jpg";
import news3 from "../components/News/newsHeadPic/news3.webp";
import news4 from "../components/News/newsHeadPic/news4.webp";
import news5 from "../components/News/newsHeadPic/news5.webp";
import news6 from "../components/News/newsHeadPic/news6.webp";
import news7 from "../components/News/newsHeadPic/news7.webp";
import news8 from "../components/News/newsHeadPic/auto.jpg";
import news9 from "../components/News/newsHeadPic/news9.webp";
import news10 from "../components/News/newsHeadPic/news10.png";
import news11 from "../components/News/newsHeadPic/auto.jpg";
import news12 from "../components/News/newsHeadPic/news12.webp";
import news13 from "../components/News/newsHeadPic/auto.jpg";
import news14 from "../components/News/newsHeadPic/news14.webp";
import news15 from "../components/News/newsHeadPic/auto.jpg";
import news16 from "../components/News/newsHeadPic/news16.webp";
import news17 from "../components/News/newsHeadPic/news17.webp";
import news18 from "../components/News/newsHeadPic/news18.webp";
import news19 from "../components/News/newsHeadPic/news19.webp";
import news20 from "../components/News/newsHeadPic/auto.jpg";

const newsImages = {
  news1: news1,
  news2: news2,
  news3: news3,
  news4: news4,
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

const NewsNewsOne = () => {
  return (
    <>
      <div
        className="newNewsOne"
        style={{
          backgroundImage: `url(${
            newsImages[window.location.href.split("/")[4]]
          })`,
        }}
      ></div>

      <HotNews />
      <MainNews />
    </>
  );
};

export default NewsNewsOne;
