import React from "react";
import { useState, useEffect, useMemo } from "react";

const OrderHistory = () => {
  let orderHistoryData = [
    {
      key: 1,
      mineHistoryStockKey: "00632R",
      mineHistoryStock: "元大台灣50反1",
      finishDate: "2023-01-03 06:37:51",
      value: 30,
      historyUpDown: "- $ 723.1",
    },
  ];

  const dataMap = () =>
    originData.map((v) => {
      if (v.finishDate === "委託已取消") {
        return (
          <tbody key={v.key}>
            <tr>
              <td>
                <p style={{ color: "#e23965" }}>{v.finishDate}</p>
              </td>
              <td>
                <p>{v.mineHistoryStock} </p>
                <br />
                <span>{v.mineHistoryStockKey}</span>
              </td>
              <td>
                <p>{v.value + " 股"}</p>
              </td>
              <td>
                <p>{v.historyUpDown}</p>
              </td>
            </tr>
          </tbody>
        );
      }
      if (
        v.historyUpDown[0] === "+" &&
        Number(v.historyUpDown.split(" ")[2]) === "0"
      ) {
        return (
          <tbody key={v.key}>
            <tr>
              <td>
                <p style={{ color: "#ffffff" }}>{v.finishDate.split(" ")[0]}</p>
                <br />
                <p style={{ color: "#ffffff" }}>{v.finishDate.split(" ")[1]}</p>
              </td>
              <td>
                <p>{v.mineHistoryStock} </p>
                <br />
                <span>{v.mineHistoryStockKey}</span>
              </td>
              <td>
                <p>{v.value + " 股"}</p>
              </td>
              <td>
                <p style={{ color: "#ffffff" }}>{v.historyUpDown}</p>
              </td>
            </tr>
          </tbody>
        );
      }
      if (v.historyUpDown[0] === "+") {
        return (
          <tbody key={v.key}>
            <tr>
              <td>
                <p style={{ color: "#ffffff" }}>{v.finishDate.split(" ")[0]}</p>
                <br />
                <p style={{ color: "#ffffff" }}>{v.finishDate.split(" ")[1]}</p>
              </td>
              <td>
                <p>{v.mineHistoryStock} </p>
                <br />
                <span>{v.mineHistoryStockKey}</span>
              </td>
              <td>
                <p>{v.value + " 股"}</p>
              </td>
              <td>
                <p style={{ color: "#e23965" }}>{v.historyUpDown}</p>
              </td>
            </tr>
          </tbody>
        );
      }
      if (v.historyUpDown[0] === "-") {
        return (
          <tbody key={v.key}>
            <tr>
              <td>
                <p style={{ color: "#ffffff" }}>{v.finishDate.split(" ")[0]}</p>
                <br />
                <p style={{ color: "#ffffff" }}>{v.finishDate.split(" ")[1]}</p>
              </td>
              <td>
                <p>{v.mineHistoryStock} </p>
                <br />
                <span>{v.mineHistoryStockKey}</span>
              </td>
              <td>
                <p>{v.value + " 股"}</p>
              </td>
              <td>
                <p style={{ color: "#38e54d" }}>{v.historyUpDown}</p>
              </td>
            </tr>
          </tbody>
        );
      }
    });

  const [originData, setOriginData] = useState(orderHistoryData);
  const [showData, setShowData] = useState(dataMap());
  const [searchValue, setSearchValue] = useState("");
  const [dateValue, setDateValue] = useState("");

  useEffect(() => {
    doSearchAndCheckDate();
  }, [searchValue, dateValue]);

  const doSearchAndCheckDate = () => {
    if (searchValue == "") {
      if (dateValue == "cancel") {
        const filterData = orderHistoryData.filter((orderHistoryData) =>
          orderHistoryData.finishDate.includes("取消")
        );
        setOriginData(filterData);
      }
      if (dateValue == "30") {
        const filterData = orderHistoryData.filter(
          (orderHistoryData) => orderHistoryData.key == 7
        );
        setOriginData(filterData);
      }
      if (dateValue == "60") {
        const filterData = orderHistoryData.filter(
          (orderHistoryData) => orderHistoryData.key == 1
        );
        setOriginData(filterData);
      }
      if (dateValue == "90") {
        const filterData = orderHistoryData.filter(
          (orderHistoryData) =>
            orderHistoryData.key == 1 ||
            orderHistoryData.key == 3 ||
            orderHistoryData.key == 4
        );
        setOriginData(filterData);
      }
      if (dateValue == "") {
        setOriginData(orderHistoryData);
      }
    }
    if (searchValue !== "") {
      if (dateValue == "cancel") {
        const filterData = orderHistoryData.filter(
          (orderHistoryData) =>
            orderHistoryData.finishDate.includes("取消") &&
            (orderHistoryData.mineHistoryStockKey.includes(searchValue) ||
              orderHistoryData.mineHistoryStock.includes(searchValue))
        );
        setOriginData(filterData);
      }
      if (dateValue == "30") {
        const filterData = orderHistoryData.filter(
          (orderHistoryData) =>
            orderHistoryData.key == 7 &&
            (orderHistoryData.mineHistoryStockKey.includes(searchValue) ||
              orderHistoryData.mineHistoryStock.includes(searchValue))
        );
        setOriginData(filterData);
      }
      if (dateValue == "60") {
        const filterData = orderHistoryData.filter(
          (orderHistoryData) =>
            orderHistoryData.key == 1 &&
            (orderHistoryData.mineHistoryStockKey.includes(searchValue) ||
              orderHistoryData.mineHistoryStock.includes(searchValue))
        );
        setOriginData(filterData);
      }
      if (dateValue == "90") {
        const filterData = orderHistoryData.filter(
          (orderHistoryData) =>
            (orderHistoryData.key == 1 ||
              orderHistoryData.key == 3 ||
              orderHistoryData.key == 4) &&
            (orderHistoryData.mineHistoryStockKey.includes(searchValue) ||
              orderHistoryData.mineHistoryStock.includes(searchValue))
        );
        setOriginData(filterData);
      }
      if (dateValue == "") {
        const filterData = orderHistoryData.filter(
          (orderHistoryData) =>
            orderHistoryData.mineHistoryStockKey.includes(searchValue) ||
            orderHistoryData.mineHistoryStock.includes(searchValue)
        );
        setOriginData(filterData);
      }
    }
  };

  useEffect(() => {
    setShowData(dataMap());
  }, [originData]);

  return (
    <div className="orderHistory">
      <div className="titleBox">
        <h3>歷史委託記錄</h3>
      </div>
      <div className="orderHistoryBox">
        <label htmlFor="orderTime">
          <p className="pr12">查詢區間</p>
          <select
            name="orderTime"
            id="orderTime"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
          >
            <option value="">請選擇查詢區間</option>
            <option value="30">30天內成交</option>
            <option value="60">60天內成交</option>
            <option value="90">90天內成交</option>
            <option value="cancel">已取消委託</option>
          </select>
        </label>
        <label htmlFor="stockName">
          <p className="pr12">股票名稱</p>
          <input
            type="text"
            name="stockName"
            id="stockName"
            autoComplete="off"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </label>
      </div>
      <table className="orderHistoryTitle">
        <thead>
          <tr>
            <th>
              <p>完成時間</p>
            </th>
            <th>
              <p>股票別</p>
            </th>
            <th>
              <p>單位</p>
            </th>
            <th>
              <p>損益</p>
            </th>
          </tr>
        </thead>
      </table>
      <div className="orderHistoryListBox">
        <table className="orderHistoryList">{showData}</table>
      </div>
    </div>
  );
};

export default OrderHistory;
