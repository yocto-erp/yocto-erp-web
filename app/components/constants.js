export const REACT_SELECT_OPTION_CUSTOM_STYLE = {
  option: (provided, state) => {
    let color = '#1870DC';
    let background = 'transparent';
    if (state.isDisabled) {
      color = '#798892';
    } else if (state.isFocused || state.isSelected) {
      color = 'white';
      background = '#1870DC';
    }
    return {
      ...provided,
      color,
      backgroundColor: background,
    };
  },
};
