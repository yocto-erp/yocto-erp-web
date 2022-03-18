import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Label } from "reactstrap";
import { Controller } from "react-hook-form";
import FormGroupInput from "../Form/FormGroupInput";
import { isValidEmail } from "../../libs/utils/schema.util";
import Editor from "../Form/Editor";
import { EDITOR_TYPE } from "../constants";
import { renderTemplate } from "../../libs/utils/template.util";
import { TEMPLATE_TYPE } from "../../libs/apis/template/templateType.api";
import EmailTemplateSelect from "../common/template/EmailTemplateSelect";
import MultipleEmailInput from "../Form/MultipleEmailInput";

/**
 * Always using with HookForm
 * @param control
 * @param register
 * @param errors
 * @param values
 * @returns {JSX.Element}
 * @constructor
 */
const SendEmailEditorForm = ({
  control,
  register,
  errors,
  values,
  setValue,
}) => {
  const [template, setTemplate] = React.useState(null);

  const onTemplateChange = React.useCallback(
    val => {
      if (val) {
        let {
          // eslint-disable-next-line prefer-const
          from,
          // eslint-disable-next-line prefer-const
          cc,
          // eslint-disable-next-line prefer-const
          bcc,
          template: { content },
          subject,
        } = val;
        if (values) {
          subject = renderTemplate(subject, values);
          content = renderTemplate(content, values);
        }
        setValue("subject", subject);
        setValue("from", from, { shouldValidate: true });
        setValue("cc", cc || []);
        setValue("bcc", bcc || []);
        setValue("content", content);
      } else {
        setValue("subject", "");
        setValue("from", "");
        setValue("cc", []);
        setValue("bcc", []);
        setValue("content", "");
      }
      setTemplate(val);
    },
    [values],
  );

  useEffect(() => {}, []);
  const contentEditor = useMemo(
    () => (
      <div className="form-group">
        <Label for="content" className="mr-sm-2">
          Content
        </Label>
        <Controller
          name="content"
          control={control}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <Editor
              height={300}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              name="content"
              type={EDITOR_TYPE.EMAIL}
            />
          )}
        />
      </div>
    ),
    [control],
  );

  const subjectEditor = useMemo(
    () => (
      <div className="form-group">
        <Label for="content" className="mr-sm-2">
          Subject
        </Label>
        <Controller
          name="subject"
          control={control}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <Editor
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              name="subject"
              format="text"
              height={80}
            />
          )}
        />
      </div>
    ),
    [control],
  );
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="template">Choose Email Template</label>
            <EmailTemplateSelect
              style={{ width: "300px" }}
              name="template"
              type={TEMPLATE_TYPE.STUDENT_FEE}
              value={template}
              onChange={onTemplateChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <FormGroupInput
            name="from"
            label="From"
            type="email"
            register={register}
            error={errors.from}
            placeholder="From"
          />
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="cc">CC</label>
            <Controller
              name="cc"
              isValidNewOption={isValidEmail}
              control={control}
              defaultValue={[]}
              as={MultipleEmailInput}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="bcc">BCC</label>
            <Controller
              name="bcc"
              isValidNewOption={isValidEmail}
              control={control}
              defaultValue={[]}
              as={MultipleEmailInput}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {subjectEditor}
          {contentEditor}
        </div>
      </div>
    </>
  );
};

SendEmailEditorForm.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  control: PropTypes.any.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object.isRequired,
};

export default SendEmailEditorForm;
