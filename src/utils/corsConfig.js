const whitelist = [
  "http://localhost:5000",
  "http://localhost:3000",
  "https://the-millionaires-quiz.vercel.app/",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      // callback(new Error("Not allowed by CORS"));
      callback("Not allowed by CORS");
    }
  },
};

module.exports = corsOptions;
