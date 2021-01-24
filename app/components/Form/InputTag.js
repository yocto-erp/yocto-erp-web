import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../constants";

const createOption = label => ({
  label,
  value: label,
});

const components = {
  DropdownIndicator: null,
};

const InputTag = React.forwardRef((
  // eslint-disable-next-line no-unused-vars
  { value, invalid, onBlur, onChange, placeholder, isValidNewOption },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const [tagObject, setTagObject] = React.useState({
    inputValue: '',
    tags: [],
  });

  const { inputValue, tags } = tagObject;

  const handleInputChange = React.useCallback(
    (_value, actionMeta) => {
      setTagObject({
        ...tagObject,
        inputValue: _value,
      });
    },
    [setTagObject],
  );

  const handleKeyDown = React.useCallback(
    event => {
      if (!inputValue) return;
      // eslint-disable-next-line default-case
      switch (event.key) {
        case 'Enter':
        case 'Tab': {
          if (isValidNewOption(inputValue)) {
            const newTags = [...tags, createOption(inputValue)];
            setTagObject({
              inputValue: '',
              tags: newTags,
            });
            onChange(newTags);
          } else {
            console.log('Invalid', inputValue);
          }
          event.preventDefault();
        }
      }
    },
    [inputValue, tags],
  );

  useEffect(() => {
    if (value !== tags) {
      setTagObject({
        ...tagObject,
        tags: value || [],
      });
    }
  }, [value, tags]);

  return (
    <CreatableSelect
      isValidNewOption={isValidNewOption}
      components={components}
      inputValue={inputValue}
      styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
      className="react-select-container"
      classNamePrefix="react-select"
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={onChange}
      onBlur={onBlur}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder || 'Type something and press enter...'}
      value={tags}
    />
  );
});

InputTag.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  isValidNewOption: PropTypes.func,
};

export default InputTag;
