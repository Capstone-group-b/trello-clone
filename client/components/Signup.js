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

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    console.log("SignUp was clicked");

    if (!email || !password) {
      alert("All fields must be completed to sign up.");
    } else {
      await dispatch(
        authenticate({ email, password, firstName, lastName, method: "signup" })
      );
      setEmail("");
      setPassword("");
    }
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
          type="text"
          label="First Name"
          size="small"
          variant="outlined"
          onChange={(evt) => setFirstName(evt.target.value)}
        />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="Last Name"
          size="small"
          variant="outlined"
          onChange={(evt) => setLastName(evt.target.value)}
        />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="email"
          label="E-Mail"
          size="small"
          variant="outlined"
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="password"
          label="Password"
          size="small"
          variant="outlined"
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <Button
          variant="outlined"
          onClick={handleSignup}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "right",
          }}
        >
          Sign Up
        </Button>
        {error && <div> {error} </div>}
      </Box>

      <Link
        component="button"
        variant="body2"
        onClick={() => {
          navigate(`/login`);
        }}
        sx={{ fontSize: 12, padding: 1 }}
      >
        Already have an account? Log In
      </Link>
    </Box>
  );
};

export default Signup;
