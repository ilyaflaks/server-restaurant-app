const mongoose = require("mongoose");

const TestcollectionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nalue: {
    type: Number,
    required: true,
  },
});

const Testcollections = mongoose.model(
  "testcollections",
  TestcollectionsSchema
);

module.exports = Testcollections;
