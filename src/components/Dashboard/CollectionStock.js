import React, { useContext, useState, useEffect, useMemo } from "react";
import { resultsContext } from "./DashboardMain";
import { myStockCollectionContext } from "./DashboardMain";
import { myStockCollectionTempContext } from "./DashboardMain";
import { myStockCollectionTestContext } from "./DashboardMain";
import { addOrRemoveCollectionContext } from "./DashboardMain";
import { categoryContext } from "./DashboardMain";

let filterStatus = false;
const CollectionStock = () => {
  const resultsValues = useContext(resultsContext);
  const addOrRemoveCollection = useContext(addOrRemoveCollectionContext);
  let myStockCollection = useContext(myStockCollectionContext);
  const { category, setCategory } = useContext(categoryContext);
  const { myStockCollectionTemp, setMyStockCollectionTemp } = useContext(
    myStockCollectionTempContext
  );

  // 結合 API results 與 collection
  const [originData, setOriginData] = useState(myStockCollection);
  const [temp, setTemp] = useState(myStockCollection);

  const mapValue = () => {
    if (resultsValues !== []) {
      const mapTwoValue = myStockCollectionTemp.map((e) => {
        const temp = resultsValues.find((ele) => e.stockKey === ele.c);
        if (temp !== undefined) {
          e.stockInfo = Number(temp.b.split("_")[0]).toFixed(2);
          e.yesterdayValue = Number(temp.y).toFixed(2);
        }
        return e;
      });
      setOriginData(mapTwoValue);
      setTemp(mapTwoValue);

      return;
    }
  };

  useMemo(() => mapValue(), [resultsValues]);

  const [searchValue, setSearchValue] = useState("");

  const doSearch = () => {
    if (searchValue == "" && filterStatus == false) {
      setOriginData(temp);
    }
    if (searchValue == "" && filterStatus == true) {
      const filterData = temp.filter((temp) => temp.collection == true);
      setOriginData(filterData);
      return;
    }
    if (searchValue !== "" && filterStatus == false) {
      const filterData = temp.filter(
        (temp) =>
          temp.stockKey.includes(searchValue) ||
          temp.stockName.includes(searchValue)
      );
      setOriginData(filterData);
    }
    if (searchValue !== "" && filterStatus == true) {
      const filterData = temp.filter(
        (temp) =>
          (temp.stockKey.includes(searchValue) ||
            temp.stockName.includes(searchValue)) &&
          temp.collection == true
      );
      setOriginData(filterData);
    }
  };

  useEffect(() => {
    doSearch();
  }, [searchValue, temp]);

  const [showData, setShowData] = useState("");

  const handleMap = () => {
    const dataMap = () =>
      originData.map((originData) => {
        if (
          Number(originData.stockInfo) > Number(originData.yesterdayValue) &&
          myStockCollectionTemp[originData.key - 1].collection
        ) {
          return (
            <tbody key={originData.key}>
              <tr
                onClick={() => {
                  setCategory(originData.stockName);
                }}
              >
                <td>
                  <svg
                    className="collection"
                    width="20"
                    height="26"
                    viewBox="0 0 20 26"
                    fill="#E23965"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="collectionBackground"
                      d="M2.85714 0H17.1429C18.7143 0 20 1.3 20 2.88889V26L10 21.6667L0 26L0.014286 2.88889C0.014286 1.3 1.28571 0 2.85714 0Z"
                      onClick={(e) => {
                        addOrRemoveCollection(e, originData.key);
                        mapValue();
                      }}
                    />
                    <path
                      className="collectionBorder"
                      d="M17.1429 0H2.85714C1.28571 0 0.014286 1.3 0.014286 2.88889L0 26L10 21.6667L20 26V2.88889C20 1.3 18.7143 0 17.1429 0ZM17.1429 21.6667L10 18.5178L2.85714 21.6667V2.88889H17.1429V21.6667Z"
                      fill="#E23965"
                    />
                  </svg>
                </td>
                <td>
                  <p>{originData.stockName} </p>
                  <h6>{originData.stockKey}</h6>
                </td>
                <td>
                  <p style={{ color: "#e23965" }}>{originData.stockInfo}</p>
                </td>
              </tr>
            </tbody>
          );
        }
        if (
          Number(originData.stockInfo) > Number(originData.yesterdayValue) &&
          !myStockCollectionTemp[originData.key - 1].collection
        ) {
          return (
            <tbody key={originData.key}>
              <tr
                onClick={() => {
                  setCategory(originData.stockName);
                }}
              >
                <td>
                  <svg
                    className="collection"
                    width="20"
                    height="26"
                    viewBox="0 0 20 26"
                    fill="#2f3137"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="collectionBackground"
                      d="M2.85714 0H17.1429C18.7143 0 20 1.3 20 2.88889V26L10 21.6667L0 26L0.014286 2.88889C0.014286 1.3 1.28571 0 2.85714 0Z"
                      onClick={(e) => {
                        addOrRemoveCollection(e, originData.key);
                        mapValue();
                      }}
                    />
                    <path
                      className="collectionBorder"
                      d="M17.1429 0H2.85714C1.28571 0 0.014286 1.3 0.014286 2.88889L0 26L10 21.6667L20 26V2.88889C20 1.3 18.7143 0 17.1429 0ZM17.1429 21.6667L10 18.5178L2.85714 21.6667V2.88889H17.1429V21.6667Z"
                      fill="#E23965"
                    />
                  </svg>
                </td>
                <td>
                  <p>{originData.stockName} </p>
                  <h6>{originData.stockKey}</h6>
                </td>
                <td>
                  <p style={{ color: "#e23965" }}>{originData.stockInfo}</p>
                </td>
              </tr>
            </tbody>
          );
        }
        if (
          Number(originData.stockInfo) < Number(originData.yesterdayValue) &&
          myStockCollectionTemp[originData.key - 1].collection
        ) {
          return (
            <tbody key={originData.key}>
              <tr
                onClick={() => {
                  setCategory(originData.stockName);
                }}
              >
                <td>
                  <svg
                    className="collection"
                    width="20"
                    height="26"
                    viewBox="0 0 20 26"
                    fill="#E23965"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="collectionBackground"
                      d="M2.85714 0H17.1429C18.7143 0 20 1.3 20 2.88889V26L10 21.6667L0 26L0.014286 2.88889C0.014286 1.3 1.28571 0 2.85714 0Z"
                      onClick={(e) => {
                        addOrRemoveCollection(e, originData.key);
                        mapValue();
                      }}
                    />
                    <path
                      className="collectionBorder"
                      d="M17.1429 0H2.85714C1.28571 0 0.014286 1.3 0.014286 2.88889L0 26L10 21.6667L20 26V2.88889C20 1.3 18.7143 0 17.1429 0ZM17.1429 21.6667L10 18.5178L2.85714 21.6667V2.88889H17.1429V21.6667Z"
                      fill="#E23965"
                    />
                  </svg>
                </td>
                <td>
                  <p>{originData.stockName} </p>
                  <h6>{originData.stockKey}</h6>
                </td>
                <td>
                  <p style={{ color: "#38e54d" }}>{originData.stockInfo}</p>
                </td>
              </tr>
            </tbody>
          );
        }
        if (
          Number(originData.stockInfo) < Number(originData.yesterdayValue) &&
          !myStockCollectionTemp[originData.key - 1].collection
        ) {
          return (
            <tbody key={originData.key}>
              <tr
                onClick={() => {
                  setCategory(originData.stockName);
                }}
              >
                <td>
                  <svg
                    className="collection"
                    width="20"
                    height="26"
                    viewBox="0 0 20 26"
                    fill="2f3137"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="collectionBackground"
                      d="M2.85714 0H17.1429C18.7143 0 20 1.3 20 2.88889V26L10 21.6667L0 26L0.014286 2.88889C0.014286 1.3 1.28571 0 2.85714 0Z"
                      onClick={(e) => {
                        addOrRemoveCollection(e, originData.key);
                        mapValue();
                      }}
                    />
                    <path
                      className="collectionBorder"
                      d="M17.1429 0H2.85714C1.28571 0 0.014286 1.3 0.014286 2.88889L0 26L10 21.6667L20 26V2.88889C20 1.3 18.7143 0 17.1429 0ZM17.1429 21.6667L10 18.5178L2.85714 21.6667V2.88889H17.1429V21.6667Z"
                      fill="#E23965"
                    />
                  </svg>
                </td>
                <td>
                  <p>{originData.stockName} </p>
                  <h6>{originData.stockKey}</h6>
                </td>
                <td>
                  <p style={{ color: "#38e54d" }}>{originData.stockInfo}</p>
                </td>
              </tr>
            </tbody>
          );
        }
        if (
          Number(originData.stockInfo) === Number(originData.yesterdayValue) &&
          myStockCollectionTemp[originData.key - 1].collection
        ) {
          return (
            <tbody key={originData.key}>
              <tr
                onClick={() => {
                  setCategory(originData.stockName);
                }}
              >
                <td>
                  <svg
                    className="collection"
                    width="20"
                    height="26"
                    viewBox="0 0 20 26"
                    fill="#E23965"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="collectionBackground"
                      d="M2.85714 0H17.1429C18.7143 0 20 1.3 20 2.88889V26L10 21.6667L0 26L0.014286 2.88889C0.014286 1.3 1.28571 0 2.85714 0Z"
                      onClick={(e) => {
                        addOrRemoveCollection(e, originData.key);
                        mapValue();
                      }}
                    />
                    <path
                      className="collectionBorder"
                      d="M17.1429 0H2.85714C1.28571 0 0.014286 1.3 0.014286 2.88889L0 26L10 21.6667L20 26V2.88889C20 1.3 18.7143 0 17.1429 0ZM17.1429 21.6667L10 18.5178L2.85714 21.6667V2.88889H17.1429V21.6667Z"
                      fill="#E23965"
                    />
                  </svg>
                </td>
                <td>
                  <p>{originData.stockName} </p>
                  <h6>{originData.stockKey}</h6>
                </td>
                <td>
                  <p style={{ color: "#ffffff" }}>{originData.stockInfo}</p>
                </td>
              </tr>
            </tbody>
          );
        }
        if (
          Number(originData.stockInfo) === Number(originData.yesterdayValue) &&
          !myStockCollectionTemp[originData.key - 1].collection
        ) {
          return (
            <tbody key={originData.key}>
              <tr
                onClick={() => {
                  setCategory(originData.stockName);
                }}
              >
                <td>
                  <svg
                    className="collection"
                    width="20"
                    height="26"
                    viewBox="0 0 20 26"
                    fill="2f3137"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="collectionBackground"
                      d="M2.85714 0H17.1429C18.7143 0 20 1.3 20 2.88889V26L10 21.6667L0 26L0.014286 2.88889C0.014286 1.3 1.28571 0 2.85714 0Z"
                      onClick={(e) => {
                        addOrRemoveCollection(e, originData.key);
                        mapValue();
                      }}
                    />
                    <path
                      className="collectionBorder"
                      d="M17.1429 0H2.85714C1.28571 0 0.014286 1.3 0.014286 2.88889L0 26L10 21.6667L20 26V2.88889C20 1.3 18.7143 0 17.1429 0ZM17.1429 21.6667L10 18.5178L2.85714 21.6667V2.88889H17.1429V21.6667Z"
                      fill="#E23965"
                    />
                  </svg>
                </td>
                <td>
                  <p>{originData.stockName} </p>
                  <h6>{originData.stockKey}</h6>
                </td>
                <td>
                  <p style={{ color: "#ffffff" }}>{originData.stockInfo}</p>
                </td>
              </tr>
            </tbody>
          );
        }
      });
    setShowData(dataMap);
  };

  useMemo(() => {
    handleMap();
  }, [originData, myStockCollectionTemp]);

  const [collectionFill, setCollectionFill] = useState("");

  const filterCollection = (e) => {
    if (filterStatus == false) {
      setCollectionFill("selected");
      const filterData = originData.filter(
        (originData) => originData.collection == true
      );
      setOriginData(filterData);
      filterStatus = true;
      return;
    }
    if (filterStatus == true && searchValue == "") {
      setCollectionFill("");
      setOriginData(temp);
      filterStatus = false;
      return;
    }
    if (filterStatus == true) {
      setCollectionFill("");
      const filterData = temp.filter(
        (temp) =>
          temp.stockKey.includes(searchValue) ||
          temp.stockName.includes(searchValue)
      );
      setOriginData(filterData);
      filterStatus = false;
      return;
    }
  };

  return (
    <div className="collectionStock">
      <div className="collectionStockTitle">
        <svg
          className="collection"
          width="20"
          height="26"
          viewBox="0 0 20 26"
          xmlns="http://www.w3.org/2000/svg"
          onClick={filterCollection}
          id={collectionFill}
        >
          <path
            className="collectionBackground"
            d="M2.85714 0H17.1429C18.7143 0 20 1.3 20 2.88889V26L10 21.6667L0 26L0.014286 2.88889C0.014286 1.3 1.28571 0 2.85714 0Z"
            id={collectionFill}
          />
          <path
            fill="#E23965"
            className="collectionBorder"
            d="M17.1429 0H2.85714C1.28571 0 0.014286 1.3 0.014286 2.88889L0 26L10 21.6667L20 26V2.88889C20 1.3 18.7143 0 17.1429 0ZM17.1429 21.6667L10 18.5178L2.85714 21.6667V2.88889H17.1429V21.6667Z"
          />
        </svg>
        <input
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
      </div>
      <div className="collectionStockListBox">
        <table>{showData}</table>
      </div>
    </div>
  );
};

export default CollectionStock;
