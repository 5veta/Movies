import React from "react";
import { API_KEY_3 } from "../utils/api";

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
    console.log(this.state.video);
    let year = this.state.movie.release_date
      ? this.state.movie.release_date.split("-")[0]
      : null;
    return (
      <div>
        <div className="d-flex flex-row justify-content-center bg-info my-4 text-white">
          <div className="card m-4 p-3 col-8 border-0 bg-info ">
            <div className="row no-gutters">
              <div className="">
                <img
                  src={`https://image.tmdb.org/t/p/w500${
                    this.state.movie.poster_path
                  }`}
                  className="card-img border rounded"
                  alt="..."
                />
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <div>
                    <h1 className="card-title">
                      <b>{this.state.movie.title}</b>
                      <span> ({year})</span>
                    </h1>
                    <p>
                      {this.state.movie.genres
                        ? this.state.movie.genres.map(obj => (
                            <span key={obj.id}>{obj.name}, </span>
                          ))
                        : null}

                      <span> {this.state.movie.runtime} min</span>
                    </p>
                    <p>
                      <span>Languages: </span>
                      {this.state.movie.genres
                        ? this.state.movie.spoken_languages.map((obj, i) => (
                            <span key={i}>{obj.name} </span>
                          ))
                        : null}
                    </p>
                    <p>
                      <span>Countries: </span>
                      {this.state.movie.production_countries
                        ? this.state.movie.production_countries.map(
                            (obj, i) => <span key={i}>{obj.name} </span>
                          )
                        : null}
                    </p>

                    <p>
                      <span>Vote average: </span>
                      {this.state.movie.vote_average}
                    </p>
                  </div>
                  <h3 className="card-title">Overview</h3>
                  <p className="card-text">{this.state.movie.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center my-4 ">
          <div className="col-8 scroll">
            <ul class="list-group list-group-horizontal">
              {this.state.credits.crew
                ? this.state.credits.cast.map(obj => (
                    <li
                      className="list-group-item border-0 text-center"
                      key={obj.id}
                    >
                      <img
                        className="cast-photo rounded"
                        src={`https://image.tmdb.org/t/p/w500${
                          obj.profile_path
                        }`}
                        alt={obj.name}
                      />
                      <b>{obj.name}</b>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center my-4 ">
          <div className="col-8">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                className="embed-responsive-item"
                src={`https://www.youtube.com/embed/${this.state.video.key}`}
                allowFullScreen
                title={this.state.video.id}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
