import React from "react";
import FeaturedMovies from "../components/FeaturedMovies";
import LikedMovies from "../components/LikedMovies";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <LikedMovies />
      <FeaturedMovies />
    </div>
  );
}

export default Dashboard;
