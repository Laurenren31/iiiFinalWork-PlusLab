import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ProfileStockCollection = () => {
  const options = [
    {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      },
      scales: {
        y: {
          display: false,
        },

        x: {
          display: false,
        },
      },
      animation: {
        duration: 0,
      },
      responsiveAnimationDuration: 0,
    },
  ];

  const labels = [
    "yday",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
  ];

  let data = [
    {
      labels,
      datasets: [
        {
          label: "00632R",
          data: stockValue[0].value,
          fill: true,
          borderColor: "#4967ff",
          backgroundColor: ({ chart: { ctx } }) => {
            const bg = ctx.createLinearGradient(0, 0, 0, 300);
            bg.addColorStop(0, "rgba(73,103,255,0.3)");
            bg.addColorStop(1, "rgba(73,103,255,0)");
            return bg;
          },
          borderWidth: 4,
          pointRadius: 1,
        },
      ],
    },
  ];

  // API串接
  const [results, setResults] = useState(null);

  useEffect(() => {
    const search = async () => {
      const dataFetch = await fetch(
        "https://cors-anywhere.herokuapp.com/https://mis.twse.com.tw/stock/api/getStockInfo.jsp?json=1&delay=0&ex_ch=tse_00632R.tw|tse_2609.tw|tse_1752.tw|tse_1760.tw|tse_00637L.tw|tse_2615.tw|tse_6443.tw|tse_1605.tw|tse_2618.tw|tse_2610.tw|tse_00885.tw|tse_1417.tw|tse_2014.tw|tse_2603.tw|tse_2303.tw|tse_3481.tw|tse_2201.tw|tse_00878.tw|tse_2002.tw|tse_2409.tw|"
      );
      let parsedData = await dataFetch.json();
      let retry = await parsedData.msgArray;
      setResults(retry);
    };
    search();
  }, []);

  const [originData, setOriginData] = useState(myStockCollection);

  const mapValue = () => {
    if (results) {
      const mapTwoValue = results.map((e) => {
        const temp = myStockCollection.find((ele) => e.c === ele.stockKey);
        if (temp !== undefined) {
          e.collection = temp.collection;
          e.key = temp.key;
          return e;
        }
      });
      setOriginData(mapTwoValue);
      return;
    }
  };

  useMemo(() => {
    mapValue();
  }, [results]);

  const [showData, setShowData] = useState("");

  const handleMap = () => {
    if (originData[0].c != null) {
      let dataMap = originData.map((originData) => {
        if (
          originData.collection == true &&
          Number(originData.b.split("_")[0] - originData.y) > 0
        ) {
          return (
            <div key={originData.key} className="stockCollectionBox">
              <div className="pContainer">
                <svg
                  className="collection"
                  width="25"
                  height="32.5"
                  viewBox="0 0 20 26"
                  fill="#E23965"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="collectionBackground"
                    d="M2.85714 0H17.1429C18.7143 0 20 1.3 20 2.88889V26L10 21.6667L0 26L0.014286 2.88889C0.014286 1.3 1.28571 0 2.85714 0Z"
                  />
                  <path
                    className="collectionBorder"
                    d="M17.1429 0H2.85714C1.28571 0 0.014286 1.3 0.014286 2.88889L0 26L10 21.6667L20 26V2.88889C20 1.3 18.7143 0 17.1429 0ZM17.1429 21.6667L10 18.5178L2.85714 21.6667V2.88889H17.1429V21.6667Z"
                    fill="#E23965"
                  />
                </svg>
                <div className="pBox">
                  <h2>
                    {originData.n}
                    <span>{originData.c}</span>
                  </h2>
                  <h3 style={{ color: "#e23965" }}>
                    {Number(originData.b.split("_")[0]).toFixed(2)}
                    <span>
                      {"+" +
                        Number(
                          originData.b.split("_")[0] - originData.y
                        ).toFixed(2)}
                    </span>
                    <span>
                      {"(+" +
                        (
                          (Number(originData.b.split("_")[0] - originData.y) /
                            Number(originData.b.split("_")[0])) *
                          100
                        ).toFixed(2) +
                        "%)"}
                    </span>
                  </h3>
                </div>
              </div>

              <div className="chartBox">
                <Line
                  options={options[originData.key - 1]}
                  data={data[originData.key - 1]}
                  width="160px"
                  height="80px"
                />
              </div>
            </div>
          );
        }
        if (
          originData.collection == true &&
          Number(originData.b.split("_")[0] - originData.y) < 0
        ) {
          return (
            <div key={originData.key} className="stockCollectionBox">
              <div className="pContainer">
                <svg
                  className="collection"
                  width="25"
                  height="32.5"
                  viewBox="0 0 20 26"
                  fill="#E23965"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="collectionBackground"
                    d="M2.85714 0H17.1429C18.7143 0 20 1.3 20 2.88889V26L10 21.6667L0 26L0.014286 2.88889C0.014286 1.3 1.28571 0 2.85714 0Z"
                  />
                  <path
                    className="collectionBorder"
                    d="M17.1429 0H2.85714C1.28571 0 0.014286 1.3 0.014286 2.88889L0 26L10 21.6667L20 26V2.88889C20 1.3 18.7143 0 17.1429 0ZM17.1429 21.6667L10 18.5178L2.85714 21.6667V2.88889H17.1429V21.6667Z"
                    fill="#E23965"
                  />
                </svg>
                <div className="pBox">
                  <h2>
                    {originData.n}
                    <span>{originData.c}</span>
                  </h2>
                  <h3 style={{ color: "#38e54d" }}>
                    {Number(originData.b.split("_")[0]).toFixed(2)}
                    <span>
                      {Number(
                        originData.b.split("_")[0] - originData.y
                      ).toFixed(2)}
                    </span>
                    <span>
                      {"(" +
                        (
                          (Number(originData.b.split("_")[0] - originData.y) /
                            Number(originData.b.split("_")[0])) *
                          100
                        ).toFixed(2) +
                        "%)"}
                    </span>
                  </h3>
                </div>
              </div>

              <div className="chartBox">
                <Line
                  options={options[originData.key - 1]}
                  data={data[originData.key - 1]}
                  width="160px"
                  height="80px"
                />
              </div>
            </div>
          );
        }
        if (
          originData.collection == true &&
          Number(originData.b.split("_")[0] - originData.y) == 0
        ) {
          return (
            <div key={originData.key} className="stockCollectionBox">
              <div className="pContainer">
                <svg
                  className="collection"
                  width="25"
                  height="32.5"
                  viewBox="0 0 20 26"
                  fill="#E23965"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="collectionBackground"
                    d="M2.85714 0H17.1429C18.7143 0 20 1.3 20 2.88889V26L10 21.6667L0 26L0.014286 2.88889C0.014286 1.3 1.28571 0 2.85714 0Z"
                  />
                  <path
                    className="collectionBorder"
                    d="M17.1429 0H2.85714C1.28571 0 0.014286 1.3 0.014286 2.88889L0 26L10 21.6667L20 26V2.88889C20 1.3 18.7143 0 17.1429 0ZM17.1429 21.6667L10 18.5178L2.85714 21.6667V2.88889H17.1429V21.6667Z"
                    fill="#E23965"
                  />
                </svg>
                <div className="pBox">
                  <h2>
                    {originData.n}
                    <span>{originData.c}</span>
                  </h2>
                  <h3 style={{ color: "#ffffff" }}>
                    {Number(originData.b.split("_")[0]).toFixed(2)}
                    <span>
                      {Number(
                        originData.b.split("_")[0] - originData.y
                      ).toFixed(2)}
                    </span>
                    <span>
                      {"(" +
                        (
                          (Number(originData.b.split("_")[0] - originData.y) /
                            Number(originData.b.split("_")[0])) *
                          100
                        ).toFixed(2) +
                        "%)"}
                    </span>
                  </h3>
                </div>
              </div>

              <div className="chartBox">
                <Line
                  options={options[originData.key - 1]}
                  data={data[originData.key - 1]}
                  width="160px"
                  height="80px"
                />
              </div>
            </div>
          );
        }
      });
      setShowData(dataMap);
      return;
    } else {
      return;
    }
  };

  useMemo(() => {
    handleMap();
  }, [originData]);

  return (
    <div className="profileStockCollection">
      <table>
        <tbody>
          <tr>
            <td>
              <Link to="/profile">
                <h2 style={{ boxShadow: "0px 4px #e23965" }}>自選股</h2>
              </Link>
            </td>
            <td></td>
            <td>
              <Link to="/profile/ownCourse">
                <h2>已購買的課程</h2>
              </Link>
            </td>
            <td></td>
            <td>
              <Link to="/profile/courseCollection">
                <h2>已收藏的課程</h2>
              </Link>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div className="showDataBox">{showData}</div>
    </div>
  );
};

export default ProfileStockCollection;
