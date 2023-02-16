import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { me, logout } from "../features/auth/authSlice";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import SingleBoard from "../features/singleBoard/SingleBoard";
import Navbar from "../features/navBar/NavBar";
import MyUserProfile from "../features/userProfile/MyUserProfile";
import Themes from "../features/themes/Themes";
import { MyCalendar } from "../features/calendar/Calendar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";

const coolTheme = createTheme({
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    lighter: {
      main: '#ced3db',
      contrastText: '#64748B'
    },
    daring: {
      main: '#004e89',
      contrastText: '#fff'
    },
  }
});

const pizzaTheme = createTheme({
  palette: {
    primary: {
      main: '#F7AD45',
      darker: '#BB3E00',
    },
    neutral: {
      main: '#5F8D37',
      contrastText: '#FFF1D7',
    },
    lighter: {
      main: '#F7AD45',
      contrastText: '#FFF1D7'
    },
    daring: {
      main: '#BB3E00',
      contrastText: '#FFF1D7'
    },
  }
});

const roseTheme = createTheme({
  palette: {
    primary: {
      main: '#CB857C',
      darker: '#9C2D41',
    },
    neutral: {
      main: '#94777C',
      contrastText: '#FAF7F4',
    },
    lighter: {
      main: '#E9DDD4',
      contrastText: '#9C2D41'
    },
    daring: {
      main: '#9C2D41',
      contrastText: '#FAF7F4'
    },
  }
});

const sportsTheme = createTheme({
  palette: {
    primary: {
      main: '#005792',
      darker: '#13334C',
    },
    neutral: {
      main: '#13334C',
      contrastText: '#F6F6E9',
    },
    lighter: {
      main: '#FFEBB7',
      contrastText: '#AD8E70'
    },
    daring: {
      main: '#FD7F20',
      contrastText: '#F6F6E9'
    },
  }
});

const themes = [{
  name: "Cool Blue",
  themeName: "coolTheme",
  color: coolTheme
}, {
  name: "Pizza Party",
  themeName: "pizzaTheme",
  color: pizzaTheme
}, {
  name: "Dusty Rose",
  themeName: "roseTheme",
  color: roseTheme
}, {
  name: "Ballin",
  themeName: "sportsTheme",
  color: sportsTheme
}];

const Main = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const theme = useSelector((state) => state.auth.me.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(me());
  }, []);

  const logoutAndRedirectHome = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  const handleTheme = () => {
    for (let i = 0; i < themes.length; i++) {
      if (theme === themes[i].themeName) return themes[i].color;
    };
  };

  return (
    <ThemeProvider theme={theme ? handleTheme() : coolTheme}>
      <Box id="main">
        <Box id="header"></Box>
        <Navbar />
        <br />
        <br />
        <Box>
          {isLoggedIn ? (
            <Routes>
              <Route path="/*" element={<Home theme={handleTheme()} />} />
              <Route path="/:user" element={<Home theme={handleTheme()} />} />
              <Route path="/board/:boardId" element={<SingleBoard />} />
              <Route path="/themes" element={<Themes themes={themes} />} />
              <Route path="/myProfile" element={<MyUserProfile theme={handleTheme()} />} />
              <Route path="/calendar" element={<MyCalendar />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/*" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Main;
