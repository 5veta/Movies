import React from "react";
import classNames from "classnames";

class MovieItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      willWatch: false
    };
    this.handleMovieForWatchList = this.handleMovieForWatchList.bind(this);
  }

  getClassValue = value => {
    return classNames({
      "col btn btn-info": this.state.willWatch,
      "col btn btn-secondary": !this.state.willWatch
    });
  };

  handleMovieForWatchList() {
    this.state.willWatch
      ? this.props.RemoveMovieFromWillWatch(this.props.movie)
      : this.props.AddMovieToWillWatch(this.props.movie);
    this.setState({ willWatch: !this.state.willWatch });
  }

  render() {
    const { movie } = this.props;
    return (
      <div className="card mb-4" style={{ width: "300px", height: "300px" }}>
        <img
          style={{ width: "300px", height: "165px" }}
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path ||
            movie.poster_path}`}
          alt={movie.title}
        />
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
        </div>

        <div className="card-footer bg-0">
          <div className="row">
            <p className="col card-text">{movie.vote_average}</p>
            <button
              type="button"
              className={this.getClassValue()}
              onClick={this.handleMovieForWatchList}
            >
              {this.state.willWatch ? "Will Not Watch" : "Will Watch"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}


export default MovieItem;
