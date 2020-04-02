import React from "react";
import MovieItem from "./MovieItem";

const MovieList = props => {
  const {
    movieslist,
    AddMovieToWillWatch = f => f,
    RemoveMovieFromWillWatch = f => f
  } = props;
  return (
    <div className="row">
      {movieslist.map((item, i) => (
        <div className=" col-3" key={item.id}>
          <MovieItem
            movie={item}
            AddMovieToWillWatch={AddMovieToWillWatch}
            RemoveMovieFromWillWatch={RemoveMovieFromWillWatch}
          />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
