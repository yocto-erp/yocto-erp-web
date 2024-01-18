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
import { thumbnail } from "../../../libs/apis/image.api";
import noImage from "../../../images/No_image_available.svg";
import { hasText } from "../../../utils/util";

const formatOptionLabel = (item, { context }) => (
  <div className="media">
    {context === "menu" && (
      <img
        role="presentation"
        src={item.thumbnail ? thumbnail(item.thumbnail) : noImage}
        style={{ width: 48, height: 48, cursor: "pointer" }}
        title="Click to view all image"
        className="mr-3"
        alt="..."
      />
    )}
    <div className="media-body">
      {hasText(item.productDocumentId) && (
        <p className="mt-0 mb-0 font-weight-bold">{item.productDocumentId}</p>
      )}
      <p className="mt-0 mb-0">{item.name}</p>
    </div>
  </div>
);

export const searchMappingProduct = val => ({ id: val.id, name: val.name });
/**
 * New Component support for single and multiple select
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly isMulti?: boolean, readonly mappingProduct?: function(*): {name: *, id: *}, readonly onBlur?: *, readonly onChange?: *, readonly name?: *, readonly onAdded?: *, readonly placeholder?: *, readonly creatable?: boolean, readonly error?: *, readonly value?: *}> & React.RefAttributes<unknown>>}
 */
const SelectProduct = React.forwardRef((
  {
    onBlur,
    error,
    name,
    placeholder,
    onAdded,
    onChange,
    value,
    isMulti = false,
    mappingProduct = searchMappingProduct,
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
      .then(resp => cb(resp.rows.map(mappingProduct)));
  }, 300);

  return (
    <div key={`${name}_${lastId}`}>
      <InputGroup className={classNames({ "is-invalid": !!error })} {...props}>
        <AsyncSelect
          ref={ref}
          aria-labelledby="test"
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder={placeholder || "Search and Select"}
          noOptionsMessage={({ inputValue }) =>
            inputValue
              ? `Not found any Product with search "${inputValue}", try to search another`
              : "Input and search product"
          }
          loadOptions={loadOptions1}
          styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
          isClearable
          defaultOptions
          isMulti={isMulti}
          onBlur={onBlur}
          onChange={onChange}
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

SelectProduct.propTypes = {
  value: PropTypes.any,
  error: PropTypes.object,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  creatable: PropTypes.bool,
  mappingProduct: PropTypes.func,
  isMulti: PropTypes.bool,
};

export default SelectProduct;
