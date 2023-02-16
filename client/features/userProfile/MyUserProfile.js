import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateMyProfileImage } from "../singleBoard/singleBoardSlice";
import {
  Avatar,
  Box,
  IconButton,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

// If page is self-contained it doesn't need to be sent to the store.

function UserProfile({theme}) {
  const [addImage, setAddImage] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [emailVerify, setEmailVerify] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  // const inputRef = useRef("");

  const handleImageUpdate = () => {
    console.log("handleImageUpdate has been clicked", profilePicture);
    const userId = user.id;

    axios.patch(`/api/users/uploadProfilePicture/userId/${userId}`, {
      url: profilePicture,
    });
    setAddImage(false)
    setProfilePicture("")
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    if ("" || !password || !passwordVerify || password != passwordVerify) {
      alert("You need a password and it needs to match!");
      return null;
    }
    // if (!email || !emailVerify || email != emailVerify) {
    //   alert("Your emails need to match!");
    //   return null;
    // }

    axios.put(`/api/users/changeUser/${user.id}`, data);
  };

  useEffect(() => {
    setProfilePicture(user.imageUrl);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
  }, [user]);

  return (
    <>
      <br />
      <br />
      {user.imageUrl ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Avatar
            alt={user.firstName}
            src={user.imageUrl}
            sx={{ width: 100, height: 100 }}
          />
          <IconButton
            aria-label="edit-profile-pic"
            onClick={() => setAddImage(true)}
            sx={{
              fontSize: 12,
              color: (theme) => theme.palette.grey[500],
              "&:hover": { fontSize: 20 },
              height: 20,
              width: 20,
            }}
          >
            <EditIcon
              sx={{
                color: "grey",
                width: 15,
              }}
            />
          </IconButton>
        </Box>
      ) : null }
      <br />
      {addImage ? (
        <Box
        sx={{
          marginBottom: 2
        }}>
          <TextField
            // inputRef={inputRef}
            placeholder="Link to jpg or png"
            size="small"
            onChange={(event) => setProfilePicture(event.target.value)}
            onBlur={() => setAddImage(false)}
            sx={{bgcolor: theme.palette.neutral.contrastText}}
          />
          <Button
            color="neutral"
            variant="contained"
            style={{ justifyContent: "flex-start", textTransform: "none", marginLeft: 4 }}
            onClick={() => {
              handleImageUpdate();
              setAddImage(false);
            }}
          >
            Set Photo
          </Button>
        </Box>
      ) : (
        <Button onClick={() => {
          setAddImage(true);
          // inputRef.current.focus();
        }}>
          Add Profile Pic
        </Button>
      )}

        <Typography variant="h4" sx={{margin: 0.5}}>
          Welcome to your profile, {user.firstName}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 250,
            // padding: 5
          }}
        >
          <TextField
            defaultValue={user.firstName}
            size="small"
            onChange={(event) => setFirstName(event.target.value)}
            sx={{bgcolor: theme.palette.neutral.contrastText, margin: 1,}}
          />
          <TextField
            defaultValue={user.lastName}
            size="small"
            onChange={(event) => setLastName(event.target.value)}
            sx={{bgcolor: theme.palette.neutral.contrastText, margin: 1}}
          />
          <TextField
            defaultValue={user.email}
            size="small"
            onChange={(event) => setEmail(event.target.value)}
            sx={{bgcolor: theme.palette.neutral.contrastText, margin: 1}}
          />
          <TextField
          type="password"
          label="password"
            placeholder="Password"
            size="small"
            onChange={(event) => setPassword(event.target.value)}
            sx={{bgcolor: theme.palette.neutral.contrastText, margin: 1}}
          />
          <TextField
          type="password"
          label="password"
            placeholder="Password Verify"
            size="small"
            onChange={(event) => setPasswordVerify(event.target.value)}
            sx={{bgcolor: theme.palette.neutral.contrastText, margin: 1}}
          />
          <Button
          onClick={handleSubmit}
          color="neutral"
          variant="contained"
          sx={{margin: 1}}
          >
            Update
          </Button>
        </Box>
      {/* <p>First Name</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <p>Last Name</p>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <p>Email</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Verify Email"
          value={undefined}
          onChange={(event) => setEmailVerify(event.target.value)}
        />
        <br />

        <p>Password</p>

        <input
          type="password"
          placeholder="Password"
          value={undefined}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="verify password"
          value={undefined}
          onChange={(event) => setPasswordVerify(event.target.value)}
        />
        <br />

        <button type="submit">Update</button>
      </form> */}
    </>
  );
}

export default UserProfile;
