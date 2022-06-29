import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../features/users/userSlice";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

function FollowedUsers() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  // const [str, setStr] = useState("");
  const likedUser = useSelector((store) => store.user.likedUser);
  const allUsers = useSelector((store) => store.user.users);
  const currentUserLiked = useSelector((store) => store.user.user.liked);
  let mutualArr = [];

  // CLICK FUNCTION TO FIND REQUESTED USER, AND CONFIRM USER EXISTS BEFORE SENDING REQ

  const clickHandler = () => {
    const found = allUsers.find(
      (e) => e.username === username && e.isAdmin === false
    );
    if (found) {
      dispatch(getOneUser(username));
    }
  };

  // BUILD MUTUALLY LIKED MOVIES ARRAY BETWEEN SEARCHED USER AND LOGGED IN USER; DECIFER WHICH ARRAY IS LONGER AND THEN FILTER FOR COMMON MOVIES

  if (currentUserLiked > likedUser[0].liked) {
    currentUserLiked.forEach((e) => {
      likedUser[0].liked.forEach((el) => {
        if (e.id === el.id) mutualArr.push(el);
      });
    });
  } else {
    likedUser[0].liked.forEach((e) => {
      currentUserLiked.forEach((el) => {
        if (e.id === el.id) mutualArr.push(el);
      });
    });
  }

  // OUTPUT TO SHOW MUTUALLY LIKED MOVIES OF THE SEARCHED USER

  return (
    <>
      <div>
        <h1> Followed Users</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <button onClick={() => clickHandler()}>Get user</button>
        </form>
      </div>
      <div>
        {likedUser.map((user) => (
          <div key={user._id}>
            <h4>{user.username}</h4>
            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="space-evenly"
            >
              {mutualArr.map((movie) => (
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
    </>
  );
}

export default FollowedUsers;
