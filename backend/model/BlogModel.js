const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required!"] },
    description: { type: String, required: [true, "Description is required!"] },
    image: { type: String, required: [true, "Image is required!"] },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "userId is require"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
