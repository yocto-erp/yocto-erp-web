import React, { useEffect } from 'react';
import * as yup from 'yup';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { transformUnNumber } from '../../../../libs/utils/number.util';
import { ERROR } from '../../../../components/Form/messages';
import useMyForm from '../../../../libs/hooks/useMyForm';
import FormGroup from '../../../../components/Form/FormGroup';
import RawHTML from '../../../../components/RawHtml';
import ModalCancelButton from '../../../../components/button/ModalCancelButton';
import ModalOKButton from '../../../../components/button/ModalOKButton';
import InputNumber from '../../../../components/Form/InputNumber';
import { TEMPLATE_TYPE } from '../../../../libs/apis/template/templateType.api';
import EmailTemplateSelect from '../../../../components/common/template/EmailTemplateSelect';

const schema = yup.object().shape({
  amount: yup
    .number()
    .transform(transformUnNumber)
    .positive(ERROR.amountGT0)
    .required(ERROR.required),
  remark: yup.string(),
  storeCashIn: yup.bool(),
  sendEmailConfirm: yup.bool(),
  emailTemplate: yup
    .object()
    .nullable()
    .when('sendEmailConfirm', {
      is: true,
      then: yup.object().required(),
    }),
  from: yup
    .string()
    .email('Invalid Email')
    .when('sendEmailConfirm', {
      is: true,
      then: yup.string().required('Must enter email address'),
    }),
});

const StudentFeePaid = ({ isOpen, onClose, student }) => {
  const {
    register,
    errors,
    onSubmit,
    formState: { isValid },
    reset,
    control,
    watch,
    state: { isLoading, errors: serverErrors, resp },
  } = useMyForm({
    validationSchema: schema,
    api: formData => {
      console.log(formData);
      return new Promise((resolve, reject) => {
        resolve(1);
      });
    },
  });

  useEffect(() => {
    if (student) {
      reset({
        amount: student?.totalAmount || 0,
        remark: '',
        storeCashIn: true,
        sendEmailConfirm: true,
        from: '',
        emailTemplate: null,
      });
    }
  }, [student]);

  const { emailTemplate, sendEmailConfirm } = watch([
    'emailTemplate',
    'sendEmailConfirm',
  ]);

  return (
    <Modal className="primary large" isOpen={isOpen} fade={false}>
      <form onSubmit={onSubmit} noValidate>
        <ModalHeader toggle={() => onClose(false)}>
          Sent Payment for student {student?.student.child.firstName}{' '}
          {student?.student.child.lastName} on {student?.monthFee}-
          {student?.yearFee}
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="amount">Payment Amount</label>
                <Controller
                  invalid={errors.amount}
                  name="amount"
                  control={control}
                  as={InputNumber}
                  defaultValue="0"
                  placeholder="Payment Amount"
                />
              </div>
              <FormGroup
                name="remark"
                placeholder="Remark"
                type="textarea"
                label="Remark"
                register={register}
              />
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="storeCashIn"
                  name="storeCashIn"
                  ref={register}
                />
                <label className="form-check-label" htmlFor="storeCashIn">
                  Save Payment Cash In
                </label>
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="sendEmailConfirm"
                  name="sendEmailConfirm"
                  ref={register}
                />
                <label className="form-check-label" htmlFor="sendEmailConfirm">
                  Send Email Confirm
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="emailTemplate">
                  Email Template <span className="text-danger">*</span>
                </label>
                <Controller
                  control={control}
                  name="emailTemplate"
                  disabled={!sendEmailConfirm}
                  defaultValue=""
                  placeholder="Select Email Template"
                  type={TEMPLATE_TYPE.STUDENT_FEE}
                  as={EmailTemplateSelect}
                />
              </div>
            </div>
            <div className="col-8">
              <div className="form-group">
                <label htmlFor="subject">Email Preview</label>
                {emailTemplate && sendEmailConfirm ? (
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
                        <div style={{ maxHeight: 400, overflow: 'auto' }}>
                          <RawHTML html={emailTemplate.template.content} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton onClick={() => onClose(false)} />
          <ModalOKButton
            color="primary"
            disabled={!isValid}
            isLoading={isLoading}
            type="submit"
          >
            <i className="fa fa-money fa-fw mr-2" /> Set Payment
          </ModalOKButton>
          {JSON.stringify(isValid)}
        </ModalFooter>
      </form>
    </Modal>
  );
};

StudentFeePaid.propTypes = {
  student: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default StudentFeePaid;
