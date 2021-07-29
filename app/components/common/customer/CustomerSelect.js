import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, InputGroupAddon } from 'reactstrap';
import AsyncSelect from 'react-select/async';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from '../../constants';
import personApi from '../../../libs/apis/person.api';
import CustomerModalForm from './CustomerModalForm';

const formatOptionLabel = data => (
  <div className="text-white">
    <span>{data.name ? data.name : `${data.firstName} ${data.lastName}`}</span>
  </div>
);

const CustomerSelect = React.forwardRef((
  {
    onBlur,
    invalid,
    name,
    placeholder,
    onAdded,
    onChange,
    value,
    creatable = true,
    ...props
  },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const [isOpen, open] = useState(false);
  const loadOptions = debounce((inputValue, cb) => {
    personApi
      .search({
        page: 1,
        size: 10,
        filter: {
          search: inputValue,
        },
      })
      .then(resp => cb(resp.rows));
  }, 300);
  return (
    <div key={`${name}`}>
      <InputGroup className={classNames({ 'is-invalid': invalid })} {...props}>
        <AsyncSelect
          aria-labelledby="test"
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder={placeholder}
          noOptionsMessage={({ inputValue }) =>
            inputValue
              ? `Not found any Person with search "${inputValue}", try to search another`
              : 'Input and search Person'
          }
          loadOptions={loadOptions}
          defaultOptions
          styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
          isClearable
          onBlur={onBlur}
          onChange={val =>
            onChange(val ? { id: val.id, name: val.name } : null)
          }
          formatOptionLabel={formatOptionLabel}
          getOptionValue={data => data.id}
          name={name}
          value={value}
        />
        {creatable ? (
          <InputGroupAddon addonType="append">
            <Button
              color="primary"
              type="button"
              className="pt-0 pb-0"
              onClick={() => open(true)}
            >
              <i className="las la-plus" />
            </Button>
          </InputGroupAddon>
        ) : (
          ''
        )}
      </InputGroup>
      {creatable ? (
        <CustomerModalForm
          closeHandle={val => {
            if (val && onAdded) {
              onAdded(val);
            }
            open(false);
          }}
          isOpen={isOpen}
        />
      ) : (
        ''
      )}
    </div>
  );
});

CustomerSelect.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  creatable: PropTypes.bool,
};

export default CustomerSelect;
