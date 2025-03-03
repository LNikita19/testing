const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    Photo: {
      type: String,
    },
    Photo1: {
      type: String,
    },
    Heading: {
      type: String,
    },
    Description: {
      type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("About", aboutSchema);
