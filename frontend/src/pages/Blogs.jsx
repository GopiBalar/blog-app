import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/Blogs/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  async function getAllBlog() {
    try {
      const { data } = await axios.get("/api/v1/blog/getAll-blog");
      if (data?.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    getAllBlog();
  }, []);
  console.log("blogs", blogs);

  return (
    <div>
      {blogs?.map((val, index) => (
        <BlogCard
          id={val._id}
          isUser={localStorage.getItem("userId") === val.userId._id}
          val={val}
          key={index}
          title={val.title}
          desc={val.description}
          img={val.image}
          date={val.createdAt}
          username={val.userId.username}
        />
      ))}
    </div>
  );
};

export default Blogs;
