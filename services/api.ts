import axios from "axios";
export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}`
    : "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

  let data_response = undefined;

  await axios
    .get(TMDB_CONFIG.BASE_URL + endpoint, {
      headers: TMDB_CONFIG.headers,
    })
    .then((response) => {
      data_response = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data_response;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    let data_response = undefined;

    await axios
      .get(
        TMDB_CONFIG.BASE_URL +
          `/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
        {
          headers: TMDB_CONFIG.headers,
        }
      )
      .then((response) => {
        data_response = response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
    return data_response;
  } catch (error) {
    console.log(error);
  }
};
