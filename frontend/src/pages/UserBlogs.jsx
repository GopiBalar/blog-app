import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/Blogs/BlogCard";
import { Box } from "@mui/material";

function UserBlogs() {
  const [userBlog, setUserBlog] = useState([]);

  async function getUserBlogs() {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/user/singleUser/${id}`);
      console.log(data.data.blogs);
      if (data?.success) {
        setUserBlog(data?.data.blogs);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <Box>
      {userBlog && userBlog.length > 0 ? (
        userBlog?.map((val, index) => (
          <BlogCard
            id={val._id}
            isUser={true}
            key={index}
            title={val.title}
            desc={val.description}
            img={val.image}
            date={val.createdAt}
            username={val.userId.username}
          />
        ))
      ) : (
        <Box sx={{ textAlign: "center", marginTop: 5 }}>
          <h1>You Have't Created Blog</h1>
        </Box>
      )}
    </Box>
  );
}

export default UserBlogs;
