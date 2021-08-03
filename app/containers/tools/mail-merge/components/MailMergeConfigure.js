import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Label, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Controller } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import FormGroupInput from '../../../../components/Form/FormGroupInput';
import ModalCancelButton from '../../../../components/button/ModalCancelButton';
import ModalOKButton from '../../../../components/button/ModalOKButton';
import Editor from '../../../../components/Form/Editor';
import InputTag from '../../../../components/Form/InputTag';
import { EDITOR_TYPE } from '../../../../components/constants';
import useMyForm from '../../../../libs/hooks/useMyForm';
import { templateEmailApi } from '../../../../libs/apis/template/template.api';

const emailSchema = yup.string().email('Invalid Email');
const schema = yup.object().shape({
  name: yup.string().required(),
  from: emailSchema.required(),
  content: yup.string().required(),
  subject: yup.string().required(),
  cc: yup.array(),
  bcc: yup.array(),
});

const MailMergeConfigure = React.forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ variables, onClose, isOpen, setting, onDone, emailTemplateType }, ref) => {
    const {
      register,
      errors,
      onSubmit,
      formState: { isValid, isDirty },
      state: { errors: serverErrors, isLoading, resp },
      reset,
      control,
    } = useMyForm({
      form: setting,
      validationSchema: schema,
      api: formData => {
        const serverFormData = {
          ...formData,
          cc: formData.cc ? formData.cc.map(t => t.value) : null,
          bcc: formData.bcc ? formData.bcc.map(t => t.value) : null,
          templateTypeId: emailTemplateType,
        };
        if (!(setting && setting.id)) {
          return templateEmailApi.create(serverFormData);
        }
        return templateEmailApi.update(setting.templateId, serverFormData);
      },
    });

    useEffect(() => {
      if (setting) {
        reset(setting);
      } else {
        reset({});
      }
    }, [setting]);

    useEffect(() => {
      if (resp) {
        toast.success(`Save template ${resp.template.name} success`);
        onDone(resp);
      }
    }, [resp]);

    useEffect(() => {
      if (serverErrors && serverErrors.length) {
        toast.error(serverErrors.map(t => t.message).join('\n'));
      }
    }, [serverErrors]);

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
      <Modal
        className="primary xx-large"
        isOpen={isOpen}
        fade={false}
        scrollable
      >
        <div className="modal-header align-items-center">
          <h5 className="modal-title">Mail Merge Template</h5>
          <div className="btn-toolbar text-right">
            <button
              type="button"
              className="btn btn-xs btn-outline-secondary"
              onClick={() => onClose(false)}
            >
              <i className="fa fa-times" />
            </button>
          </div>
        </div>
        <ModalBody className="p-4">
          <form onSubmit={onSubmit} noValidate>
            <div className="row">
              <div className="col-md-6">
                <FormGroupInput
                  name="name"
                  label="Name"
                  type="text"
                  register={register}
                  error={errors.name}
                  placeholder="Email Template Name"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <FormGroupInput
                  name="from"
                  label="From"
                  type="email"
                  register={register}
                  error={errors.from}
                  placeholder="From"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="emailTemplate">CC</label>
                  <Controller
                    name="cc"
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
                    defaultValue={setting?.cc || []}
                    as={InputTag}
                  />
                </div>
              </div>
              <div className="col-md-6">
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
          </form>
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton onClick={() => onClose(false)} />
          <ModalOKButton
            color="primary"
            disabled={!isValid || !isDirty}
            type="button"
            onClick={onSubmit}
            isLoading={isLoading}
          >
            <i className="fa fa-check fa-fw" /> Save
          </ModalOKButton>
        </ModalFooter>
      </Modal>
    );
  },
);

MailMergeConfigure.propTypes = {
  variables: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  setting: PropTypes.object,
  isOpen: PropTypes.bool,
  onDone: PropTypes.func.isRequired,
  emailTemplateType: PropTypes.number.isRequired,
};

export default MailMergeConfigure;
