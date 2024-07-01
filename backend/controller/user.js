const User = require("../model/UserModel");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    console.log(req.headers);
    const { username, email, password } = req.body;
    console.log("username, email, password", username, email, password);

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "Please fill the all fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // const addUser = await User.create({ username, email, password:hashedPassword });
    const addUser = new User({ username, email, password: hashedPassword });
    await addUser.save();

    res
      .status(200)
      .json({ success: true, msg: "Registered successfully", data: addUser });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ success: false, msg: "Failed in Register", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({ success: false, msg: "Not found User" });
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, msg: "Password is wrong!" });
    }

    res.status(200).json({
      success: true,
      msg: "Login successfully",
      data: existingUser,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ success: false, msg: "failed login", error });
  }
};

exports.logout = (req, res) => {};

exports.allUser = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res
      .status(200)
      .json({ success: true, userCount: allUsers.length, data: allUsers });
  } catch (error) {
    res.status(500).send({ success: false, msg: "Error get All user", error });
  }
};

exports.singleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await User.findById(id).populate("blogs");

    if (!existingUser) {
      return res
        .status(404)
        .send({ success: false, msg: "Not found user", error });
    }

    res.status(200).json({
      success: true,
      msg: "Get Single user Successsfully",
      data: existingUser,
    });
  } catch (error) {
    console.log("error.message", error.message);
    res.status(500).send({ success: false, msg: "Error get user", error });
  }
};
