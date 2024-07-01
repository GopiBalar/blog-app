const express = require("express");
const {
  getAllBlog,
  addBlog,
  updateBlog,
  deleteBlog,
  getSingleBlog,
} = require("../controller/blog");
const router = express.Router();

router.get("/getAll-blog", getAllBlog);

router.get("/getSingle-blog/:id", getSingleBlog);

router.post("/add-blog", addBlog);

router.put("/update-blog/:id", updateBlog);

router.delete("/delete-blog/:id", deleteBlog);

module.exports = router;
