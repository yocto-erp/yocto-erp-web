import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Controller } from "react-hook-form";
import ModalCancelButton from "../../../../components/button/ModalCancelButton";
import ModalOKButton from "../../../../components/button/ModalOKButton";
import EmailTemplateSelect from "../../../../components/common/template/EmailTemplateSelect";
import { TEMPLATE_TYPE } from "../../../../libs/apis/template/templateType.api";
import RawHTML from "../../../../components/RawHtml";
import studentMonthlyFeeApi from "../../../../libs/apis/student/student-monthly-fee.api";
import useStudentConfigure from "../../../../libs/hooks/useStudentConfigure";
import FormGroupInput from "../../../../components/Form/FormGroupInput";
import useMyForm from "../../../../libs/hooks/useMyForm";
import { isValidEmail } from "../../../../libs/utils/schema.util";
import MultipleEmailInput from "../../../../components/Form/MultipleEmailInput";

const schema = yup.object().shape({
  from: yup
    .string()
    .email("Invalid Email")
    .required(),
  cc: yup.array(),
  bcc: yup.array(),
  attached: yup.bool(),
  emailTemplate: yup.object().required(),
});

const SendMailStudentFee = ({ isOpen = false, fees = [], onClose }) => {
  const { configure } = useStudentConfigure();

  const {
    register,
    errors,
    onSubmit,
    formState: { isValid },
    watch,
    control,
    setValue,
    confirmModal,
    state: { isLoading, errors: serverErrors, resp },
  } = useMyForm({
    validationSchema: schema,
    api: formData => {
      console.log(formData);
      return studentMonthlyFeeApi.sendEmail(
        fees,
        formData.emailTemplate.templateId,
        formData.attached,
        configure.printTemplateId,
        formData.from,
        formData.cc,
        formData.bcc,
      );
    },
    onConfirm: () => ({
      title: `Send email to parents of total ${fees.length} students`,
      message: "Are you sure to send email ?",
    }),
  });

  const emailTemplate = watch("emailTemplate");

  useEffect(() => {
    setValue("from", emailTemplate?.from, { shouldValidate: true });
    setValue("cc", emailTemplate?.cc || [], { shouldValidate: true });
    setValue("bcc", emailTemplate?.bcc || [], { shouldValidate: true });
  }, [emailTemplate, setValue]);

  useEffect(() => {
    if (serverErrors && serverErrors.length) {
      toast.error(serverErrors.map(t => t.message).join("\n"));
    }
  }, [serverErrors]);

  useEffect(() => {
    if (resp) {
      console.log("response", resp);
      const { success, fail } = resp;
      const rs = [];
      if (success.length) {
        rs.push(
          <p key="success" className="mb-0">
            Send total success: {success.length}
          </p>,
        );
      }
      if (fail.length) {
        rs.push(
          <p key="fail" className="mt-2">
            Send total fail: {fail.length}
          </p>,
        );
        rs.push(
          <ul key="detail" className="mt-2">
            {fail.map(t => (
              <li key={t.message}>{t.message}</li>
            ))}
          </ul>,
        );
      }
      toast.success(<>{rs}</>);
      onClose(false);
    }
  }, [resp, onClose]);

  return (
    <Modal className="primary large" isOpen={isOpen} fade={false}>
      <form onSubmit={onSubmit} noValidate>
        <ModalHeader toggle={() => onClose(false)}>
          Send email to parent for monthly fee.
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="emailTemplate">
                  Email Template <span className="text-danger">*</span>
                </label>
                <Controller
                  control={control}
                  name="emailTemplate"
                  defaultValue=""
                  placeholder="Select Email Template"
                  type={TEMPLATE_TYPE.STUDENT_FEE}
                  as={EmailTemplateSelect}
                />
              </div>
              <FormGroupInput
                name="from"
                label="Email From"
                type="email"
                register={register}
                error={errors.from}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
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
            <div className="col-md-6">
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
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="subject">Email Preview</label>
                {emailTemplate ? (
                  <div className="card">
                    <div className="card-body">
                      <div className="card-text">
                        <p>
                          <strong>Subject:</strong>
                        </p>
                        <p>{emailTemplate.subject}</p>
                        <hr />
                        <p>
                          <strong>Content:</strong>
                        </p>
                        <div style={{ maxHeight: 400, overflow: "auto" }}>
                          <RawHTML html={emailTemplate.template.content} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="attachment"
                  name="attached"
                  ref={register}
                />
                <label className="form-check-label" htmlFor="attachment">
                  Send with PDF Attachment
                </label>
              </div>
              <div className="alert alert-danger" role="alert">
                This will send email to student parent (include mother and
                father, if got information)
              </div>
            </div>
          </div>
          {confirmModal}
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton onClick={() => onClose(false)} />
          <ModalOKButton
            color="primary"
            disabled={!isValid}
            isLoading={isLoading}
            type="submit"
          >
            <i className="fa fa-envelope fa-fw mr-2" /> Send Email
          </ModalOKButton>
        </ModalFooter>
      </form>
    </Modal>
  );
};

SendMailStudentFee.propTypes = {
  fees: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default SendMailStudentFee;
