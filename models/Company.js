const mongoose = require("mongoose");
const schema = mongoose.Schema;

const companySchema = new schema({
  name: String,
  description: String,
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]
});

module.exports = mongoose.model("company", companySchema);
