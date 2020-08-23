import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'reactstrap';

const MAX = 5;
const Pagination = ({ total, pageSize, currentPage, setPage, ...props }) => {
  let pages = [];
  const totalPages = Math.ceil(total / pageSize);

  let start = 0;
  let end = totalPages;

  pages.length = 0;
  for (let i = 1; i <= end; i += 1) {
    pages.push({ page: i });
  }

  if (totalPages > MAX) {
    const leftOffset = Math.floor(MAX / 2);
    const rightOffset = MAX % 2 === 0 ? leftOffset - 1 : leftOffset;

    if (currentPage <= leftOffset) {
      // very beginning, no rotation -> [0..maxSize]
      end = MAX;
    } else if (totalPages - currentPage < leftOffset) {
      // very end, no rotation -> [len-maxSize..len]
      start = totalPages - MAX;
    } else {
      // rotate
      start = currentPage - leftOffset - 1;
      end = currentPage + rightOffset;
    }

    pages = pages.slice(start, end);

    if (start > 0) {
      // The first page will always be included. If the displayed range
      // starts after the third page, then add ellipsis. But if the range
      // starts on the third page, then add the second page instead of
      // an ellipsis, because the ellipsis would only hide a single page.
      if (start > 2) {
        pages.unshift({ type: -1, page: start - 1 });
      } else if (start === 2) {
        pages.unshift({ page: 2 });
      }
      pages.unshift({ page: 1 });
    }
    if (end < totalPages) {
      // The last page will always be included. If the displayed range
      // ends before the third-last page, then add ellipsis. But if the range
      // ends on third-last page, then add the second-last page instead of
      // an ellipsis, because the ellipsis would only hide a single page.
      if (end < totalPages - 2) {
        pages.push({ type: -1, page: end + MAX });
      } else if (end === totalPages - 2) {
        pages.push({ page: totalPages - 1 });
      }
      pages.push({ page: totalPages });
    }
  }

  console.log('Pagination');

  return (
    <nav aria-label="Page navigation" {...props}>
      <ul className="pagination">
        {pages.map(item => (
          <li
            className={classNames('page-item', {
              active: item.page === currentPage,
            })}
            key={item.page}
          >
            {item.type === -1 ? (
              <Button color="link" className="page-link" href="#">
                ...
              </Button>
            ) : (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                className="page-link"
                href="#"
                onClick={() => setPage(item.page)}
              >
                {item.page}
              </a>
            )}
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
