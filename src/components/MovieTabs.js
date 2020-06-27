import React from "react";
import classNames from "classnames";

class MovieTabs extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getClassLink = this.getClassLink.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.sort_by !== this.props.sort_by) {
      return true;
    }
    return false;
  }

  handleClick = event => {
    let sortby = this.props.updateSortBy(
      event.target.innerHTML.toLowerCase().replace(/\s/, ".")
    );
    event.target.innerHTML = sortby.replace(/\./, " ");
  };

  getClassLink = value => {
    let sort = this.props.sort_by.split(".");
    return classNames({
      "btn btn-light mr-2 active": sort[0] === value,
      "btn btn-light mr-2": sort[0] !== value
    });
  };

  render() {
    return (
      <ul className="tabs nav nav-pills">
        <li className="nav-item">
          <button
            className={this.getClassLink("popularity")}
            onClick={this.handleClick}
          >
            popularity desc
          </button>
        </li>
        <li className="nav-item">
          <button
            className={this.getClassLink("revenue")}
            onClick={this.handleClick}
          >
            revenue desc
          </button>
        </li>
        <li className="nav-item">
          <button
            className={this.getClassLink("vote_average")}
            onClick={this.handleClick}
          >
            votes desc
          </button>
        </li>
      </ul>
    );
  }
}

export default MovieTabs;
