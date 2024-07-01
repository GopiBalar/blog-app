const Blog = require("../model/BlogModel");
const User = require("../model/UserModel");
const mongoose = require("mongoose");

exports.getAllBlog = async (req, res) => {
  try {
    const allBlogs = await Blog.find({}).populate("userId");

    res.status(200).json({
      success: true,
      countBlogs: allBlogs.length,
      msg: "All Blogs Lists",
      data: allBlogs.reverse(),
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ success: false, msg: "Failed get All blogs!" });
  }
};

exports.getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBlog = await Blog.findById(id);

    if (!existingBlog) {
      return res.status(404).json({ success: false, msg: "Blog not found " });
    }

    res.status(200).json({
      success: true,
      msg: "Get Single Blog Successfully",
      data: existingBlog,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ success: false, msg: "Failed get single blogs!" });
  }
};

exports.addBlog = async (req, res) => {
  try {
    const { title, description, image, userId } = req.body;
    if (!title || !description || !image || !userId) {
      return res
        .status(400)
        .json({ success: false, msg: "Please fill all fields" });
    }

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ success: false, msg: "Not found User id" });
    }

    // const addBlog = new Blog({ title, description, image, userId });
    // await addBlog.save();
    // await existingUser.blogs.push(addBlog);
    // await existingUser.save();

    const addBlog = new Blog({ title, description, image, userId });
    const session = await mongoose.startSession(); // Yeh func. ek new session create karta hai. Session ek transaction ke liye ek context provide karta hai, jisme multiple operations ko ek saath execute kiya ja sakta hai.
    session.startTransaction(); // ye func. se transaction start hota hai & session mein multiple queries ko ek saath execute krta hai
    await addBlog.save({ session });
    await existingUser.blogs.push(addBlog);
    await existingUser.save({ session });
    await session.commitTransaction(); // ye func. se transaction ke andar ke changes ko save kre & transaction end ho jata

    res
      .status(200)
      .json({ success: true, msg: "Add Blog successfully", data: addBlog });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ success: false, msg: "Failed Add blog!" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const existingBlog = await Blog.findById(id);

    if (!existingBlog) {
      return res.status(404).json({ success: false, msg: "Not found Blog" });
    }

    const updateBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      msg: "Blog Update Successfully",
      data: updateBlog,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ success: false, msg: "Failed blog update!" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBlog = await Blog.findById(id);

    if (!existingBlog) {
      return res.status(404).json({ success: false, msg: "blog not found" });
    }

    const blog = await Blog.findByIdAndDelete(id).populate("userId");
    await blog.userId.blogs.pull(blog._id);
    await blog.userId.save();

    res.status(200).json({ success: true, msg: "Blog Delete Successfully!" });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ success: false, msg: "Failed blog Delete !" });
  }
};
