import React from "react";
import MovieList from "./components/MovieList";
import MovieListWillWatch from "./components/MovieListWillWatch";
import MovieTabs from "./components/MovieTabs";
import Pagination from "./components/Pagination";
import { API_URL, API_KEY_3 } from "./utils/api";

class App extends React.Component {
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
    this.AddMovieToWillWatch = this.AddMovieToWillWatch.bind(this);
    this.removeMovie = this.removeMovie.bind(this);
    this.RemoveMovieFromWillWatch = this.RemoveMovieFromWillWatch.bind(this);
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
      ).catch(err=>console.error('Error getting API data', err.stack));
  };

  AddMovieToWillWatch(movie) {
    this.setState((prevState, props) => ({
      moviesWillWatch: [...prevState.moviesWillWatch, movie]
    }));
  }

  RemoveMovieFromWillWatch(movie) {
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
    let sort_arr = this.state.sort_by.split(".");
    let val_arr = value.split(".");
    let vl = value;

    if (sort_arr[0] === val_arr[0]) {
      vl = val_arr[1] === "desc" ? `${val_arr[0]}.asc` : `${val_arr[0]}.desc`;
    }
    this.setState({ sort_by: vl });
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
      <div className="d-flex justify-content-center flex-row mb-3">
        <div className="p-2 w-75">
          <div className="mb-4">
            <Pagination pages={this.state.pages} updatePage={this.updatePage} />
          </div>
          <div className="mb-4">
            <MovieTabs
              sort_by={this.state.sort_by}
              updateSortBy={this.updateSortBy}
            />
          </div>
          <MovieList
            movieslist={this.state.movies}
            AddMovieToWillWatch={this.AddMovieToWillWatch}
            RemoveMovieFromWillWatch={this.RemoveMovieFromWillWatch}
          />
        </div>
        <div className="p-2">
          <MovieListWillWatch wishlist={this.state.moviesWillWatch} />
        </div>
      </div>
    );
  }
}

export default App;
