import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, InputGroup, InputGroupAddon } from "reactstrap";
import AsyncSelect from "react-select/async";
import classNames from "classnames";
import debounce from "lodash/debounce";
import { v4 as uuidv4 } from "uuid";
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from "../../../../components/constants";
import SubjectModalForm from "./SubjectModalForm";
import subjectApi from "../../../../libs/apis/partner/subject.api";
import SubjectView from "./SubjectView";

import { mappingOptionSubject, SUBJECT_TYPE } from "../constants";

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
  return <SubjectView item={data} />;
};

const SelectSubject = React.forwardRef((
  {
    onBlur,
    invalid,
    name,
    placeholder,
    onAdded,
    onChange,
    value,
    creatable = true,
    mappingValue = mappingOptionSubject,
    ...props
  },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const [isOpen, open] = useState(false);
  const loadOptions = debounce((inputValue, cb) => {
    subjectApi
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
    <div
      key={`${name || uuidv4()}`}
      className={classNames({ "is-invalid": invalid })}
    >
      <InputGroup {...props}>
        <AsyncSelect
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder={placeholder}
          noOptionsMessage={({ inputValue }) =>
            inputValue
              ? `Not found any Partner with search "${inputValue}", try to search another`
              : "Input and search Partner"
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
        {creatable ? (
          <InputGroupAddon addonType="append">
            <Button
              color="primary"
              type="button"
              className="pt-0 pb-0"
              onClick={() => open(true)}
            >
              <i className="las la-plus" />
            </Button>
          </InputGroupAddon>
        ) : (
          ""
        )}
      </InputGroup>
      {creatable ? (
        <SubjectModalForm
          closeHandle={val => {
            if (val && onAdded) {
              onAdded(val);
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

SelectSubject.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  creatable: PropTypes.bool,
  mappingValue: PropTypes.func,
};

export default SelectSubject;
