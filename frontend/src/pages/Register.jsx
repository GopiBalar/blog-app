import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/slice/authSlice";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(false);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("inputs", inputs);
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      console.log("data", data);
      if (data?.success) {
        await localStorage.setItem("userId", data?.data._id);
        dispatch(authActions.login());
        toast.success("Register SUccessfuly");
        navigate("/blogs");
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
          Register
        </Typography>
        <TextField
          placeholder="User Name"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          margin="normal"
          type="text"
          variant="filled"
          required
        />
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
        <Button onClick={() => navigate("/login")} sx={{ color: "black" }}>
          Already Registerd ? Please Login
        </Button>
      </Box>
    </form>
  );
};

export default Register;
