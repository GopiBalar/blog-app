import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function BlogCard({
  title,
  desc,
  img,
  date,
  username,
  id,
  val,
  isUser,
}) {
  const navigate = useNavigate();

  function handleEdit() {
    navigate(`/blog-detailsEdit/${id}`);
  }

  async function handleDelete() {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      console.log("dataDelete", data);
      if (data?.success) {
        toast.success("Blog Deleted Successfully");
        window.location.reload();
        navigate("/my-blog");
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "auto",
        padding: 2,
        marginTop: 3,
        boxShadow: "2px 2px 10px gray",
        ":hover:": { boxShadow: "10px 10px 20px gray" },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={username}
        subheader={date}
      />
      <CardMedia component="img" height="300" image={img} alt="Paella dish" />
      <CardContent>
        <Typography variant="h6">Title : {title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Description : {desc}
        </Typography>
      </CardContent>
    </Card>
  );
}
