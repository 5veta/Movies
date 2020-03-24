import React from "react";
import "./index.css";

const movie = {
  title: "Avengers: Infinity War",
  vote_average: 8.5,
  image: "https://image.tmdb.org/t/p/w500/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg",
  overview:
    "As the Avengers and their allies have continued to protect the world from threats"
};

function Image(props) {
  return <img width="100%" src={props.src} alt={props.alt} />;
}

// function MovieItem(props) {
//   console.log("props", props);
//   const { title, vote_average, image } = props;

//   return (
//     <div>
//       <Image src={image} alt={title} />
//       <p>{title}</p>
//       <p>{vote_average}</p>
//     </div>
//   );
// }

//синтаксический сахар создания экземпляра: MovieItem=new React.Component();
class MovieItem extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      like: false
    };
  }

  toggleOverview = () => {
    console.log("show");
    this.setState((state, props) => ({
      show: !state.show
    }));
  };

  handleLike = () => {
    console.log("show");
    this.setState({
      like: !this.state.like
    });
  };

  render() {
    const { title, vote_average, image, overview } = this.props;
    console.log(this.state);

    return (
      <div style={{ width: "300px" }}>
        <Image src={image} alt={title} />
        <p>{title}</p>
        <p>{vote_average}</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="button" onClick={this.toggleOverview}>
            {this.state.show ? "hide" : "show"}
          </button>
          <button
            type="button"
            onClick={this.handleLike}
            className={this.state.like ? "btn--like" : ""}
          >
            Like
          </button>
        </div>

        {this.state.show ? <p>{overview}</p> : null}
      </div>
    );
  }
}

export default function App() {
  return (
    <div>
      <MovieItem {...movie} />
    </div>
  );
}
