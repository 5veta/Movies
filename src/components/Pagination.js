import React from "react";
import classNames from "classnames";

const Pagination = props => {
  const { page, min, max, range, firstpage } = props.pages;

  const getPageList = () => {
    let arr = [];
    for (let i = firstpage; i < firstpage + range; i++) {
      arr.push(i);
    }
    return arr;
  };

  const getPage = value => {
    if (value > max) {
      return max;
    } else if (value < min) {
      return min;
    }
    return value;
  };

  const hendlerClick = value => () => {
    const page = getPage(value);
    props.updatePage(page);
  };

  const hendlerClassValue = value => {
    return classNames({
      "page-item active": page === value,
      "page-item": page !== value,
      "page-item disabled":
        (value === "next" && page === max && page !== 1) ||
        (value === "prev" && page === 1 && page !== max)
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
          {getPageList()
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
