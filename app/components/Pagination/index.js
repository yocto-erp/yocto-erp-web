import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MAX = 5;
const Pagination = ({ total, pageSize, currentPage, setPage, ...props }) => {
  const arr = [];
  const totalPages = Math.ceil(total / pageSize);

  let startAt = currentPage - Math.floor(MAX / 2);
  const isPositive = () => Math.sign(startAt);
  if (isPositive() === -1 || isPositive() === 0) startAt = 1;
  const max = MAX > totalPages ? totalPages : MAX;
  for (let i = 0; i < max; i += 1) {
    arr.push({
      page: startAt + i,
      text: startAt + i,
    });
  }
  return (
    <nav aria-label="Page navigation" {...props}>
      <ul className="pagination">
        {arr.map(item => (
          <li
            className={classNames('page-item', {
              active: item.page === currentPage,
            })}
            key={item.page}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => setPage(item.page)}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  total: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  setPage: PropTypes.func,
};

export default Pagination;
