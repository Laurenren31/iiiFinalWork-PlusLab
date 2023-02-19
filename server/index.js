const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const stockApi = require("./models/stockJSON-model");
const request = require("request");
const StockApi = require("./models/stockJSON-model");
const cors = require("cors");
dotenv.config();

// connect to mongo
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to Mongo Altas");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(8080, () => {
  console.log("Server running on port 8080.");
});

app.use(cors());

const getStockApi = () => {
  request(
    {
      url: "https://mis.twse.com.tw/stock/api/getStockInfo.jsp?json=1&delay=0&ex_ch=tse_00632R.tw|tse_2609.tw|tse_1752.tw|tse_1760.tw|tse_00637L.tw|tse_2615.tw|tse_6443.tw|tse_1605.tw|tse_2618.tw|tse_2610.tw|tse_00885.tw|tse_1417.tw|tse_2014.tw|tse_2603.tw|tse_2303.tw|tse_3481.tw|tse_2201.tw|tse_00878.tw|tse_2002.tw|tse_2409.tw|",
      method: "GET",
    },
    function (error, response, body) {
      if (error || !body) {
        console.log(ERR);
        return;
      } else {
        var stockApi = new StockApi();
        stockApi.stockApiValue = body.trim();
        stockApi.save((err, data) => {
          if (err) {
            console.log("saveERR");
          } else {
            console.log("ACCESS");
          }
        });
      }
    }
  );
};

getStockApi();
setInterval(getStockApi, 300000);
