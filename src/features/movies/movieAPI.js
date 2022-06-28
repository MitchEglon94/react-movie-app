const MOVIE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=4503e42f5762f850ada999d307bfc5f9&language=en-US&page=1`;

export async function fetchMovies() {
  console.log("url", MOVIE_URL);

  try {
    const response = await fetch(MOVIE_URL);
    if (!response.ok) throw response;
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    return Promise.reject(err.statusText || err.message);
  }
}
