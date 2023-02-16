import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import { logout } from "../auth/authSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/signup");
  };

  const user = useSelector((state) => state.auth.me);
  const email = useSelector((state) => state.auth.me.email);

  return (
    <>
      {isLoggedIn ? (
        <AppBar position="fixed" color="daring">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 0.5 }}
            >
              <LocalPizzaIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, mr: 1 }}
              onClick={() => navigate(`/home`)}
            >
              Trell-O
            </Typography>
            <Button color="inherit" onClick={() => navigate('/themes')}>
              Themes
            </Button>
            <Button color="inherit" onClick={() => navigate(`/myProfile`)}>
              My Profile
            </Button>
            <Button color="inherit" onClick={() => logoutAndRedirectHome()}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position="static" color="daring">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 0.5 }}
            >
              <LocalPizzaIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              onClick={() => navigate(`/home`)}
            >
              Trell-O
            </Typography>
            <Button color="inherit" onClick={() => navigate(`/login`)}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate(`/signup`)}>
              Sign UP
            </Button>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default Navbar;
