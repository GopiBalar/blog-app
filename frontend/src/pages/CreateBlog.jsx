import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CreateBlog() {
  const navigate = useNavigate();
  const [inputBlog, setInputBlog] = useState({
    title: "",
    description: "",
    image: "",
  });

  function handleChange(e) {
    setInputBlog((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log("inputBlog", inputBlog);
      const id = localStorage.getItem("userId");
      const { data } = await axios.post("/api/v1/blog/add-blog", {
        title: inputBlog.title,
        description: inputBlog.description,
        image: inputBlog.image,
        userId: id,
      });
      if (data?.success) {
        toast.success("Blog created Successfully");
        navigate("/my-blog");
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          margin="auto"
          width={"55%"}
          border={"1"}
          marginTop={"3"}
          padding={3}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography variant="h4" color="#827717" textAlign="center">
            Create A Post
          </Typography>
          <InputLabel sx={{ fontSize: "24px", fontWeight: "bold" }}>
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputBlog.title}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
          <InputLabel sx={{ fontSize: "24px", fontWeight: "bold" }}>
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputBlog.description}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
          <InputLabel sx={{ fontSize: "24px", fontWeight: "bold" }}>
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputBlog.image}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
          <Button type="submit" sx={{ bgcolor: "#827717" }} variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
}

export default CreateBlog;
