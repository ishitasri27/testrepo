const mongoose = require("mongoose");
const newsschema = new mongoose.Schema(
  {
    headline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
        type: String,
        required: true,
      },
    newsauthor: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const newsmodel = mongoose.model("news", newsschema);
module.exports = newsmodel;
