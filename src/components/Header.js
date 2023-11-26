import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);

  //logout
  const handleLogout = () => {
    setLoading(true);
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfull");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && (
        <div
          className=""
          role="status"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "9999",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div style={{ height: "5rem", width: "5rem", color: "white" }}>
            <CircularProgress size={70} style={{ color: "#1976D2" }} />
          </div>
        </div>
      )}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4" style={{ fontFamily: "serif" }}>
            Blogger
          </Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft="300px" marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab
                  label="Blogs"
                  LinkComponent={Link}
                  to="/blogs"
                  style={{ fontFamily: "serif" }}
                />
                <Tab
                  label="My Blogs"
                  LinkComponent={Link}
                  to="/my-blogs"
                  style={{ fontFamily: "serif" }}
                />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  to="/create-blog"
                  style={{ fontFamily: "serif" }}
                />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                  style={{ fontFamily: "serif" }}
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                  style={{ fontFamily: "serif" }}
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button
                onClick={handleLogout}
                sx={{ margin: 1, color: "white" }}
                style={{ fontFamily: "serif" }}
              >
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
