const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  rollNo: { type: Number, required: true, unique: true },
  mid1: {
    telugu: Number,
    hindi: Number,
    english: Number,
  },
  mid2: {
    history: Number,
    geography: Number,
    civics: Number,
  },
  mid3: {
    physics: Number,
    chemistry: Number,
    biology: Number,
  },
});

const Marks = mongoose.model("Marks", marksSchema);

module.exports = Marks;
