const express = require("express");
const {
  allUser,
  register,
  login,
  logout,
  singleUser,
} = require("../controller/user");
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/allUser", allUser);

router.get("/singleUser/:id", singleUser);

module.exports = router;
