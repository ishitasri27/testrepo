const mongoose = require("mongoose");
const authorschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
    },
    address: {
      type: String,
    },
    publishedarticles: {
      type: Number,
    },
  },
  { timestamps: true }
);

const authormodel = mongoose.model("author", authorschema);
module.exports = authormodel;
