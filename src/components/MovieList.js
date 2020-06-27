import React from "react";
import MovieItem from "./MovieItem";

const MovieList = props => {
  const {
    movieslist,
    addMovieToWillWatch = f => f,
    removeMovieFromWillWatch = f => f,
    history
  } = props;
  return (
    <div className="row">
      {movieslist.map((item, i) => (
        <div className=" col-10 col-sm-10 col-md-4" key={item.id}>
          <MovieItem
            movie={item}
            addMovieToWillWatch={addMovieToWillWatch}
            removeMovieFromWillWatch={removeMovieFromWillWatch}
            history={history}
          />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
