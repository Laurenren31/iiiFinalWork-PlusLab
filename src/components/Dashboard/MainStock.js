import React, { useContext, useState, useEffect, useMemo } from "react";
import { resultsContext } from "./DashboardMain";
import { myStockCollectionContext } from "./DashboardMain";
import { myStockCollectionTempContext } from "./DashboardMain";
import { addOrRemoveCollectionContext } from "./DashboardMain";
import { categoryContext } from "./DashboardMain";
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

// chart
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

let stockValueOntime = [
  {
    stockKey: "00632R",
    value: [],
  },
];

const stockValue = [
  {
    stockKey: "00632R",
    value: [
      5.82, 5.74, 5.74, 5.74, 5.74, 5.74, 5.74, 5.72, 5.72, 5.66, 5.66, 5.66,
      5.66, 5.66, 5.66, 5.66, 5.66, 5.66, 5.67, 5.68, 5.68, 5.68, 5.69, 5.69,
      5.68, 5.68, 5.68, 5.68, 5.68, 5.68, 5.68, 5.68, 5.68, 5.68, 5.69, 5.68,
      5.69, 5.68, 5.69, 5.7, 5.7, 5.7, 5.69, 5.69, 5.69, 5.69, 5.7, 5.7, 5.7,
      5.7, 5.69, 5.69, 5.69, 5.69, 5.69, 5.69, 5.69, 5.69, 5.69, 5.69, 5.69,
      5.7, 5.7, 5.69, 5.7, 5.7, 5.7, 5.7, 5.7, 5.7, 5.69, 5.7, 5.7, 5.7, 5.7,
      5.7, 5.71, 5.71, 5.71, 5.71, 5.71, 5.72, 5.72, 5.72, 5.72, 5.72, 5.72,
      5.71, 5.72, 5.71, 5.71,
    ],
  },
];

export const options = [
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
        display: true,
        grid: {
          color: "#1d1f27",
          borderColor: "#1d1f27",
        },
      },
      x: {
        display: true,
        grid: {
          color: "#1d1f27",
          borderColor: "#1d1f27",
        },
      },
    },
    animation: {
      duration: 0,
    },
    responsiveAnimationDuration: 0,
  },
];

let stockBasicInfo = [
  {
    key: "1",
    stockKey: "00632R",
    aTitle: "全名",
    aInfo: "元大ETF傘型證券投資信託基金之台灣50單日反向1倍證券投資信託基金",
    bTitle: "追蹤指數",
    bInfo: "臺灣50指數",
    cTitle: "保管費率",
    cInfo: "0.04%",
    dTitle: "資產規模",
    dInfo: "60,258.00(百萬)",
    eTitle: "經理人",
    eInfo: "陳威志",
    fTitle: "管理費率",
    fInfo: "1.0000%",
    gTitle: "公司網站",
    gInfo: "http://www.yuantaetfs.com",
    hTitle: "發行公司",
    hInfo: "元大證券投資信託股份有限公司",
  },
];

const MainStock = (props) => {
  const resultsValues = useContext(resultsContext);
  const addOrRemoveCollection = useContext(addOrRemoveCollectionContext);
  let myStockCollection = useContext(myStockCollectionContext);
  const { category, setCategory } = useContext(categoryContext);
  const { myStockCollectionTemp, setMyStockCollectionTemp } = useContext(
    myStockCollectionTempContext
  );

  const [originData, setOriginData] = useState(myStockCollection);

  const labels = [
    "yday",
    "9:00",
    "9:05",
    "9:10",
    "9:15",
    "9:20",
    "9:25",
    "9:30",
    "9:35",
    "9:40",
    "9:45",
    "9:50",
    "9:55",
    "10:00",
    "10:05",
    "10:10",
    "10:15",
    "10:20",
    "10:25",
    "10:30",
    "10:35",
    "10:40",
    "10:45",
    "10:50",
    "10:55",
    "11:00",
    "11:05",
    "11:10",
    "11:15",
    "11:20",
    "11:25",
    "11:30",
    "11:35",
    "11:40",
    "11:45",
    "11:50",
    "11:55",
    "12:00",
    "12:05",
    "12:10",
    "12:15",
    "12:20",
    "12:25",
    "12:30",
    "12:35",
    "12:40",
    "12:45",
    "12:50",
    "12:55",
    "13:00",
    "13:05",
    "13:10",
    "13:15",
    "13:20",
    "13:25",
    "13:30",
  ];

  let data = [
    {
      labels,
      datasets: [
        {
          label: "00632R",
          data: [],
          fill: true,
          borderColor: "#4967ff",
          backgroundColor: ({ chart: { ctx } }) => {
            const bg = ctx.createLinearGradient(0, 0, 0, 300);
            bg.addColorStop(0, "rgba(73,103,255,0.8)");
            bg.addColorStop(1, "rgba(73,103,255,0)");
            return bg;
          },
          borderWidth: 4,
          pointRadius: 1,
        },
      ],
    },
  ];

  const mapValue = () => {
    if (resultsValues !== []) {
      const mapThreeValue = resultsValues.map((e) => {
        const temp = stockBasicInfo.find((ele) => e.c === ele.stockKey);
        const temp2 = myStockCollectionTemp.find((ele) => e.c === ele.stockKey);
        if (temp !== undefined && temp2 !== undefined) {
          e.aTitle = temp.aTitle;
          e.bTitle = temp.bTitle;
          e.cTitle = temp.cTitle;
          e.dTitle = temp.dTitle;
          e.eTitle = temp.eTitle;
          e.fTitle = temp.fTitle;
          e.gTitle = temp.gTitle;
          e.hTitle = temp.hTitle;
          e.aInfo = temp.aInfo;
          e.bInfo = temp.bInfo;
          e.cInfo = temp.cInfo;
          e.dInfo = temp.dInfo;
          e.eInfo = temp.eInfo;
          e.fInfo = temp.fInfo;
          e.gInfo = temp.gInfo;
          e.hInfo = temp.hInfo;
          e.collection = temp2.collection;
          e.key = temp2.key;
        }
        return e;
      });
      setOriginData(mapThreeValue);
      return;
    }
  };

  useMemo(() => mapValue(), [resultsValues, myStockCollectionTemp]);

  const [refresh, setRefresh] = useState(data);
  const [displayKChart, setDisplayKChart] = useState("block");
  const [displayInfo, setDisplayInfo] = useState("none");
  const [KChartBorder, setKChartBorder] = useState("0px 4px #e23965");
  const [InfoBorder, setInfoBorder] = useState("none");
  const dotNumber = new Intl.NumberFormat("en-US");

  useEffect(() => {
    const now = new Date();
    let nowHour = now.getHours();
    let nowMinute = now.getMinutes();

    // if ((nowHour <= 12 && nowHour >= 9) || (nowHour == 13 && nowMinute <= 30)) {
    //   const setIntervalDate = () => {
    //     setRefresh(() => {
    //       let newArray = refresh;
    //       for (let i = 0; i < refresh.length; i++) {
    //         newArray[i].datasets[0].data.push(stockValue[i].value[0]);
    //         stockValue[i].value.shift();
    //       }
    //       return newArray;
    //     });
    //   };
    //   setInterval(() => {
    //     setIntervalDate();
    //   }, 300000);
    //   return;
    // }
    // else {
    let newArray = refresh;
    for (let i = 0; i < newArray.length; i++) {
      newArray[i].datasets[0].data = stockValue[i].value;
    }
    // }
  }, []);

  const seeDisplayKChart = () => {
    setDisplayKChart("block");
    setDisplayInfo("none");
    setKChartBorder("0px 4px #e23965");
    setInfoBorder("none");
  };

  const seeDisplayInfo = () => {
    setDisplayKChart("none");
    setDisplayInfo("block");
    setKChartBorder("none");
    setInfoBorder("0px 4px #e23965");
  };

  const [showData, setShowData] = useState("");

  const handleMap = () => {
    let dataMap = originData.map((originData) => {
      if (
        category === originData.n &&
        Number(originData.b.split("_")[0] - originData.y) < 0
      ) {
        let stockBig = originData.g
          .split("_")
          .concat(originData.f.split("_"))
          .sort((a, b) => {
            return b - a;
          });
        let gTotal =
          Number(originData.g.split("_")[0]) +
          Number(originData.g.split("_")[1]) +
          Number(originData.g.split("_")[2]) +
          Number(originData.g.split("_")[3]) +
          Number(originData.g.split("_")[4]);
        let fTotal =
          Number(originData.f.split("_")[0]) +
          Number(originData.f.split("_")[1]) +
          Number(originData.f.split("_")[2]) +
          Number(originData.f.split("_")[3]) +
          Number(originData.f.split("_")[4]);
        return (
          <div key={originData.key}>
            <h1>
              {originData.n}
              <span>{originData.c}</span>
            </h1>
            <div className="stockInfoContainer">
              <div className="stockInfoBox">
                <h2 style={{ color: "#38e54d" }}>
                  {Number(originData.b.split("_")[0]).toFixed(2)}
                  <span>
                    {Number(originData.b.split("_")[0] - originData.y).toFixed(
                      2
                    )}
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
                </h2>
                <h3>成交量：{dotNumber.format(originData.v)}</h3>
                <h6>
                  最後更新時間：
                  {originData.d.slice(0, 4) +
                    "-" +
                    originData.d.slice(4, 6) +
                    "-" +
                    originData.d.slice(6, 8) +
                    " " +
                    originData.t}
                </h6>
              </div>
              <table>
                <tbody>
                  <tr>
                    <td>成交價</td>
                    <td>{Number(originData.b.split("_")[0]).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>開盤價</td>
                    <td>{Number(originData.o).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>漲跌</td>
                    <td>
                      {Number(
                        originData.b.split("_")[0] - originData.y
                      ).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td>最高價</td>
                    <td>{Number(originData.h).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>最低價</td>
                    <td>{Number(originData.l).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>昨收</td>
                    <td>{Number(originData.y).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td>買價</td>
                    <td>{Number(originData.b.split("_")[0]).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>賣價</td>
                    <td>{Number(originData.b.split("_")[4]).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>總量</td>
                    <td>{dotNumber.format(originData.v)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="stockTab">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <h2
                        onClick={seeDisplayKChart}
                        style={{ boxShadow: `${KChartBorder}` }}
                      >
                        即時圖
                      </h2>
                    </td>
                    <td></td>
                    <td>
                      <h2
                        onClick={seeDisplayInfo}
                        style={{ boxShadow: `${InfoBorder}` }}
                      >
                        基本資訊
                      </h2>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div
                className="tabKChart"
                style={{ display: `${displayKChart}` }}
              >
                <div
                  className="chartBox"
                  style={{ width: "780px" }}
                  height="326px"
                >
                  <Line
                    options={options[originData.key - 1]}
                    data={refresh[originData.key - 1]}
                    width="780px"
                    height="326px"
                  />
                </div>

                <table className="nowPrice">
                  <tbody>
                    <tr>
                      <td>
                        <p>量</p>
                      </td>
                      <td>
                        <p>委買價</p>
                      </td>
                      <td></td>
                      <td>
                        <p>委賣價</p>
                      </td>
                      <td>
                        <p>量</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(Number(originData.g.split("_")[0]))}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {Number(originData.b.split("_")[0]).toFixed(2)}
                        </p>
                      </td>
                      <td></td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {Number(originData.a.split("_")[0]).toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(Number(originData.f.split("_")[0]))}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(Number(originData.g.split("_")[1]))}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {Number(originData.b.split("_")[1]).toFixed(2)}
                        </p>
                      </td>
                      <td></td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {Number(originData.a.split("_")[1]).toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(Number(originData.f.split("_")[1]))}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(Number(originData.g.split("_")[2]))}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {Number(originData.b.split("_")[2]).toFixed(2)}
                        </p>
                      </td>
                      <td></td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {Number(originData.a.split("_")[2]).toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(Number(originData.f.split("_")[2]))}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(Number(originData.g.split("_")[3]))}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {Number(originData.b.split("_")[3]).toFixed(2)}
                        </p>
                      </td>
                      <td></td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {Number(originData.a.split("_")[3]).toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(Number(originData.f.split("_")[3]))}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(Number(originData.g.split("_")[4]))}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {Number(originData.b.split("_")[4]).toFixed(2)}
                        </p>
                      </td>
                      <td></td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {Number(originData.a.split("_")[4]).toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(Number(originData.f.split("_")[4]))}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(gTotal)}
                        </p>
                      </td>
                      <td>
                        <p>小計</p>
                      </td>
                      <td></td>
                      <td>
                        <p>小計</p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(fTotal)}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="bBackground"></div>
                <div
                  className="b0"
                  style={{
                    width: Math.max(
                      170 -
                        (170 / stockBig[0]) *
                          Number(originData.g.split("_")[0]),
                      0
                    ),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="b1"
                  style={{
                    width: Math.max(
                      170 -
                        (170 / stockBig[0]) *
                          Number(originData.g.split("_")[1]),
                      0
                    ),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="b2"
                  style={{
                    width: Math.max(
                      170 -
                        (170 / stockBig[0]) *
                          Number(originData.g.split("_")[2]),
                      0
                    ),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="b3"
                  style={{
                    width: Math.max(
                      170 -
                        (170 / stockBig[0]) *
                          Number(originData.g.split("_")[3]),
                      0
                    ),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="b4"
                  style={{
                    width: Math.max(
                      170 -
                        (170 / stockBig[0]) *
                          Number(originData.g.split("_")[4]),
                      0
                    ),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="a0"
                  style={{
                    width:
                      (170 / stockBig[0]) * Number(originData.f.split("_")[0]),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="a1"
                  style={{
                    width:
                      (170 / stockBig[0]) * Number(originData.f.split("_")[1]),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="a2"
                  style={{
                    width:
                      (170 / stockBig[0]) * Number(originData.f.split("_")[2]),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="a3"
                  style={{
                    width:
                      (170 / stockBig[0]) * Number(originData.f.split("_")[3]),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="a4"
                  style={{
                    width:
                      (170 / stockBig[0]) * Number(originData.f.split("_")[4]),
                    maxWidth: "170px",
                  }}
                ></div>
              </div>
              <div className="tabInfo" style={{ display: `${displayInfo}` }}>
                <table className="stockBasicInfo">
                  <tbody>
                    <tr>
                      <td>
                        <p>{originData.aTitle}</p>
                      </td>
                      <td colSpan="3">
                        <p>{originData.aInfo}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>{originData.bTitle}</p>
                      </td>
                      <td>
                        <p>{originData.bInfo}</p>
                      </td>
                      <td>
                        <p>{originData.cTitle}</p>
                      </td>
                      <td>
                        <p>{originData.cInfo}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>{originData.dTitle}</p>
                      </td>
                      <td>
                        <p>{originData.dInfo}</p>
                      </td>
                      <td>
                        <p>{originData.eTitle}</p>
                      </td>
                      <td>
                        <p>{originData.eInfo}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>{originData.fTitle}</p>
                      </td>
                      <td>
                        <p>{originData.fInfo}</p>
                      </td>
                      <td>
                        <p>{originData.gTitle}</p>
                      </td>
                      <td>
                        <p>{originData.gInfo}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>{originData.hTitle}</p>
                      </td>
                      <td colSpan="3">
                        <p>{originData.hInfo}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }
      if (
        category === originData.n &&
        Number(originData.b.split("_")[0] - originData.y) > 0
      ) {
        let stockBig = originData.g
          .split("_")
          .concat(originData.f.split("_"))
          .sort((a, b) => {
            return b - a;
          });
        let gTotal =
          Number(originData.g.split("_")[0]) +
          Number(originData.g.split("_")[1]) +
          Number(originData.g.split("_")[2]) +
          Number(originData.g.split("_")[3]) +
          Number(originData.g.split("_")[4]);
        let fTotal =
          Number(originData.f.split("_")[0]) +
          Number(originData.f.split("_")[1]) +
          Number(originData.f.split("_")[2]) +
          Number(originData.f.split("_")[3]) +
          Number(originData.f.split("_")[4]);
        return (
          <div key={originData.key}>
            <h1>
              {originData.n}
              <span>{originData.c}</span>
            </h1>
            <div className="stockInfoContainer">
              <div className="stockInfoBox">
                <h2 style={{ color: "#e23965" }}>
                  {Number(originData.b.split("_")[0]).toFixed(2)}
                  <span>
                    {"+" +
                      Number(originData.b.split("_")[0] - originData.y).toFixed(
                        2
                      )}
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
                </h2>
                <h3>成交量：{dotNumber.format(originData.v)}</h3>
                <h6>
                  最後更新時間：
                  {originData.d.slice(0, 4) +
                    "-" +
                    originData.d.slice(4, 6) +
                    "-" +
                    originData.d.slice(6, 8) +
                    " " +
                    originData.t}
                </h6>
              </div>
              <table>
                <tbody>
                  <tr>
                    <td>成交價</td>
                    <td>{Number(originData.b.split("_")[0]).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>開盤價</td>
                    <td>{Number(originData.o).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>漲跌</td>
                    <td>
                      {Number(
                        originData.b.split("_")[0] - originData.y
                      ).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td>最高價</td>
                    <td>{Number(originData.h).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>最低價</td>
                    <td>{Number(originData.l).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>昨收</td>
                    <td>{Number(originData.y).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td>買價</td>
                    <td>{Number(originData.b.split("_")[0]).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>賣價</td>
                    <td>{Number(originData.b.split("_")[4]).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>總量</td>
                    <td>{dotNumber.format(originData.v)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="stockTab">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <h2
                        onClick={seeDisplayKChart}
                        style={{ boxShadow: `${KChartBorder}` }}
                      >
                        即時圖
                      </h2>
                    </td>
                    <td></td>
                    <td>
                      <h2
                        onClick={seeDisplayInfo}
                        style={{ boxShadow: `${InfoBorder}` }}
                      >
                        基本資訊
                      </h2>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div
                className="tabKChart"
                style={{ display: `${displayKChart}` }}
              >
                <div
                  className="chartBox"
                  style={{ width: "780px" }}
                  height="326px"
                >
                  <Line
                    options={options[originData.key - 1]}
                    data={refresh[originData.key - 1]}
                    width="780px"
                    height="326px"
                  />
                </div>

                <table className="nowPrice">
                  <tbody>
                    <tr>
                      <td>
                        <p>量</p>
                      </td>
                      <td>
                        <p>委買價</p>
                      </td>
                      <td></td>
                      <td>
                        <p>委賣價</p>
                      </td>
                      <td>
                        <p>量</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(Number(originData.g.split("_")[0]))}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {Number(originData.b.split("_")[0]).toFixed(2)}
                        </p>
                      </td>
                      <td></td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {Number(originData.a.split("_")[0]).toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(Number(originData.f.split("_")[0]))}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(Number(originData.g.split("_")[1]))}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {Number(originData.b.split("_")[1]).toFixed(2)}
                        </p>
                      </td>
                      <td></td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {Number(originData.a.split("_")[1]).toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(Number(originData.f.split("_")[1]))}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(Number(originData.g.split("_")[2]))}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {Number(originData.b.split("_")[2]).toFixed(2)}
                        </p>
                      </td>
                      <td></td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {Number(originData.a.split("_")[2]).toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(Number(originData.f.split("_")[2]))}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(Number(originData.g.split("_")[3]))}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {Number(originData.b.split("_")[3]).toFixed(2)}
                        </p>
                      </td>
                      <td></td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {Number(originData.a.split("_")[3]).toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(Number(originData.f.split("_")[3]))}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(Number(originData.g.split("_")[4]))}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {Number(originData.b.split("_")[4]).toFixed(2)}
                        </p>
                      </td>
                      <td></td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {Number(originData.a.split("_")[4]).toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(Number(originData.f.split("_")[4]))}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(gTotal)}
                        </p>
                      </td>
                      <td>
                        <p>小計</p>
                      </td>
                      <td></td>
                      <td>
                        <p>小計</p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(fTotal)}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="bBackground"></div>
                <div
                  className="b0"
                  style={{
                    width: Math.max(
                      170 -
                        (170 / stockBig[0]) *
                          Number(originData.g.split("_")[0]),
                      0
                    ),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="b1"
                  style={{
                    width: Math.max(
                      170 -
                        (170 / stockBig[0]) *
                          Number(originData.g.split("_")[1]),
                      0
                    ),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="b2"
                  style={{
                    width: Math.max(
                      170 -
                        (170 / stockBig[0]) *
                          Number(originData.g.split("_")[2]),
                      0
                    ),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="b3"
                  style={{
                    width: Math.max(
                      170 -
                        (170 / stockBig[0]) *
                          Number(originData.g.split("_")[3]),
                      0
                    ),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="b4"
                  style={{
                    width: Math.max(
                      170 -
                        (170 / stockBig[0]) *
                          Number(originData.g.split("_")[4]),
                      0
                    ),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="a0"
                  style={{
                    width:
                      (170 / stockBig[0]) * Number(originData.f.split("_")[0]),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="a1"
                  style={{
                    width:
                      (170 / stockBig[0]) * Number(originData.f.split("_")[1]),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="a2"
                  style={{
                    width:
                      (170 / stockBig[0]) * Number(originData.f.split("_")[2]),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="a3"
                  style={{
                    width:
                      (170 / stockBig[0]) * Number(originData.f.split("_")[3]),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="a4"
                  style={{
                    width:
                      (170 / stockBig[0]) * Number(originData.f.split("_")[4]),
                    maxWidth: "170px",
                  }}
                ></div>
              </div>
              <div className="tabInfo" style={{ display: `${displayInfo}` }}>
                <table className="stockBasicInfo">
                  <tbody>
                    <tr>
                      <td>
                        <p>{originData.aTitle}</p>
                      </td>
                      <td colSpan="3">
                        <p>{originData.aInfo}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>{originData.bTitle}</p>
                      </td>
                      <td>
                        <p>{originData.bInfo}</p>
                      </td>
                      <td>
                        <p>{originData.cTitle}</p>
                      </td>
                      <td>
                        <p>{originData.cInfo}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>{originData.dTitle}</p>
                      </td>
                      <td>
                        <p>{originData.dInfo}</p>
                      </td>
                      <td>
                        <p>{originData.eTitle}</p>
                      </td>
                      <td>
                        <p>{originData.eInfo}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>{originData.fTitle}</p>
                      </td>
                      <td>
                        <p>{originData.fInfo}</p>
                      </td>
                      <td>
                        <p>{originData.gTitle}</p>
                      </td>
                      <td>
                        <p>{originData.gInfo}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>{originData.hTitle}</p>
                      </td>
                      <td colSpan="3">
                        <p>{originData.hInfo}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }
      if (
        category === originData.n &&
        Number(originData.b.split("_")[0] - originData.y) == 0
      ) {
        let stockBig = originData.g
          .split("_")
          .concat(originData.f.split("_"))
          .sort((a, b) => {
            return b - a;
          });
        let gTotal =
          Number(originData.g.split("_")[0]) +
          Number(originData.g.split("_")[1]) +
          Number(originData.g.split("_")[2]) +
          Number(originData.g.split("_")[3]) +
          Number(originData.g.split("_")[4]);
        let fTotal =
          Number(originData.f.split("_")[0]) +
          Number(originData.f.split("_")[1]) +
          Number(originData.f.split("_")[2]) +
          Number(originData.f.split("_")[3]) +
          Number(originData.f.split("_")[4]);
        return (
          <div key={originData.key}>
            <h1>
              {originData.n}
              <span>{originData.c}</span>
            </h1>
            <div className="stockInfoContainer">
              <div className="stockInfoBox">
                <h2 style={{ color: "#ffffff" }}>
                  {Number(originData.b.split("_")[0]).toFixed(2)}
                  <span>
                    {Number(originData.b.split("_")[0] - originData.y).toFixed(
                      2
                    )}
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
                </h2>
                <h3>成交量：{dotNumber.format(originData.v)}</h3>
                <h6>
                  最後更新時間：
                  {originData.d.slice(0, 4) +
                    "-" +
                    originData.d.slice(4, 6) +
                    "-" +
                    originData.d.slice(6, 8) +
                    " " +
                    originData.t}
                </h6>
              </div>
              <table>
                <tbody>
                  <tr>
                    <td>成交價</td>
                    <td>{Number(originData.b.split("_")[0]).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>開盤價</td>
                    <td>{Number(originData.o).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>漲跌</td>
                    <td>
                      {Number(
                        originData.b.split("_")[0] - originData.y
                      ).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td>最高價</td>
                    <td>{Number(originData.h).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>最低價</td>
                    <td>{Number(originData.l).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>昨收</td>
                    <td>{Number(originData.y).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td>買價</td>
                    <td>{Number(originData.b.split("_")[0]).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>賣價</td>
                    <td>{Number(originData.b.split("_")[4]).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>總量</td>
                    <td>{dotNumber.format(originData.v)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="stockTab">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <h2
                        onClick={seeDisplayKChart}
                        style={{ boxShadow: `${KChartBorder}` }}
                      >
                        即時圖
                      </h2>
                    </td>
                    <td></td>
                    <td>
                      <h2
                        onClick={seeDisplayInfo}
                        style={{ boxShadow: `${InfoBorder}` }}
                      >
                        基本資訊
                      </h2>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div
                className="tabKChart"
                style={{ display: `${displayKChart}` }}
              >
                <div
                  className="chartBox"
                  style={{ width: "780px" }}
                  height="326px"
                >
                  <Line
                    options={options[originData.key - 1]}
                    data={refresh[originData.key - 1]}
                    width="780px"
                    height="326px"
                  />
                </div>

                <table className="nowPrice">
                  <tbody>
                    <tr>
                      <td>
                        <p>量</p>
                      </td>
                      <td>
                        <p>委買價</p>
                      </td>
                      <td></td>
                      <td>
                        <p>委賣價</p>
                      </td>
                      <td>
                        <p>量</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(Number(originData.g.split("_")[0]))}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {Number(originData.b.split("_")[0]).toFixed(2)}
                        </p>
                      </td>
                      <td></td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {Number(originData.a.split("_")[0]).toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(Number(originData.f.split("_")[0]))}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(Number(originData.g.split("_")[1]))}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {Number(originData.b.split("_")[1]).toFixed(2)}
                        </p>
                      </td>
                      <td></td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {Number(originData.a.split("_")[1]).toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(Number(originData.f.split("_")[1]))}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(Number(originData.g.split("_")[2]))}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {Number(originData.b.split("_")[2]).toFixed(2)}
                        </p>
                      </td>
                      <td></td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {Number(originData.a.split("_")[2]).toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(Number(originData.f.split("_")[2]))}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(Number(originData.g.split("_")[3]))}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {Number(originData.b.split("_")[3]).toFixed(2)}
                        </p>
                      </td>
                      <td></td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {Number(originData.a.split("_")[3]).toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(Number(originData.f.split("_")[3]))}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(Number(originData.g.split("_")[4]))}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {Number(originData.b.split("_")[4]).toFixed(2)}
                        </p>
                      </td>
                      <td></td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {Number(originData.a.split("_")[4]).toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(Number(originData.f.split("_")[4]))}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ color: "#38e54d" }}>
                          {dotNumber.format(gTotal)}
                        </p>
                      </td>
                      <td>
                        <p>小計</p>
                      </td>
                      <td></td>
                      <td>
                        <p>小計</p>
                      </td>
                      <td>
                        <p style={{ color: "#e23965" }}>
                          {dotNumber.format(fTotal)}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="bBackground"></div>
                <div
                  className="b0"
                  style={{
                    width: Math.max(
                      170 -
                        (170 / stockBig[0]) *
                          Number(originData.g.split("_")[0]),
                      0
                    ),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="b1"
                  style={{
                    width: Math.max(
                      170 -
                        (170 / stockBig[0]) *
                          Number(originData.g.split("_")[1]),
                      0
                    ),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="b2"
                  style={{
                    width: Math.max(
                      170 -
                        (170 / stockBig[0]) *
                          Number(originData.g.split("_")[2]),
                      0
                    ),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="b3"
                  style={{
                    width: Math.max(
                      170 -
                        (170 / stockBig[0]) *
                          Number(originData.g.split("_")[3]),
                      0
                    ),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="b4"
                  style={{
                    width: Math.max(
                      170 -
                        (170 / stockBig[0]) *
                          Number(originData.g.split("_")[4]),
                      0
                    ),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="a0"
                  style={{
                    width:
                      (170 / stockBig[0]) * Number(originData.f.split("_")[0]),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="a1"
                  style={{
                    width:
                      (170 / stockBig[0]) * Number(originData.f.split("_")[1]),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="a2"
                  style={{
                    width:
                      (170 / stockBig[0]) * Number(originData.f.split("_")[2]),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="a3"
                  style={{
                    width:
                      (170 / stockBig[0]) * Number(originData.f.split("_")[3]),
                    maxWidth: "170px",
                  }}
                ></div>
                <div
                  className="a4"
                  style={{
                    width:
                      (170 / stockBig[0]) * Number(originData.f.split("_")[4]),
                    maxWidth: "170px",
                  }}
                ></div>
              </div>
              <div className="tabInfo" style={{ display: `${displayInfo}` }}>
                <table className="stockBasicInfo">
                  <tbody>
                    <tr>
                      <td>
                        <p>{originData.aTitle}</p>
                      </td>
                      <td colSpan="3">
                        <p>{originData.aInfo}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>{originData.bTitle}</p>
                      </td>
                      <td>
                        <p>{originData.bInfo}</p>
                      </td>
                      <td>
                        <p>{originData.cTitle}</p>
                      </td>
                      <td>
                        <p>{originData.cInfo}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>{originData.dTitle}</p>
                      </td>
                      <td>
                        <p>{originData.dInfo}</p>
                      </td>
                      <td>
                        <p>{originData.eTitle}</p>
                      </td>
                      <td>
                        <p>{originData.eInfo}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>{originData.fTitle}</p>
                      </td>
                      <td>
                        <p>{originData.fInfo}</p>
                      </td>
                      <td>
                        <p>{originData.gTitle}</p>
                      </td>
                      <td>
                        <p>{originData.gInfo}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>{originData.hTitle}</p>
                      </td>
                      <td colSpan="3">
                        <p>{originData.hInfo}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }
    });
    setShowData(dataMap);
    setInterval(() => {
      setShowData(dataMap);
    }, 300000);
  };

  useEffect(() => {
    handleMap();
  }, [originData, category, displayKChart, displayInfo, refresh]);

  return <div className="mainStock">{showData}</div>;
};

export default MainStock;
