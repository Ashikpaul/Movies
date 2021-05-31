import React from "react";

const IMAGE_API = "https://image.tmdb.org/t/p/w1280";
const unavailableImg =
  "https://images.unsplash.com/photo-1523207911345-32501502db22?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";

export default function Movie({ title, poster_path, overview, vote_average }) {
  const setRatingColor = (rate) => {
    if (rate >= 8) {
      return "green";
    } else if (rate > 6) {
      return "orange";
    } else return "red";
  };

  return (
    <div className="movie">
      <img
        src={poster_path ? IMAGE_API + poster_path : unavailableImg}
        alt={title}
      />
      <div className="movie-info">
        <h3>{title}</h3>
        <span className={`tag ${setRatingColor(vote_average)}`}>
          {vote_average}
        </span>
      </div>
      <div className="movie-overview">
        <h2>Overview : </h2>
        <p>{overview}</p>
      </div>
    </div>
  );
}
