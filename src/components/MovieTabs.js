import React from "react";
import classNames from "classnames";

class MovieTabs extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.sort_by !== this.props.sort_by) {
      return true;
    }
    return false;
  }

  render() {
    //console.log("this.props.sort_by: " + this.props.sort_by);
    const { sort_by, updateSortBy } = this.props;
    let sort_arr = sort_by.split(".");

    const handleClick = event => {
      updateSortBy(event.target.value);
    };

    const getSortValue = value => {
      return sort_arr[0] === `${value}`
        ? sort_arr[1] === "asc"
          ? `${value}.asc`
          : `${value}.desc`
        : `${value}.desc`;
    };

    const getClassLink = value => {
      let sort = this.props.sort_by.replace(/^(\w+)\.(\w+)$/, "$1");
      //console.log("sort..." + sort);
      return classNames({
        "btn btn-light mr-2 active": sort === value,
        "btn btn-light mr-2": sort !== value
      });
    };

    const getTextValue = value => {
      let reg = new RegExp(value, "i");
      let val = value.split("_").join(" ");
      return reg.test(sort_arr[0])
        ? sort_arr[1] === "desc"
          ? `${val} desc`
          : `${val} asc`
        : `${val} desc`;
    };

    return (
      <ul className="tabs nav nav-pills">
        <li className="nav-item">
          <button
            className={getClassLink("popularity")}
            onClick={handleClick}
            value={getSortValue("popularity")}
          >
            {getTextValue("Popularity")}
          </button>
        </li>
        <li className="nav-item">
          <button
            className={getClassLink("revenue")}
            onClick={handleClick}
            value={getSortValue("revenue")}
          >
            {getTextValue("Revenue")}
          </button>
        </li>
        <li className="nav-item">
          <button
            className={getClassLink("vote_average")}
            onClick={handleClick}
            value={getSortValue("vote_average")}
          >
            {getTextValue("Vote_average")}
          </button>
        </li>
      </ul>
    );
  }
}

export default MovieTabs;
