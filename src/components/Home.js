import React from "react";
import MovieList from "./MovieList";
import MovieListWillWatch from "./MovieListWillWatch";
import MovieTabs from "./MovieTabs";
import Pagination from "./Pagination";
import { API_URL, API_KEY_3 } from "../utils/api";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      pages: {
        page: 1,
        firstpage: 2,
        min: 1,
        max: 1,
        range: 9
      }
    };
    this.addMovieToWillWatch = this.addMovieToWillWatch.bind(this);
    this.removeMovie = this.removeMovie.bind(this);
    this.removeMovieFromWillWatch = this.removeMovieFromWillWatch.bind(this);
  }

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by) {
      this.getMovies();
    } else if (prevState.pages.page !== this.state.pages.page) {
      this.getMovies();
    }
  }

  getMovies = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${
        this.state.sort_by
      }&page=${this.state.pages.page}`
    )
      .then(response => response.json())
      .then(data =>
        this.setState({
          pages: { ...this.state.pages, max: data.total_pages },
          movies: data.results
        })
      )
      .catch(err => console.error("Error getting API data", err.stack));
  };

  addMovieToWillWatch(movie) {
    this.setState((prevState, props) => ({
      moviesWillWatch: [...prevState.moviesWillWatch, movie]
    }));
  }

  removeMovieFromWillWatch(movie) {
    this.setState((prevState, props) => ({
      moviesWillWatch: prevState.moviesWillWatch.filter(m => m.id !== movie.id)
    }));
  }

  removeMovie(id) {
    this.setState((prevState, props) => ({
      movies: prevState.movies.filter(m => m.id !== id)
    }));
  }

  updateSortBy = value => {
    let val_arr = value.split(".");
    let vl = val_arr[1] === "desc" ? `${val_arr[0]}.asc` : `${val_arr[0]}.desc`;

    this.setState({ sort_by: vl });
    return vl;
  };

  updatePage = value => {
    let first;
    let { min, max, range, firstpage } = this.state.pages;
    if (value >= min && value <= max && min !== max) {
      if (value === min) {
        first = min + 1;
      } else if (value === max) {
        first = max - range > min + 1 ? max - range : 0;
      } else {
        if (value > firstpage) {
          first = firstpage + range <= value ? firstpage + 9 : 0;
        } else if (value < firstpage) {
          first = firstpage - 9;
        } else {
          first = 0;
        }
      }
    }
    //console.log("first", first);
    first
      ? this.setState({
          pages: { ...this.state.pages, firstpage: first, page: value }
        })
      : this.setState({ pages: { ...this.state.pages, page: value } });
  };

  render() {
    return (
      <div className="mt-3">
        <div className="d-flex justify-content-center flex-row">
          <div className="mb-4 col-md-10">
            <Pagination pages={this.state.pages} updatePage={this.updatePage} />
          </div>
        </div>
        <div className="d-flex justify-content-center flex-row">
          <div className="mb-4 col-10">
            <MovieTabs
              sort_by={this.state.sort_by}
              updateSortBy={this.updateSortBy}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center flex-row">
          <div className="col-8 mr-2">
            <MovieList
              movieslist={this.state.movies}
              addMovieToWillWatch={this.addMovieToWillWatch}
              removeMovieFromWillWatch={this.removeMovieFromWillWatch}
              history={this.props.history}
            />
          </div>
          <div className="px-2 col-2">
            <MovieListWillWatch
              wishlist={this.state.moviesWillWatch}
              removeMovieFromWillWatch={this.removeMovieFromWillWatch}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
