import React from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import warehouseApi from '../../../libs/apis/warehouse.api';
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from '../../constants';

const formatOptionLabel = data =>
  data ? (
    <div className="">
      <span>
        {data.name} - {data.address}
      </span>
    </div>
  ) : (
    ''
  );

const WarehouseSelect = ({
  value,
  onChange,
  onBlur,
  invalid,
  name,
  placeholder,
  ...props
}) => {
  console.log(props);
  const loadOptions1 = debounce((inputValue, cb) => {
    warehouseApi
      .search({
        page: 1,
        size: 10,
        filter: {
          name: inputValue,
        },
      })
      .then(resp => cb(resp.rows));
  }, 300);

  return (
    <>
      <AsyncSelect
        {...props}
        className={classNames('react-select-container', {
          'is-invalid': invalid,
        })}
        defaultOptions
        classNamePrefix="react-select"
        placeholder={placeholder}
        loadOptions={loadOptions1}
        styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
        isClearable
        onBlur={onBlur}
        onChange={onChange}
        formatOptionLabel={formatOptionLabel}
        getOptionValue={data => data.id}
        name={name}
        value={value}
      />
    </>
  );
};

WarehouseSelect.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

export default WarehouseSelect;
