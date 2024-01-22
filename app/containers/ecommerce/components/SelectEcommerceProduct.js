import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import debounce from "lodash/debounce";
import { cloudAssetUrl } from "../../../libs/apis/image.api";
import noImage from "../../../images/No_image_available.svg";
import { hasText } from "../../../utils/util";
import ecommerceProductApi from "../../../libs/apis/ecommerce/ecommerce-product.api";
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../../../components/constants";
import FormHookErrorMessage from "../../../components/Form/FormHookErrorMessage";
import Price from "../../../components/common/Price";

const formatOptionLabel = (item, { context }) => (
  <div className="media">
    {context === "menu" && (
      <img
        role="presentation"
        src={item.thumbnail ? cloudAssetUrl(item.thumbnail) : noImage}
        style={{ width: 48, height: 48, cursor: "pointer" }}
        title="Click to view all image"
        className="mr-3"
        alt="..."
      />
    )}
    <div className="media-body">
      {hasText(item.product.productDocumentId) && (
        <p className="mt-0 mb-0 font-weight-bold">
          {item.product.productDocumentId}
        </p>
      )}{" "}
      <p className="mt-0 mb-0">{item.webDisplayName}</p>
      <p className="mt-0 mb-0">
        <Price amount={item.price} />
      </p>
    </div>
  </div>
);

export const searchMappingProduct = val => ({
  id: val.id,
  webDisplayName: val.webDisplayName,
  name: val.webDisplayName,
  product: val.product,
  price: val.price,
  unit: val.unit,
  thumbnail: val.thumbnail,
});

const SelectEcommerceProduct = React.forwardRef(
  (
    {
      onBlur,
      error,
      name,
      placeholder,
      onChange,
      value,
      isMulti = false,
      mappingProduct = searchMappingProduct,
    },
    ref,
  ) => {
    const loadOptions1 = debounce((inputValue, cb) => {
      ecommerceProductApi
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
      <div key={`${name}`}>
        <AsyncSelect
          ref={ref}
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
        <FormHookErrorMessage error={error} />
      </div>
    );
  },
);

SelectEcommerceProduct.propTypes = {
  value: PropTypes.any,
  error: PropTypes.object,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  mappingProduct: PropTypes.func,
  isMulti: PropTypes.bool,
};

export default SelectEcommerceProduct;
