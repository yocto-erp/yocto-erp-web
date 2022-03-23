import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, InputGroup, InputGroupAddon } from "reactstrap";
import AsyncSelect from "react-select/async";
import classNames from "classnames";
import debounce from "lodash/debounce";
import ProductModalForm from "./ProductModalForm";
import productApi from "../../../libs/apis/product/product.api";
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../../constants";
import FormHookErrorMessage from "../../Form/FormHookErrorMessage";

const formatOptionLabel = data => (
  <div className="text-white">
    <span>{data.name}</span>
  </div>
);

const ProductSelect = React.forwardRef((
  {
    onBlur,
    error,
    name,
    placeholder,
    onAdded,
    onChange,
    value,
    creatable = true,
    ...props
  },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const [isOpen, open] = useState(false);
  const [lastId, setLastId] = useState("");
  const loadOptions1 = debounce((inputValue, cb) => {
    productApi
      .search({
        page: 1,
        size: 10,
        filter: {
          search: inputValue,
        },
      })
      .then(resp => cb(resp.rows));
  }, 300);

  return (
    <div key={`${name}_${lastId}`}>
      <InputGroup className={classNames({ "is-invalid": !!error })} {...props}>
        <AsyncSelect
          aria-labelledby="test"
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder={placeholder || "Search Product"}
          noOptionsMessage={({ inputValue }) =>
            inputValue
              ? `Not found any Product with search "${inputValue}", try to search another`
              : "Input and search product"
          }
          loadOptions={loadOptions1}
          styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
          isClearable
          defaultOptions
          onBlur={onBlur}
          onChange={val =>
            onChange(val ? { id: val.id, name: val.name } : null)
          }
          formatOptionLabel={formatOptionLabel}
          getOptionValue={data => data.id}
          name={name}
          value={value}
        />
        {creatable ? (
          <InputGroupAddon addonType="append">
            <Button color="primary" type="button" onClick={() => open(true)}>
              <i className="las la-plus" />
            </Button>
          </InputGroupAddon>
        ) : (
          ""
        )}
      </InputGroup>
      <FormHookErrorMessage error={error} />
      {creatable ? (
        <ProductModalForm
          closeHandle={val => {
            console.log(val);
            if (val) {
              setLastId(val.id);
              if (onAdded) {
                onAdded(val);
              }
            }
            open(false);
          }}
          isOpen={isOpen}
        />
      ) : (
        ""
      )}
    </div>
  );
});

ProductSelect.propTypes = {
  value: PropTypes.any,
  error: PropTypes.object,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  creatable: PropTypes.bool,
};

export default ProductSelect;
