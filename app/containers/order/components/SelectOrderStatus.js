import React from "react";
import classNames from "classnames";
import { injectIntl, intlShape } from "react-intl";
import Select from "../../../components/common/Select";
import { DEFAULT_HOOK_FORM_PROP_TYPE } from "../../../components/Form/constants";
import { LIST_ORDER_STATUS } from "../constants";
import PurchaseOrderStatus from "./PurchaseOrderStatus";

export const formatOptionLabel = (data, ctx) => {
  console.log(ctx, data);
  return <PurchaseOrderStatus status={data.id} />;
};

const SelectOrderStatus = React.forwardRef(
  (
    {
      onChange,
      value,
      name,
      onFocus,
      onBlur,
      disabled,
      isClearable,
      placeholder,
      invalid,
      intl,
      ...props
    },
    ref,
  ) => {
    console.log(value);

    return (
      <div className={classNames({ "is-invalid": invalid })} {...props}>
        <Select
          options={LIST_ORDER_STATUS.map(t => ({ id: t }))}
          onChange={val => onChange(val?.id || null)}
          isDisabled={disabled}
          isClearable={isClearable}
          name={name}
          getOptionValue={t => t.id}
          placeholder={placeholder}
          formatOptionLabel={formatOptionLabel}
          onBlur={onBlur}
          onFocus={onFocus}
          innerRef={ref}
          value={value ? { id: value } : null}
        />
      </div>
    );
  },
);

SelectOrderStatus.propTypes = {
  ...DEFAULT_HOOK_FORM_PROP_TYPE,
  intl: intlShape.isRequired,
};

export default injectIntl(SelectOrderStatus);
