import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/slice/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({ email: "", password: "" });

  function handleChange(e) {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", inputs);
      if (data.success) {
        localStorage.setItem("userId", data?.data._id);
        dispatch(authActions.login());
        toast.success("Login successfully");
        await navigate("/blogs");
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box
        maxWidth={450}
        display={"flex"}
        flexDirection={"column"}
        margin={"auto"}
        marginTop={"3rem"}
        boxShadow={"5px 5px #9E9D24,-5px -5px #827717"}
        padding={4}
        borderRadius={5}
      >
        <Typography
          variant="h4"
          textAlign={"center"}
          color={"white"}
          padding={0}
        >
          Login
        </Typography>
        <TextField
          placeholder="Email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
          margin="normal"
          type="email"
          variant="filled"
          required
        />

        <TextField
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
          margin="normal"
          type={showPassword ? "text" : "password"}
          variant="filled"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          sx={{ bgcolor: "#827717", marginTop: 2 }}
          variant="contained"
        >
          Submit
        </Button>
        <Button onClick={() => navigate("/register")} sx={{ color: "black" }}>
          Create New Account ? Please Login
        </Button>
      </Box>
    </form>
  );
};

export default Login;
