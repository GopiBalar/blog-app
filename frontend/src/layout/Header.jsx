import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/slice/authSlice";
import toast from "react-hot-toast";

const Header = () => {
  const [value, setValue] = useState();
  let islogin = useSelector((state) => state.isLogin);
  islogin = islogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      localStorage.removeItem("userId");
      navigate("/login");
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#9E9D24" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-even" }}>
          <Typography variant="h4">Blog App</Typography>
          {islogin && (
            <Box display={"flex"} marginLeft="auto" marginRight="auto">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blog" />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  to="/create-blog"
                />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!islogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {islogin && (
              <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
