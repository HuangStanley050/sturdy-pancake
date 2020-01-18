const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  firstName: String,
  age: Number,
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "company" }
});

module.exports = mongoose.model("user", userSchema);
