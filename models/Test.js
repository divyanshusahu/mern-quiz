const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  test_name: {
    type: String,
    required: true
  },
  owner_email: {
    type: String,
    required: true
  },
  questions: {
    type: Object
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

TestSchema.set("autoIndex", false);
module.exports = Test = mongoose.model("tests", TestSchema);
