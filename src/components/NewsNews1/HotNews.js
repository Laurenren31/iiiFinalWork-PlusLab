import React from "react";
import NewsData from "../News/news.json";
import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import news1 from "../News/newsHeadPic/news1.webp";
import news2 from "../News/newsHeadPic/auto.jpg";
import news3 from "../News/newsHeadPic/news3.webp";
import news4 from "../News/newsHeadPic/news4.webp";
import news5 from "../News/newsHeadPic/news5.webp";
import news6 from "../News/newsHeadPic/news6.webp";
import news7 from "../News/newsHeadPic/news7.webp";
import news8 from "../News/newsHeadPic/auto.jpg";
import news9 from "../News/newsHeadPic/news9.webp";
import news10 from "../News/newsHeadPic/news10.png";
import news11 from "../News/newsHeadPic/auto.jpg";
import news12 from "../News/newsHeadPic/news12.webp";
import news13 from "../News/newsHeadPic/auto.jpg";
import news14 from "../News/newsHeadPic/news14.webp";
import news15 from "../News/newsHeadPic/auto.jpg";
import news16 from "../News/newsHeadPic/news16.webp";
import news17 from "../News/newsHeadPic/news17.webp";
import news18 from "../News/newsHeadPic/news18.webp";
import news19 from "../News/newsHeadPic/news19.webp";
import news20 from "../News/newsHeadPic/auto.jpg";

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

let fiveNumTemp = [];
let fiveNumTemp2 = [];

const HotNews = () => {
  const location = useLocation();

  const otherHotData = NewsData.filter(function (item) {
    return item.key != window.location.href.split("/")[4].split("s")[1];
  });

  const [fiveRandonNum, setFiveRandonNum] = useState([]);

  const getFiveRandomNumbers = () => {
    if (fiveNumTemp2 == []) {
      while (fiveNumTemp2.length < 6) {
        let randomNumber = Math.floor(Math.random() * 19);
        if (!fiveNumTemp2.includes(randomNumber)) {
          fiveNumTemp2.push(randomNumber);
        }
      }
    }
    if (fiveNumTemp2 !== []) {
      fiveNumTemp = fiveNumTemp2;
      fiveNumTemp2 = [];
      while (fiveNumTemp2.length < 6) {
        let randomNumber = Math.floor(Math.random() * 19);
        if (
          !fiveNumTemp2.includes(randomNumber) &&
          !fiveNumTemp.includes(randomNumber)
        ) {
          fiveNumTemp2.push(randomNumber);
        }
      }
    }

    setFiveRandonNum(fiveNumTemp2);
  };
  useMemo(() => {
    getFiveRandomNumbers();
  }, [location]);

  const [showData, setShowData] = useState("");
  const dataMap = () => {
    let finalData = otherHotData.map((news) => {
      if (
        otherHotData.indexOf(news) == fiveRandonNum[0] ||
        otherHotData.indexOf(news) == fiveRandonNum[1] ||
        otherHotData.indexOf(news) == fiveRandonNum[2] ||
        otherHotData.indexOf(news) == fiveRandonNum[3] ||
        otherHotData.indexOf(news) == fiveRandonNum[4]
      ) {
        let n = "news" + news.key;
        return (
          <div className="hotNewsBox" key={news.key}>
            <Link to={`/news/news${news.key}`}>
              <div
                className="hotNewsImg"
                style={{
                  backgroundImage: `url(${newsImages[n]})`,
                }}
              ></div>
              <h5>{news.title}</h5>{" "}
            </Link>
          </div>
        );
      }
    });
    setShowData(finalData);
  };

  useEffect(() => {
    getFiveRandomNumbers();
  }, []);

  useEffect(() => {
    dataMap();
  }, [fiveRandonNum]);

  return (
    <div className="hotNews">
      <h4>
        熱門資訊
        <svg
          width="24"
          height="17"
          viewBox="0 0 24 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            getFiveRandomNumbers();
          }}
        >
          <path d="M19.6364 4.25L15.2727 8.5H18.5455C18.5455 12.0169 15.6109 14.875 12 14.875C10.8982 14.875 9.85091 14.6094 8.94545 14.1312L7.35273 15.6825C8.69455 16.5112 10.2873 17 12 17C16.8218 17 20.7273 13.1962 20.7273 8.5H24L19.6364 4.25ZM5.45455 8.5C5.45455 4.98312 8.38909 2.125 12 2.125C13.1018 2.125 14.1491 2.39062 15.0545 2.86875L16.6473 1.3175C15.3055 0.48875 13.7127 0 12 0C7.17818 0 3.27273 3.80375 3.27273 8.5H0L4.36364 12.75L8.72727 8.5H5.45455Z" />
        </svg>
      </h4>

      {showData}
    </div>
  );
};

export default HotNews;
