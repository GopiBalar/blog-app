const mongoose = require("mongoose");
const colors = require("colors");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected successfuly ${mongoose.connection.host}`.white
    );
  } catch (error) {
    console.log("error", error.message.bgRed.white);
  }
};

module.exports = connect;
