import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, InputGroupAddon } from 'reactstrap';
import AsyncSelect from 'react-select/async';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { REACT_SELECT_OPTION_CUSTOM_STYLE } from '../../constants';
import { templateEmailApi } from '../../../libs/apis/template/template.api';
import MailMergeConfigure from '../../../containers/tools/mail-merge/components/MailMergeConfigure';

const formatOptionLabel = data => (
  <div className="text-white">
    <span>{data.template ? data.template.name : ''}</span>
  </div>
);

const EmailTemplateSelect = React.forwardRef((
  {
    onBlur,
    invalid,
    name,
    placeholder,
    onAdded,
    onChange,
    value,
    type,
    enableAction = false,
    variables,
    ...props
  },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const [isOpenConfigure, setIsOpenConfigure] = React.useState(false);
  const [formValue, setFormValue] = React.useState(null);
  const loadOptions = debounce((inputValue, cb) => {
    templateEmailApi
      .search({
        page: 1,
        size: 10,
        filter: {
          search: inputValue,
          typeId: type,
        },
      })
      .then(resp => cb(resp.rows));
  }, 300);
  return (
    <>
      <InputGroup className={classNames({ 'is-invalid': invalid })} {...props}>
        {enableAction ? (
          <InputGroupAddon addonType="prepend">
            <Button
              color="primary"
              outline
              type="button"
              onClick={e => {
                setFormValue(null);
                setIsOpenConfigure(true);
                e.preventDefault();
              }}
            >
              <i className="fa fa-plus" />
            </Button>
          </InputGroupAddon>
        ) : null}
        <AsyncSelect
          aria-labelledby="Email Template Select"
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder={placeholder}
          defaultOptions
          noOptionsMessage={({ inputValue }) =>
            inputValue
              ? `Not found any Email Template with search "${inputValue}", try to search another`
              : 'Input and search Email Template'
          }
          loadOptions={loadOptions}
          styles={REACT_SELECT_OPTION_CUSTOM_STYLE}
          isClearable
          onBlur={onBlur}
          onChange={data => onChange(data)}
          formatOptionLabel={formatOptionLabel}
          getOptionValue={data => data.templateId}
          name={name}
          value={value}
        />
        {enableAction ? (
          <InputGroupAddon addonType="append">
            <Button
              color="warning"
              outline
              type="button"
              disabled={!value}
              onClick={e => {
                setFormValue({
                  id: value.templateId,
                  name: value.template.name,
                  content: value.template.content,
                  subject: value.subject,
                  from: value.from,
                  cc:
                    value.cc && value.cc.length
                      ? value.cc.map(t => ({ label: t, value: t }))
                      : [],
                  bcc:
                    value.bcc && value.bcc.length
                      ? value.bcc.map(t => ({ label: t, value: t }))
                      : [],
                });
                setIsOpenConfigure(true);
                e.preventDefault();
              }}
            >
              <i className="fa fa-edit" />
            </Button>
          </InputGroupAddon>
        ) : null}
      </InputGroup>
      <MailMergeConfigure
        emailTemplateType={type}
        onClose={() => setIsOpenConfigure(false)}
        onDone={setting => {
          setIsOpenConfigure(false);
          onChange(setting);
        }}
        variables={variables}
        isOpen={isOpenConfigure}
        setting={formValue}
      />
    </>
  );
});

EmailTemplateSelect.propTypes = {
  value: PropTypes.any,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onAdded: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.number,
  enableAction: PropTypes.bool,
  variables: PropTypes.array,
};

export default EmailTemplateSelect;
