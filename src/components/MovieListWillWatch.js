import React from "react";

const MovieListWillWatch = ({ wishlist }) => {
  return (
    <div className="">
      <h5>Will Watch {wishlist.length}</h5>
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
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default MovieListWillWatch;
