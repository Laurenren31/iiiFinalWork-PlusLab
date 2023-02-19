import React, { useContext, useState, useEffect } from "react";
import CollectionStock from "./CollectionStock";
import MainStock from "./MainStock";

export const resultsContext = React.createContext();
export let myStockCollectionContext = React.createContext();
export const myStockCollectionTempContext = React.createContext();
export const myStockCollectionTestContext = React.createContext();
export const categoryContext = React.createContext();
export const addOrRemoveCollectionContext = React.createContext();

const DashboardMain = () => {
  let myStockCollection = [
    {
      key: "1",
      stockKey: "00632R",
      stockName: "元大台灣50反1",
      collection: true,
    },
  ];

  const [myStockCollectionTemp, setMyStockCollectionTemp] =
    useState(myStockCollection);
  const changeMyStockCollectionTemp = (b) => {
    setMyStockCollectionTemp(b);
  };

  const [myStockCollectionTest, setMyStockCollectionTest] =
    useState(myStockCollection);
  const changeMyStockCollectionTest = (c) => {
    setMyStockCollectionTest(c);
  };

  const [category, setCategory] = useState("元大台灣50反1");
  const changeCategory = (a) => {
    setCategory(a);
  };

  // API串接
  const [results, setResults] = useState(myStockCollection);
  useEffect(() => {
    search(api);
  }, []);
  const api =
    "https://cors-anywhere.herokuapp.com/https://mis.twse.com.tw/stock/api/getStockInfo.jsp?json=1&delay=0&ex_ch=tse_00632R.tw|tse_2609.tw|tse_1752.tw|tse_1760.tw|tse_00637L.tw|tse_2615.tw|tse_6443.tw|tse_1605.tw|tse_2618.tw|tse_2610.tw|tse_00885.tw|tse_1417.tw|tse_2014.tw|tse_2603.tw|tse_2303.tw|tse_3481.tw|tse_2201.tw|tse_00878.tw|tse_2002.tw|tse_2409.tw|";
  const search = async (url) => {
    const dataFetch = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
    });
    let parsedData = await dataFetch.json();
    setResults(parsedData.msgArray);
  };

  const addOrRemoveCollection = (e, n) => {
    e.stopPropagation();
    for (let m = 0; m < myStockCollection.length; m++) {
      if (
        n == myStockCollection[m].key &&
        myStockCollectionTest[m].collection == true
      ) {
        let test2 = myStockCollectionTest;
        test2[m].collection = false;
        setMyStockCollectionTest(test2);
        myStockCollection = test2;
        setMyStockCollectionTemp(myStockCollection);
        return;
      }
      if (
        n == myStockCollection[m].key &&
        myStockCollectionTest[m].collection == false
      ) {
        let test2 = myStockCollectionTest;
        test2[m].collection = true;
        setMyStockCollectionTest(test2);
        myStockCollection = test2;
        setMyStockCollectionTemp(myStockCollection);
        return;
      }
    }
  };

  return (
    <div className="dashboardMain">
      <div className="mainBox">
        <categoryContext.Provider
          value={{ category, setCategory: changeCategory }}
        >
          <myStockCollectionContext.Provider value={myStockCollection}>
            <addOrRemoveCollectionContext.Provider
              value={addOrRemoveCollection}
            >
              <myStockCollectionTempContext.Provider
                value={{
                  myStockCollectionTemp,
                  setMyStockCollectionTemp: changeMyStockCollectionTemp,
                }}
              >
                <myStockCollectionTestContext.Provider
                  value={{
                    myStockCollectionTest,
                    setMyStockCollectionTest: changeMyStockCollectionTest,
                  }}
                >
                  <resultsContext.Provider value={results}>
                    <CollectionStock />
                    <MainStock />
                  </resultsContext.Provider>
                </myStockCollectionTestContext.Provider>
              </myStockCollectionTempContext.Provider>
            </addOrRemoveCollectionContext.Provider>
          </myStockCollectionContext.Provider>
        </categoryContext.Provider>
      </div>
    </div>
  );
};

export default DashboardMain;
