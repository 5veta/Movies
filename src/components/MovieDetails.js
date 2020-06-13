import React from "react";
import { API_KEY_3 } from "../utils/api";
import MovieInfo from "./MovieInfo";
import Cast from "./Cast";
import Video from "./Video";

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: { id: props.match.params.id },
      credits: {},
      video: {}
    };
  }

  componentDidMount() {
    this.getMovieDetails();
  }

  getMovieDetails = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        this.state.movie.id
      }?api_key=${API_KEY_3}`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ movie: data });
      })
      .catch(err =>
        console.error("Error getting details information", err.stack)
      );
    fetch(
      `https://api.themoviedb.org/3/movie/${
        this.state.movie.id
      }/credits?api_key=${API_KEY_3}`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ credits: data });
      })
      .catch(err =>
        console.error("Error getting details information", err.stack)
      );
    fetch(
      `https://api.themoviedb.org/3/movie/${
        this.state.movie.id
      }/videos?api_key=${API_KEY_3}&language=en-US`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ video: data.results[0] });
      })
      .catch(err =>
        console.error("Error getting details information", err.stack)
      );
  };

  render() {
    return (
      <div>
        <div className="d-flex flex-row justify-content-center bg-info my-4 text-white">
          <div className="card m-4 p-3 col-md-8 border-0 bg-info ">
            <MovieInfo movie={this.state.movie} />
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center my-4 ">
          <div className="col-md-10 scroll">
            <Cast credits={this.state.credits} />
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center my-4 ">
          <div className="col-8">
            <Video video={this.state.video} />
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
