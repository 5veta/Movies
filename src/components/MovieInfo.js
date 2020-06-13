import React from "react";

const MovieInfo = props => {
  let year = props.movie.release_date
    ? props.movie.release_date.split("-")[0]
    : null;
  return (
    <div className="row no-gutters">
      <div className="m-md-4">
        <img
          src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`}
          className="card-img border rounded"
          alt="..."
        />
      </div>
      <div className="col-md-7 mx-md-4">
        <div className="card-body">
          <div>
            <h1 className="card-title">
              <b>{props.movie.title}</b>
              <span> ({year})</span>
            </h1>
            <p>
              {props.movie.genres
                ? props.movie.genres.map(obj => (
                    <span key={obj.id}>{obj.name}, </span>
                  ))
                : null}

              <span> {props.movie.runtime} min</span>
            </p>
            <p>
              <span>Languages: </span>
              {props.movie.genres
                ? props.movie.spoken_languages.map((obj, i) => (
                    <span key={i}>{obj.name} </span>
                  ))
                : null}
            </p>
            <p>
              <span>Countries: </span>
              {props.movie.production_countries
                ? props.movie.production_countries.map((obj, i) => (
                    <span key={i}>{obj.name} </span>
                  ))
                : null}
            </p>

            <p>
              <span>Vote average: </span>
              {props.movie.vote_average}
            </p>
          </div>
          <h3 className="card-title">Overview</h3>
          <p className="card-text">{props.movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
