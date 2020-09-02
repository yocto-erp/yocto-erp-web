import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, InputGroupAddon } from 'reactstrap';
import AsyncSelect from 'react-select/async';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from '../../constants';
import companyApi from '../../../libs/apis/company.api';
import CompanyModalForm from './CompanyModalForm';

const formatOptionLabel = data => (
  <div className="text-white">
    <span>
      {data.name} - {data.gsm}
    </span>
  </div>
);

const CompanySelect = ({
  onBlur,
  invalid,
  name,
  placeholder,
  onAdded,
  onChange,
  value,
  creatable = true,
  ...props
}) => {
  const [isOpen, open] = useState(false);
  const loadOptions1 = debounce((inputValue, cb) => {
    companyApi
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
      <InputGroup className={classNames({ 'is-invalid': invalid })} {...props}>
        <AsyncSelect
          aria-labelledby="test"
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder={placeholder}
          loadOptions={loadOptions1}
          defaultOptions
          styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
          isClearable
          onBlur={onBlur}
          onChange={onChange}
          formatOptionLabel={formatOptionLabel}
          getOptionValue={data => data.id}
          name={name}
          value={value}
        />
        {creatable ? (
          <InputGroupAddon addonType="append">
            <Button color="primary" type="button" onClick={() => open(true)}>
              <i className="las la-plus" />
            </Button>
          </InputGroupAddon>
        ) : (
          ''
        )}
      </InputGroup>
      {creatable ? (
        <CompanyModalForm
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
    </>
  );
};

CompanySelect.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  creatable: PropTypes.bool,
};

export default CompanySelect;
