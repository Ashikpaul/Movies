import React, { useEffect, useState } from "react";
import "./styles.css";
import Movie from "./components/Movie";
import axios from "axios";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?api_key=e5045a8a67baeb877a9da1a903352516&language=en-US&sort_by=popularity.desc&page=1";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=e5045a8a67baeb877a9da1a903352516&language=en-US&page=1&query=";

export default function App() {
  const [movies, setMovies] = useState(() => []);
  const [gotMovies, setGotMovies] = useState(false);
  const [searchText, setSearchText] = useState(() => "");

  const getFeaturedMovies = async () => {
    await axios
      .get(FEATURED_API)
      .then((featuredMovies) => {
        setMovies(featuredMovies.data.results);
        setGotMovies(true);
      })
      .catch((err) => {
        console.log("failed to get featured movies", err);
      });
  };

  useEffect(() => {
    getFeaturedMovies();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(SEARCH_API + searchText)
      .then((searchMovies) => {
        setMovies(searchMovies.data.results);
        setGotMovies(true);
      })
      .catch((err) => {
        console.log("failed to get featured movies", err);
      });
    setSearchText("");
  };

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value !== "" && e.target.value)
      axios
        .get(SEARCH_API + e.target.value)
        .then((searchMovies) => {
          setMovies(searchMovies.data.results);
          setGotMovies(true);
        })
        .catch((err) => {
          console.log("failed to get featured movies", err);
        });
    else getFeaturedMovies();
  };

  return (
    <div className="App">
      <header className="navSection">
        <h1>Blah Movies</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search..."
            value={searchText}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
        {movies.length === 0 && gotMovies && <h2>Oops!... no movies found</h2>}
      </div>
    </div>
  );
}
