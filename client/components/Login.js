import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../features/auth/authSlice";
import {
  Button,
  Stack,
  TextField,
  Paper,
  Grid,
  Box,
  Link,
} from "@mui/material";
import { positions } from "@mui/system";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (evt) => {
    evt.preventDefault()
    console.log("OnClick is working")
    console.log(`***
    ***
    ***
    Logging:this is the email and password
    ***
    ***
    ***
    `, email, password);
    const login = await dispatch(authenticate({ email, password, method: "login" }));
    setEmail("");
    setPassword("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        float: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          float: "center",
          width: 250,
          padding: 2,
          borderRadius: 1,
          boxShadow: 1,
          backgroundColor: "#f5f5f5",
        }}
      >
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="email"
          label="email"
          value={email}
          size="small"
          variant="outlined"
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="password"
          label="password"
          value={password}
          size="small"
          variant="outlined"
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <Button
          variant="outlined"
          onClick={handleLogin}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "right",
          }}
        >
          Log In
        </Button>
        {error && <div> {error} </div>}
      </Box>

      <Link
        component="button"
        variant="body2"
        onClick={() => {
          navigate(`/signup`);
        }}
        sx={{ fontSize: 12, padding: 1 }}
      >
        Don't have an account? Sign Up
      </Link>
    </Box>
  );
};

export default Login;
