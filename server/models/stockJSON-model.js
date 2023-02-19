const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  stockApiValue: {
    type: String,
  },
});

const stockApi = mongoose.model("stockApi", stockSchema);
module.exports = stockApi;
