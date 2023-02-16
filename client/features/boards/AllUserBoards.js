import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUserBoards, selectUserBoards } from "./allUserBoardsSlice";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  CardActionArea,
  Box,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import CreateBoardFormMUI from "../createBoardForm/createMUIBoardForm";

const UserBoards = ({theme}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUserBoards = useSelector(selectUserBoards);
  const userId = useSelector((state) => state.auth.me.id);

  useEffect(() => {
    dispatch(fetchAllUserBoards(userId));
  }, []);

  return (
    <Container>
      <br />
      <Typography variant="h5">Your Boards</Typography>
      <br />
      <Grid container spacing={2}>
        {allUserBoards && allUserBoards.length
          ? allUserBoards.map(({ board }, index) => {
              return (
                <Grid item key={`board#${index}`}>
                  <Card sx={{height: 100, width: 200, minWidth: 200}}>
                    <CardActionArea
                      onClick={() => navigate(`/board/${board.id}`)}
                    >
                      <CardContent sx={{
                        height: 100, 
                        bgcolor: theme.palette.neutral.main,
                        color: theme.palette.neutral.contrastText
                      }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {board.boardName}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })
          : null}
        <Grid item >
          <CreateBoardFormMUI theme={theme} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserBoards;
