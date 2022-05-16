import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import classNames from "classnames";
import debounce from "lodash/debounce";
import { v4 as uuidv4 } from "uuid";
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../../../components/constants";
import SubjectView from "../../partner/subject/components/SubjectView";
import {
  mappingOptionSubject,
  SUBJECT_TYPE,
} from "../../partner/subject/constants";
import { providerApi } from "../../../libs/apis/provider/provider.api";

const formatOptionLabel = (data, { context }) => {
  if (context === "value") {
    return (
      <strong>
        <i
          className={classNames("fa fa-fw", {
            "fa-user-o": Number(data.type) === SUBJECT_TYPE.PERSONAL,
            "fa-building-o": Number(data.type) === SUBJECT_TYPE.COMPANY,
          })}
        />{" "}
        {data.name}
      </strong>
    );
  }
  return <SubjectView item={data.subject} />;
};

const mappingOptionProvider = t => mappingOptionSubject(t?.subject);

const SelectProvider = React.forwardRef((
  {
    onBlur,
    invalid,
    name,
    placeholder,
    onChange,
    value,
    mappingValue = mappingOptionProvider,
  },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const loadOptions = debounce((inputValue, cb) => {
    providerApi
      .search({
        page: 1,
        size: 10,
        filter: {
          search: inputValue,
          isApprove: 1,
        },
      })
      .then(resp => cb(resp.rows));
  }, 300);
  return (
    <div
      key={`${name || uuidv4()}`}
      className={classNames({ "is-invalid": invalid })}
    >
      <AsyncSelect
        aria-labelledby="test"
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder={placeholder}
        noOptionsMessage={({ inputValue }) =>
          inputValue
            ? `Không tìm thấy nhà cung cấp với tìm kiếm: "${inputValue}"`
            : "Tìm nhà cung cấp"
        }
        loadOptions={loadOptions}
        defaultOptions
        styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
        isClearable
        onBlur={onBlur}
        onChange={val => onChange(mappingValue ? mappingValue(val) : val)}
        formatOptionLabel={formatOptionLabel}
        getOptionValue={data => data.id}
        name={name}
        value={value}
      />
    </div>
  );
});

SelectProvider.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  mappingValue: PropTypes.func,
};

export default SelectProvider;
