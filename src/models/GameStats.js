const mongoose = require("mongoose");

const gameStats = new mongoose.Schema({
  contestantId: mongoose.Types.ObjectId,
  contestantName: {
    type: String,
    required: true,
  },
  prizeEarned: {
    type: String,
    required: true,
    default: 0,
  },
  time: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("GameStats", gameStats);
