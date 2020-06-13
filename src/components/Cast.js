import React from "react";

const Cast = props => {
  return (
    <ul className="list-group list-group-horizontal">
      {props.credits.crew
        ? props.credits.cast.map(obj => (
            <li className="list-group-item border-0 text-center" key={obj.id}>
              <img
                className="cast-photo rounded"
                src={`https://image.tmdb.org/t/p/w500${obj.profile_path}`}
                alt={obj.name}
              />
              <b>{obj.name}</b>
            </li>
          ))
        : null}
    </ul>
  );
};

export default Cast;
