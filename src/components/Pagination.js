import React from "react";
import classNames from "classnames";

const Pagination = props => {
  const { page, max } = props.pages;
  const min = 1;
  const range = 9;

  const patsOfPagination = () => {
    let rest = max % range;
    let int = parseInt(max / range - rest, 10);
    return rest ? int + rest : int;
  };

  const getPageList = () => {
    let list = [];
    let item = 2;
    let first;
    let size = patsOfPagination();

    for (let i = 0; i <= size; i++) {
      for (let y = 0; y < range; y++) {
        if (y === 0) first = item;
        if ((page < first + range && page >= first) || page === 1) {
          list.push(item);
        }
        item++;
      }
      if (list.length) {
        return list;
      }
    }
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
          {page > range + 1 ? (
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

          {page + range < max ? (
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
