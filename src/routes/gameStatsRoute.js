const router = require("express").Router();
const { getStats, submitStats } = require("../controllers/gameStatsController");

router.route("/getStats").get(getStats);

router.route("/submitStats").post(submitStats);

module.exports = router;
