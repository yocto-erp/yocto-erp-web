import React from 'react';
import PropTypes from 'prop-types';
import { CustomInput, InputGroup } from 'reactstrap';
import classNames from 'classnames';

const TypeSelect = React.forwardRef(
  (
    {
      onChange,
      value,
      onBlur,
      invalid,
      name,
      placeholder,
      id,
      isShow = true,
      options,
    },
    ref,
  ) => {
    const onChangeHandle = React.useCallback(
      event => {
        const idSelect = event.target.value;
        if (idSelect) {
          const object = options.find(t => t.id === Number(event.target.value));
          onChange(object.id);
        } else {
          onChange('');
        }
      },
      [onChange, options],
    );

    return (
      <>
        <InputGroup className={classNames({ 'is-invalid': invalid })}>
          <CustomInput
            key={id}
            id={id}
            type="select"
            name={name}
            onChange={onChangeHandle}
            onBlur={onBlur}
            value={value}
          >
            {isShow ? <option value="">{placeholder}</option> : ''}
            {options.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </CustomInput>
        </InputGroup>
      </>
    );
  },
);

TypeSelect.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.any,
  options: PropTypes.array,
  isShow: PropTypes.bool,
};

export default TypeSelect;
