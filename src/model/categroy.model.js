const mongoose = require("mongoose");
const User = require("./user.model");

const categorySchema = new mongoose.Schema({
    categoryName: {
      type: String,
      require:true
    },
  })
const Category = mongoose.model("Category", categorySchema );

exports.Category = Category;
