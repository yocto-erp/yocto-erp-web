import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isArrayHasItem, isFunc } from '../../../utils/util';
import './input-serial.scss';

const SerialView = ({ serials, onRemove }) =>
  isArrayHasItem(serials) ? (
    <ul className="list-inline serial-wrapper">
      {serials.map((t, i) => (
        <li
          className={classNames('list-inline-item', {
            clearable: isFunc(onRemove),
          })}
          key={t}
        >
          <button
            type="button"
            className="btn btn-link"
            onClick={() => {
              if (isFunc(onRemove)) {
                onRemove(i);
              }
            }}
          >
            <span className="badge badge-info">{t}</span>
          </button>
        </li>
      ))}
    </ul>
  ) : (
    ''
  );

SerialView.propTypes = {
  serials: PropTypes.array,
  onRemove: PropTypes.func,
};

export default SerialView;
