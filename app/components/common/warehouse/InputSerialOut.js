import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroup,
  InputGroupButtonDropdown,
} from 'reactstrap';
import classNames from 'classnames';
import { isArrayHasItem } from '../../../utils/util';
import SerialView from './SerialView';

const InputSerialOut = ({
  value,
  invalid,
  name,
  placeholder,
  onChange,
  onBlur,
}) => {
  const [state, setState] = useState([]);
  const [splitButtonOpen, setSplitButtonOpen] = useState(false);
  const input = React.useRef();

  useEffect(() => {
    setState(value);
  }, [value]);

  const toggleSplit = () => setSplitButtonOpen(prev => !prev);

  const onValueChange = useCallback(
    values => {
      setState(values);
      if (isFunction(onChange)) {
        onChange(values);
      }
    },
    [setState, onChange],
  );

  const handleKeyDown = useCallback(
    event => {
      console.log(event);
      const item = input.current.value;
      switch (event.key) {
        case 'Enter':
        case 'Tab':
          if (item && item.length > 0) {
            if (state.indexOf(item) < 0) {
              onValueChange([...state, item]);
            }

            input.current.value = '';
            event.preventDefault();
            event.stopPropagation();
          }

          break;
        default:
          break;
      }
    },
    [state, onValueChange],
  );

  return (
    <>
      <InputGroup className={classNames({ 'is-invalid': invalid })}>
        <input
          name={name}
          onBlur={onBlur}
          type="text"
          placeholder={
            placeholder || 'Key in and press Enter or Tab to input serial'
          }
          ref={input}
          onKeyDown={handleKeyDown}
          className="form-control"
        />
        <InputGroupButtonDropdown
          addonType="append"
          isOpen={splitButtonOpen}
          toggle={toggleSplit}
        >
          <Button type="button" color="primary">
            <i className="fa fa-barcode" />
          </Button>
          <DropdownToggle split color="primary" />
          <DropdownMenu>
            <DropdownItem
              disabled={!isArrayHasItem(state)}
              onClick={() => onValueChange([])}
            >
              <i className="fa fa-trash mr-2" /> Clear All
            </DropdownItem>
          </DropdownMenu>
        </InputGroupButtonDropdown>
      </InputGroup>
      <SerialView
        onRemove={i => {
          console.log(i);
          state.splice(i, 1);
          onValueChange([...state]);
        }}
        serials={state}
      />
    </>
  );
};

InputSerialOut.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default InputSerialOut;
