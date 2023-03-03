import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTheme } from "../auth/authSlice";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Container
} from "@mui/material";

const Themes = ({themes}) => {
  const user = useSelector((state) => state.auth.me);

  const dispatch = useDispatch();

  const chooseTheme = async (theme) => {
    console.log(`***
    ***
    ***
    Logging:Here we are inside of Themes.js
    ***
    ***
    ***
    `, updateTheme);
    await dispatch(updateTheme({
      userId: user.id,
      theme
    }));
  };

  return (
    <Container sx={{
      margin: 5,
      marginTop: 9,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}>
      <Box sx={{display: "flex", justifyContent: "center"}}>
        <Typography variant="h5">Choose a Theme</Typography>
      </Box>
      <br />
      <br />
      <Grid container spacing={2}>

      {themes && themes.length ?
      themes.map((theme) => (
        <Grid item key={theme.name}>
          <Card sx={{height: 100, width: 200, minWidth: 200, boxShadow: `5px 5px 5px ${theme.color.palette.daring.main}`}}>
            <CardActionArea
              onClick={() => chooseTheme(theme.themeName)}
            >
              <CardContent sx={{
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: theme.color.palette.neutral.main,
                color: theme.color.palette.neutral.contrastText
              }}>
                <Typography
                gutterBottom
                variant="h6"
                component="div"
                >
                  {theme.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      )) : null }

      </Grid>
    </Container>
  );
};

export default Themes;
