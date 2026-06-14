const mongoose = require("mongoose");
const { type } = require("node:os");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  lostItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  }]
})

module.exports = mongoose.model("User", userSchema);