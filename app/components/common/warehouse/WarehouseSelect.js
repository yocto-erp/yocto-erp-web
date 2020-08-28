import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup } from 'reactstrap';
import AsyncSelect from 'react-select/async';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import warehouseApi from '../../../libs/apis/warehouse.api';
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from '../../constants';

const formatOptionLabel = data => (
  <div className="text-white">
    <span>
      {data.name} - {data.address}
    </span>
  </div>
);

const WarehouseSelect = ({ control, invalid, name, placeholder, ...props }) => {
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
      <InputGroup
        className={classNames({ 'is-invalid': invalid })}
        style={props.checkStyle ? { width: '250px' } : {}}
      >
        <Controller
          control={control}
          name={name}
          {...props}
          render={({ onChange, onBlur, value, name: _name }) => (
            <AsyncSelect
              aria-labelledby="test"
              className="react-select-container"
              classNamePrefix="react-select"
              cacheOptions
              placeholder={placeholder}
              loadOptions={loadOptions1}
              defaultOptions
              styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
              isClearable
              onBlur={onBlur}
              onChange={val => {
                console.log(`OnChange: ${JSON.stringify(val)}`);
                onChange(val);
              }}
              formatOptionLabel={formatOptionLabel}
              getOptionValue={data => data.id}
              name={_name}
              value={value}
            />
          )}
        />
      </InputGroup>
    </>
  );
};

WarehouseSelect.propTypes = {
  control: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  checkStyle: PropTypes.bool,
};

export default WarehouseSelect;
