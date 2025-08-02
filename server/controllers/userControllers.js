const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.register = async (req, res) => {
  try {
    console.log('Register endpoint called with body:', req.body);

    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ 
        msg: "Missing required fields", 
        status: false,
        details: {
          username: username ? 'provided' : 'missing',
          email: email ? 'provided' : 'missing',
          password: password ? 'provided' : 'missing'
        }
      });
    }

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res
        .status(400)
        .json({ msg: "Username already taken", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.status(400).json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    delete user.password;
    return res.status(201).json({ status: true, user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ msg: "Error registering user: " + error.message, status: false });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Incorrect username", status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Incorrect password", status: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ status: true, user, token });
  } catch (error) {
    // console.error('Error logging in user:', error);
    res.status(500).json({ message: "Error logging in user" });
  }
};
