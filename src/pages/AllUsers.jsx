import React, { useEffect } from "react";
import { getAllUsers, updateUserInfo } from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

function AllUsers() {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.user.users);
  const userInState = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(updateUserInfo(userInState));
    dispatch(getAllUsers());
  }, [userInState]);

  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>
          <h2>Liked movies of '{user.username}'</h2>
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="space-evenly"
          >
            {user.liked.map((movie) => (
              <Grid item key={movie.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    title={movie.original_title}
                    subheader={movie.release_date}
                  />
                  <CardMedia
                    component="img"
                    height="500"
                    image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {movie.overview}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing></CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  );
}

export default AllUsers;
