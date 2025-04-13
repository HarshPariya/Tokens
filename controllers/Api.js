const bcrypt = require("bcrypt");
const saltRound = 10;
const secretKey = "harsh";
const jwt = require("jsonwebtoken");
// const auth = require('../Middleware/auth')

let arr = []; //database

const register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = arr.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).send({ msg: "This email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, saltRound);
  const newUser = { email, password: hashedPassword };

  arr.push(newUser);

  const token = jwt.sign({ email }, secretKey, { expiresIn: "365d" });

  res.status(201).send({ msg: "User registered successfully", token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = arr.find((user) => user.email === email);
  if (!user) {
    return res.status(404).send({ msg: "User is not registered" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).send({ msg: "Incorrect password" });
  }

  const token = jwt.sign({ email }, secretKey, { expiresIn: "365d" });

  res.send({ msg: "User logged in successfully", token });
};

const home = (req, res) => {
  res.send({
    message: "This is Home page",
  });
};

const dashboard = (req, res) => {
  res.send({ msg: "Welcome to Dashboard" });
};

module.exports = { login, register, home, dashboard };