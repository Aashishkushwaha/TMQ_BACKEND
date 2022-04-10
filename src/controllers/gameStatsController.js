const User = require("../models/User");
const GameStats = require("../models/GameStats");

const getStats = async (req, res) => {
  try {
    const foundUser = await User.findOne({ _id: req.userId });
    if (!foundUser)
      return res
        .status(400)
        .json({ code: 400, message: "User does not exist" });

    let details = await GameStats.find({ contestantId: req.userId })
      .sort({ time: -1 })
      .limit(50);
    return res.json({
      details,
    });
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message });
  }
};

const submitStats = async (req, res) => {
  const { contestantName, prizeEarned, time } = req.body;
  if (!contestantName || [null, undefined].includes(prizeEarned))
    return res
      .status(400)
      .json({ code: 400, message: "Please provide all details." });

  const gameStats = await new GameStats({
    time,
    contestantName,
    prizeEarned,
    contestantId: req.userId,
  }).save();
  return res
    .status(201)
    .json({ message: "Game details saved successfully.", gameStats });
};

module.exports = {
  getStats,
  submitStats,
};
