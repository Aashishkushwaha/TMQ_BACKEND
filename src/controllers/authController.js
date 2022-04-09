const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ code: 400, message: "Please provide all details" });
  } else if (password.length < 6)
    return res.status(400).json({
      code: 400,
      message: "Password must be at-least 6 characters long",
    });

  try {
    const foundUser = await User.findOne({ username });
    if (foundUser)
      return res.status(400).json({ code: 400, message: "User already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new User({
      username,
      password: hashedPassword,
    });
    await createdUser.save();

    return res.json({
      id: createdUser._id,
      message: "User registered successfully.",
    });
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ code: 400, message: "Please provide all details" });
  }

  const foundUser = await User.findOne({ username });
  if (!foundUser)
    return res.status(400).json({ code: 400, message: "Invalid credentials" });

  const matched = await bcrypt.compare(password, foundUser.password);

  if (!matched)
    return res.status(400).json({ code: 400, message: "Invalid credentials" });

  const token = await jwt.sign(
    { userId: foundUser._id },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 30, // 30 min
    }
  );

  return res.json({ message: "Logged in successfully", token });
};

module.exports = {
  loginUser,
  registerUser,
};
