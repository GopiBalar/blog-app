import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function BlogDetailsEdit() {
  const [blog, setBlog] = useState({});
  const [input, setInput] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();

  async function getBlog() {
    try {
      const { data } = await axios.get(`/api/v1/blog/getSingle-blog/${id}`);
      if (data?.success) {
        setBlog(data.data);
        setInput({
          title: data?.data.title,
          description: data?.data.description,
          image: data?.data.image,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    getBlog();
  }, [id]);

  function handleChange(e) {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: input.title,
        description: input.description,
        image: input.image,
      });
      if (data?.success) {
        toast.success("Blog Updated Successfully");
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
            Update A Post
          </Typography>
          <InputLabel sx={{ fontSize: "24px", fontWeight: "bold" }}>
            Title
          </InputLabel>
          <TextField
            name="title"
            value={input.title}
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
            value={input.description}
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
            value={input.image}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
          <Button type="submit" sx={{ bgcolor: "#827717" }} variant="contained">
            Update
          </Button>
        </Box>
      </form>
    </>
  );
}

export default BlogDetailsEdit;
