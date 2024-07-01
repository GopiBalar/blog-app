const express = require("express");
const app = express(); //rest object
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config();
const connect = require("./db/connect");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

//listen server
const PORT = process.env.PORT || 5000;

function start() {
  connect();
  app.listen(PORT, () => {
    console.log(
      `Server is lisning on ${process.env.DEV_MODE} mode port no ${PORT}!`
        .bgMagenta.white
    );
  });
}

start();
