const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  firstName: String,
  age: Number
});

module.exports = mongoose.model("User", userSchema);
