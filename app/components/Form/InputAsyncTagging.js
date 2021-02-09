import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AsyncCreatableSelect from 'react-select/async-creatable';
import chroma from 'chroma-js';
import classNames from 'classnames';
import TaggingForm from './tagging/TaggingForm';
import { mappingServerTagging } from '../constants';

const components = {
  DropdownIndicator: null,
};

const DEFAULT_TEXT_COLOR = '#ffffff';
const DEFAULT_BACKGROUND_COLOR = '#040620';

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color || DEFAULT_TEXT_COLOR);
    let backgroundColor = null;
    let textColor = data.color;
    if (isDisabled) {
      backgroundColor = null;
      textColor = '#ccc';
    } else if (isSelected) {
      backgroundColor = data.color;
      textColor = chroma.contrast(color, 'white') > 2 ? 'white' : 'black';
    } else if (isFocused) {
      backgroundColor = color.alpha(0.1).css();
    }
    return {
      ...styles,
      backgroundColor,
      color: textColor,
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color || DEFAULT_TEXT_COLOR);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color || DEFAULT_TEXT_COLOR,
  }),
  multiValueRemove: (styles, { data }) => {
    if (data && data.color) {
      return {
        ...styles,
        color: data.color || DEFAULT_TEXT_COLOR,
        ':hover': {
          backgroundColor: data.color || DEFAULT_BACKGROUND_COLOR,
          color: 'white',
        },
      };
    }
    return styles;
  },
};

const InputAsyncTagging = React.forwardRef(
  ({ value, invalid, placeholder, onChange, onBlur, loadOptionApi }, ref) => {
    const [newLabel, setNewLabel] = useState(null);

    const loadOptions = inputValue =>
      loadOptionApi({ filter: { search: inputValue }, page: 1, size: 10 }).then(
        t => t.rows.map(mappingServerTagging),
      );

    const handleChange = newValue => {
      onChange(newValue);
    };

    const handleCreate = inputValue => {
      setNewLabel({
        id: null,
        label: inputValue,
        color: DEFAULT_TEXT_COLOR,
      });
    };

    return (
      <>
        <AsyncCreatableSelect
          className={classNames('react-select-container react-select-tagging', {
            'is-invalid': invalid,
          })}
          classNamePrefix="react-select"
          components={components}
          styles={colourStyles}
          defaultOptions
          loadOptions={loadOptions}
          isClearable
          onBlur={onBlur}
          isMulti
          onChange={handleChange}
          placeholder={placeholder || 'Search and select labels'}
          onCreateOption={handleCreate}
          value={value}
        />
        <TaggingForm
          onClose={data => {
            setNewLabel(null);
            if (data) {
              onChange([...(value || []), mappingServerTagging(data)]);
            }
          }}
          initForm={newLabel}
        />
      </>
    );
  },
);

InputAsyncTagging.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  loadOptionApi: PropTypes.func,
};

export default InputAsyncTagging;
