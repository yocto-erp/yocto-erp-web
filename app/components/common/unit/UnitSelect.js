import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, CustomInput, InputGroup, InputGroupAddon } from 'reactstrap';
import classNames from 'classnames';
import productApi from '../../../libs/apis/product/product.api';
import UnitModalForm from './UnitModalForm';
import FormHookErrorMessage from '../../Form/FormHookErrorMessage';

const UnitSelect = React.forwardRef((
  { onChange, value, onBlur, error, name, placeholder, onAdded, productId, id },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const [isOpen, open] = useState(false);
  const [options, setOptions] = useState([]);
  const request = React.useRef(0);
  useEffect(() => {
    request.current += 1;
    let currentRequest = request.current;
    if (productId) {
      productApi.read(productId).then(data => {
        if (currentRequest === request.current) {
          setOptions(data.units);
          if (data.units.length) {
            onChange(data.units[0]);
          }
        }
      });
    } else {
      setOptions([]);
      onChange(null);
    }
    return () => {
      currentRequest = 0;
    };
  }, [productId]);

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
    <>
      <InputGroup className={classNames({ 'is-invalid': !!error })}>
        <CustomInput
          id={id}
          type="select"
          name={name}
          onChange={onChangeHandle}
          onBlur={onBlur}
          disabled={!productId}
          value={value ? value.id : '0'}
        >
          <option value="">{placeholder || 'Select Unit'}</option>
          {options.map(t => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </CustomInput>
        <InputGroupAddon addonType="append">
          <Button
            color="primary"
            type="button"
            disabled={!productId}
            onClick={() => open(true)}
          >
            <i className="las la-plus" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <FormHookErrorMessage error={error} />
      {productId ? (
        <UnitModalForm
          closeHandle={val => {
            if (val && onAdded) {
              productApi.read(productId).then(data => {
                setOptions(data.units);
              });
              onAdded(val);
            }
            open(false);
          }}
          isOpen={isOpen}
          productId={productId}
        />
      ) : (
        ''
      )}
    </>
  );
});
UnitSelect.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.object,
  productId: PropTypes.any,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.any,
};

export default UnitSelect;
