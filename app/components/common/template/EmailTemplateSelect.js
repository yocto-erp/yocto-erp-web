import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup } from 'reactstrap';
import AsyncSelect from 'react-select/async';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from '../../constants';
import { templateEmailApi } from '../../../libs/apis/template/template.api';

const formatOptionLabel = data => (
  <div className="text-white">
    <span>{data.template ? data.template.name : ''}</span>
  </div>
);

const EmailTemplateSelect = React.forwardRef((
  {
    onBlur,
    invalid,
    name,
    placeholder,
    onAdded,
    onChange,
    value,
    type,
    ...props
  },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const loadOptions = debounce((inputValue, cb) => {
    templateEmailApi
      .search({
        page: 1,
        size: 10,
        filter: {
          search: inputValue,
          typeId: type,
        },
      })
      .then(resp => cb(resp.rows));
  }, 300);
  return (
    <>
      <InputGroup className={classNames({ 'is-invalid': invalid })} {...props}>
        <AsyncSelect
          aria-labelledby="Email Template Select"
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder={placeholder}
          defaultOptions
          noOptionsMessage={({ inputValue }) =>
            inputValue
              ? `Not found any Email Template with search "${inputValue}", try to search another`
              : 'Input and search Email Template'
          }
          loadOptions={loadOptions}
          styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
          isClearable
          onBlur={onBlur}
          onChange={onChange}
          formatOptionLabel={formatOptionLabel}
          getOptionValue={data => data.templateId}
          name={name}
          value={value}
        />
      </InputGroup>
    </>
  );
});

EmailTemplateSelect.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.number,
};

export default EmailTemplateSelect;
