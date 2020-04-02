import React from "react";
import classNames from "classnames";

const Pagination = props => {
  const { page, min, max, range, firstpage } = props.pages;
  let arr = [];
  //console.log(props.pages);

  for (let i = firstpage; i < firstpage + range; i++) {
    arr.push(i);
  }

  const hendlerClick = value => () => {
    if (value > max) {
      value = max;
    } else if (value < min) {
      value = min;
    }

    props.updatePage(value);
  };

  const hendlerClassValue = value => {
    return classNames({
      "page-item active": page === value,
      "page-item": page !== value && value !== "next" && value !== "prev",
      "page-item disabled": value === "prev" && page === 1,
      "page-item m-0": value === "prev" && page > 1,
      "page-item disabled m-0": value === "next" && page === max,
      "page-item mb-0": value === "next" && page < max
    });
  };

  return (
    <nav aria-label="Page navigation example">
      {min !== max ? (
        <ul className="pagination">
          <li className={hendlerClassValue("prev")}>
            <div className="page-link" onClick={hendlerClick(page - 1)}>
              Previous
            </div>
          </li>
          <li className={hendlerClassValue(1)}>
            <div className="page-link" onClick={hendlerClick(1)}>
              1
            </div>
          </li>
          {firstpage > 2 ? (
            <li className="page-item">
              <div className="page-link">...</div>
            </li>
          ) : null}
          {arr
            .filter(fv => fv < max)
            .map((v, i) => (
              <li className={hendlerClassValue(v)} key={v}>
                <div className="page-link" onClick={hendlerClick(v)}>
                  {v}
                </div>
              </li>
            ))}

          {firstpage + range < max ? (
            <li className="page-item">
              <div className="page-link">...</div>
            </li>
          ) : null}
          <li className={hendlerClassValue(max)}>
            <div className="page-link" onClick={hendlerClick(max)}>
              {max}
            </div>
          </li>
          <li className={hendlerClassValue("next")}>
            <div className="page-link" onClick={hendlerClick(page + 1)}>
              Next
            </div>
          </li>
        </ul>
      ) : null}
    </nav>
  );
};

export default Pagination;
