export const DEFAULT_TEXT_COLOR = "#ffffff";
export const DEFAULT_BACKGROUND_COLOR = "#040620";

export const REACT_SELECT_OPTION_CUSTOM_STYLE = {
  option: (provided, state) => {
    let color = "white";
    let background = DEFAULT_BACKGROUND_COLOR;
    if (state.isDisabled) {
      color = "#798892";
    } else if (state.isFocused || state.isSelected) {
      background = "#1870DC";
    }
    return {
      ...provided,
      color,
      backgroundColor: background,
    };
  },
  multiValue: styles => ({
    ...styles,
    backgroundColor: "#1870DC",
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color || DEFAULT_TEXT_COLOR,
  }),
  menu: provided => ({
    ...provided,
    "background-color": DEFAULT_BACKGROUND_COLOR,
    border: "1px solid #1870DC",
  }),
  menuList: provided => ({
    ...provided,
    "background-color": DEFAULT_BACKGROUND_COLOR,
    "border-radius": "4px",
  }),
  menuPortal: provided => ({
    ...provided,
    container: {
      background: DEFAULT_BACKGROUND_COLOR,
    },
  }),
};

export const EDITOR_TYPE = {
  NORMAL: 1,
  EMAIL: 2,
  COMMENT: 3,
};

export const mappingServerTagging = item => ({
  ...item,
  value: item.id,
});
