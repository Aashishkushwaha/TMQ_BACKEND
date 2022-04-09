require("dotenv").config();
const cors = require("cors");
const express = require("express");
const corsOptions = require("./utils/corsConfig");
const authRouter = require("./routes/authRoute");
const gameStatsReducer = require("./routes/gameStatsRoute");
const authMiddleware = require("./middleware/authMiddleware");
const { connectToDB, logError } = require("./utils/utilFunctions");

const app = express();
const PORT = process.env.PORT || 5000;

// to handle url params
app.use(express.urlencoded({ extended: false }));

// to handle json body
app.use(express.json());

// to handler cors
app.use(cors(corsOptions));

// routes handler
app.use("/auth", authRouter);
app.use("/game", authMiddleware, gameStatsReducer);

app.get("/", (req, res) => {
  return res.send("Hello from TMQ backend services");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB(process.env.MONGO_URL)
    .then(() => console.log("Connected to db..."))
    .catch((error) => {
      logError(error.message);
    });
});
