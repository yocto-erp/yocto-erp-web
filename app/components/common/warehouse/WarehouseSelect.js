import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CustomInput, InputGroup } from 'reactstrap';
import classNames from 'classnames';
import warehouseApi from '../../../libs/apis/warehouse.api';

const WarehouseSelect = React.forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ onChange, value, onBlur, invalid, id, placeholder }, ref) => {
    const [options, setOptions] = useState([]);
    const request = React.useRef(0);
    useEffect(() => {
      request.current += 1;
      let currentRequest = request.current;
      warehouseApi
        .search({
          page: 1,
          size: 1000,
        })
        .then(data => {
          if (currentRequest === request.current) {
            setOptions(data.rows);
          }
        });
      return () => {
        currentRequest = 0;
      };
    }, []);

    const onChangeHandle = React.useCallback(
      event => {
        console.log(event.target.value);
        const idSelect = Number(event.target.value);
        if (idSelect > 0) {
          onChange(options.find(t => t.id === idSelect));
        } else {
          onChange(null);
        }
      },
      [onChange, options],
    );

    return (
      <InputGroup className={classNames({ 'is-invalid': invalid })}>
        <CustomInput
          id={id}
          type="select"
          onChange={onChangeHandle}
          onBlur={onBlur}
          value={value && value.id ? value.id : value || '0'}
        >
          <option value="0">{placeholder}</option>
          {options.map(t => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </CustomInput>
      </InputGroup>
    );
  },
);
WarehouseSelect.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  invalid: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.any,
};

export default WarehouseSelect;
