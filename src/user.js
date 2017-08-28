const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const UserSchema = new Schema({
  name: String,
  postCount: Number
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
