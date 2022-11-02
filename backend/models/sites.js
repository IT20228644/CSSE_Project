const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Site = new Schema(
  {
    location: {
      type: String,
      required: true,
    },name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Site_Schema = mongoose.model("Site", Site);
module.exports = Site_Schema;
