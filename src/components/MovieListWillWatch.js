import React from "react";

const MovieListWillWatch = ({ wishlist, removeMovieFromWillWatch }) => {
  const handlerRemoveMovieFromWillWatch = movie => {
    console.log("hello");
    removeMovieFromWillWatch(movie);
    console.log(movie);
  };

  return (
    <div className="">
      <h2>Will Watch {wishlist.length}</h2>
      <ul className="list-group">
        {wishlist.length > 0
          ? wishlist.map((movie, i) => (
              <li
                key={movie.id}
                className="list-group-item row justify-content-center"
              >
                <div className="d-flex justify-content-between">
                  <div className="">{movie.title}</div>
                  <div className="">{movie.vote_average}</div>
                  <div
                    className=""
                    onClick={() => handlerRemoveMovieFromWillWatch(movie)}
                  >
                    x
                  </div>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default MovieListWillWatch;
