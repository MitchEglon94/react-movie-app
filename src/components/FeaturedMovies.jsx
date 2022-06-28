import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLiked } from "../features/users/userSlice";
import Grid from "@mui/material/Grid";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

function FeaturedMovies() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const movies = useSelector((store) => store.movie.list);
  console.log(movies);
  const clickHandler = (info) => {
    if (user.user.likedMovieId.indexOf(info.id) < 0) {
      dispatch(updateLiked(info));
    }
  };

  return (
    <>
      <h2>Featured Movies This Week</h2>
      <div className="featured-container"></div>
      <h2>{user.firstName}s Liked Movies</h2>
      <div className="featured-container"></div>
      <Grid container spacing={3} direction="row" justifyContent="space-evenly">
        {movies.map((movie) => (
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
              <CardActions disableSpacing>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => clickHandler(movie)}
                >
                  <FavoriteIcon />
                  Add to watchlist
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default FeaturedMovies;
