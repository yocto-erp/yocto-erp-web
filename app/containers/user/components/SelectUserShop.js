import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import useUserShop from "../../../libs/hooks/swr/useUserShop";
import Select from "../../../components/common/Select";

const formatOptionLabel = data => (
  <div className="text-white">
    <span>{data.name}</span>
  </div>
);
const SelectUserShop = React.forwardRef((
  {
    onBlur,
    invalid,
    name,
    placeholder,
    onFocus,
    onChange,
    value,
    disabled = false,
    isClearable = true,
    ...props
  },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const { shop } = useUserShop();

  return (
    <div className={classNames({ "is-invalid": invalid })} {...props}>
      <Select
        options={shop || []}
        onChange={onChange}
        formatOptionLabel={formatOptionLabel}
        getOptionValue={data => data.id}
        isDisabled={disabled}
        isClearable={isClearable}
        name={name}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        innerRef={ref}
        value={value}
      />
    </div>
  );
});

SelectUserShop.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  creatable: PropTypes.bool,
  onFocus: PropTypes.func,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  isClearable: PropTypes.bool,
};

export default SelectUserShop;
