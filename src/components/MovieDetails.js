import React, { useState, useEffect } from "react";
import { API_KEY_3 } from "../utils/api";
import MovieInfo from "./MovieInfo";
import Cast from "./Cast";
import Video from "./Video";

const MovieDetails = props => {
  const [movie, setMovie] = useState({ id: props.match.params.id });
  const [credits, setCredits] = useState({});
  const [video, setVideo] = useState({});

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY_3}`)
      .then(response => response.json())
      .then(data => {
        setMovie(data);
      })
      .catch(err =>
        console.error("Error getting details information", err.stack)
      );
  }, [movie]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        movie.id
      }/credits?api_key=${API_KEY_3}`
    )
      .then(response => response.json())
      .then(data => {
        setCredits(data);
      })
      .catch(err =>
        console.error("Error getting credits information", err.stack)
      );
  }, [credits]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        movie.id
      }/videos?api_key=${API_KEY_3}&language=en-US`
    )
      .then(response => response.json())
      .then(data => {
        setVideo(data.results[0]);
      })
      .catch(err =>
        console.error("Error getting video information", err.stack)
      );
  }, [video]);

  return (
    <div>
      <div className="d-flex flex-row justify-content-center bg-info my-4 text-white">
        <div className="card m-4 p-3 col-md-8 border-0 bg-info ">
          <MovieInfo movie={movie} />
        </div>
      </div>
      <div className="d-flex flex-row justify-content-center my-4 ">
        <div className="col-md-10 scroll">
          <Cast credits={credits} />
        </div>
      </div>
      <div className="d-flex flex-row justify-content-center my-4 ">
        <div className="col-8">
          <Video video={video} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
