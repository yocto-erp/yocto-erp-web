import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  Popover,
  PopoverBody,
  PopoverHeader,
} from 'reactstrap';
import { Controller } from 'react-hook-form';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import FormGroup from '../../../../components/Form/FormGroup';
import { TEMPLATE_TYPE } from '../../../../libs/apis/template/templateType.api';
import EmailTemplateSelect from '../../../../components/common/template/EmailTemplateSelect';
import ModalCancelButton from '../../../../components/button/ModalCancelButton';
import ModalOKButton from '../../../../components/button/ModalOKButton';
import { transformUnNumber } from '../../../../libs/utils/number.util';
import useSyncForm from '../../../../libs/hooks/useSyncForm';
import Editor from '../../../../components/Form/Editor';
import InputTag from '../../../../components/Form/InputTag';
import { EDITOR_TYPE } from '../../../../components/constants';

const emailSchema = yup.string().email('Invalid Email');
const schema = yup.object().shape({
  from: emailSchema.required(),
  emailColumn: yup
    .number()
    .transform(transformUnNumber)
    .required(),
  content: yup.string().required(),
  subject: yup.string().required(),
  cc: yup.array(),
  bcc: yup.array(),
});

const MailMergeConfigure = ({ columns, onClose, isOpen, setting, onDone }) => {
  const {
    register,
    errors,
    onSubmit,
    formState: { isValid },
    watch,
    reset,
    control,
  } = useSyncForm({
    validationSchema: schema,
    api: formData => {
      console.log(formData);
      onDone(formData);
    },
  });
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [templateId, setTemplateId] = React.useState('');

  const toggle = () => setPopoverOpen(!popoverOpen);

  const variables = useMemo(() => {
    let rs = null;
    if (columns && columns.length) {
      rs = columns.map((t, i) => ({
        value: `{{column[${i}]}}`,
        remark: String(t),
      }));
    }
    return rs;
  }, [columns]);

  useEffect(() => {
    reset(setting);
  }, [setting]);

  useEffect(() => {
    console.log(templateId);
  }, [templateId]);

  const contentEditor = useMemo(
    () => (
      <div className="form-group">
        <Label for="content" className="mr-sm-2">
          Content
        </Label>
        <Controller
          name="content"
          control={control}
          defaultValue={setting?.content || ''}
          render={({ onChange, onBlur, value }) => (
            <Editor
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              variables={variables}
              name="content"
              type={EDITOR_TYPE.EMAIL}
            />
          )}
        />
      </div>
    ),
    [control, setting, variables],
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
          defaultValue={setting?.subject || ''}
          render={({ onChange, onBlur, value }) => (
            <Editor
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              variables={variables}
              name="subject"
              format="text"
              height={80}
            />
          )}
        />
      </div>
    ),
    [control, setting, variables],
  );

  return (
    <Modal className="primary xx-large" isOpen={isOpen} fade={false}>
      <form onSubmit={onSubmit} noValidate>
        <div className="modal-header align-items-center">
          <h5 className="modal-title">Mail Merge Configuration</h5>
          <div className="btn-toolbar text-right">
            <div className="btn-group  mr-2">
              <button
                type="button"
                id="Popover1"
                className="btn btn-xs btn-outline-info"
                title="Load Template"
                onClick={() => toggle()}
              >
                <i className="fa fa-cog" />
              </button>
              <button
                type="button"
                className="btn btn-xs btn-info"
                title="Save Template"
              >
                <i className="fa fa-save" />
              </button>
            </div>
            <button
              type="button"
              className="btn btn-xs btn-outline-secondary"
              onClick={() => onClose(false)}
            >
              <i className="fa fa-times" />
            </button>
          </div>
        </div>
        <ModalBody>
          <div className="row">
            <div className="col-4">
              <FormGroup
                name="from"
                label="From"
                type="email"
                register={register}
                error={errors.from}
                placeholder="From"
              />
            </div>
            <div className="col-4">
              <FormGroup
                name="emailColumn"
                label="Email to column"
                type="select"
                register={register}
                error={errors.emailColumn}
              >
                {columns.map((t, i) => (
                  <option key={uuidv4()} value={i}>
                    {t}
                  </option>
                ))}
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="emailTemplate">CC</label>
                <Controller
                  name="cc"
                  isValidNewOption={(
                    inputValue,
                    selectValue,
                    selectOptions,
                  ) => {
                    console.log(inputValue, selectValue, selectOptions);
                    let rs = true;
                    try {
                      emailSchema.validateSync(inputValue);
                    } catch (e) {
                      rs = false;
                    }
                    return rs;
                  }}
                  control={control}
                  defaultValue={setting?.cc || []}
                  as={InputTag}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="emailTemplate">BCC</label>
                <Controller
                  name="bcc"
                  isValidNewOption={inputValue => {
                    let rs = true;
                    try {
                      emailSchema.validateSync(inputValue);
                    } catch (e) {
                      rs = false;
                    }
                    return rs;
                  }}
                  control={control}
                  defaultValue={setting?.bcc || []}
                  as={InputTag}
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
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton onClick={() => onClose(false)} />
          <ModalOKButton color="primary" disabled={!isValid} type="submit">
            <i className="fa fa-check fa-fw" /> Save
          </ModalOKButton>
        </ModalFooter>
      </form>
      <Popover
        placement="auto"
        isOpen={popoverOpen}
        target="Popover1"
        fade={false}
      >
        <PopoverHeader>Select Template</PopoverHeader>
        <PopoverBody>
          <EmailTemplateSelect
            style={{ width: '300px' }}
            name="templateId"
            type={TEMPLATE_TYPE.OTHER}
            value={templateId}
            onChange={setTemplateId}
          />
          <Button type="button" color="primary">
            OK
          </Button>
        </PopoverBody>
      </Popover>
    </Modal>
  );
};

MailMergeConfigure.propTypes = {
  columns: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  setting: PropTypes.object,
  isOpen: PropTypes.bool,
  onDone: PropTypes.func.isRequired,
};

export default MailMergeConfigure;
