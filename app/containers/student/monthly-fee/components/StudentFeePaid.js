import React, { useEffect } from 'react';
import * as yup from 'yup';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { toast } from 'react-toastify';
import { transformUnNumber } from '../../../../libs/utils/number.util';
import { ERROR } from '../../../../components/Form/messages';
import useMyForm from '../../../../libs/hooks/useMyForm';
import FormGroupInput from '../../../../components/Form/FormGroupInput';
import ModalCancelButton from '../../../../components/button/ModalCancelButton';
import ModalOKButton from '../../../../components/button/ModalOKButton';
import SendEmailEditorForm from '../../../../components/SendEmailEditorForm';
import InputAmount from '../../../../components/Form/InputAmount';
import { useApi } from '../../../../libs/hooks/useApi';
import studentMonthlyFeeApi from '../../../../libs/apis/student/student-monthly-fee.api';
import FormHookErrorMessage from '../../../../components/Form/FormHookErrorMessage';
import { emailSchema } from '../../../../libs/utils/schema.util';

const schema = yup.object().shape({
  amount: yup
    .number()
    .transform(transformUnNumber)
    .positive(ERROR.amountGT0)
    .required(ERROR.required),
  remark: yup.string(),
  name: yup.string().when('storeCashIn', {
    is: true,
    then: yup.string().required(),
  }),
  storeCashIn: yup.bool(),
  sendEmailConfirm: yup.bool(),
  from: emailSchema.when('sendEmailConfirm', {
    is: true,
    then: emailSchema.required(),
  }),
  content: yup.string().when('sendEmailConfirm', {
    is: true,
    then: yup.string().required(),
  }),
  subject: yup.string().when('sendEmailConfirm', {
    is: true,
    then: yup.string().required(),
  }),
  cc: yup.array().nullable(),
  bcc: yup.array().nullable(),
});

const StudentFeePaid = ({ isOpen, onClose, student }) => {
  console.log(student);
  const {
    register,
    errors,
    onSubmit,
    formState: { isValid },
    reset,
    control,
    watch,
    setValue,
    confirmModal,
    state: { isLoading, errors: serverErrors, resp },
  } = useMyForm({
    validationSchema: schema,
    api: formData => {
      console.log(formData);
      return studentMonthlyFeeApi.pay(student.id, formData);
    },
    onConfirm: formData => ({
      title: `Confirm Paid Student Fee ${formData.amount} !`,
      message: 'Are you sure to confirm payment student fee?',
    }),
  });

  const {
    state: { resp: studentPrint },
    exec,
  } = useApi(std => studentMonthlyFeeApi.printData(std.id));

  useEffect(() => {
    if (student) {
      exec(student);
    }
  }, [student]);

  useEffect(() => {
    if (student) {
      reset({
        amount: student.totalAmount || 0,
        remark: '',
        name: `Month ${student.monthFee + 1}/${
          student.yearFee
        } tuition fee of ${student.student.child.firstName} ${
          student.student.child.lastName
        }`,
        storeCashIn: true,
        sendEmailConfirm: true,
        from: '',
        emailTemplate: null,
      });
    }
  }, [student]);

  useEffect(() => {
    if (serverErrors && serverErrors.length) {
      toast.error(serverErrors.map(t => t.message).join('\n'));
    }
  }, [serverErrors]);

  useEffect(() => {
    if (resp) {
      toast.success(`Payment success !!!`);
      onClose(true);
    }
  }, [resp]);

  const { sendEmailConfirm, storeCashIn } = watch([
    'sendEmailConfirm',
    'storeCashIn',
  ]);

  return (
    <Modal className="primary xx-large" isOpen={isOpen} fade={false} scrollable>
      <ModalHeader toggle={() => onClose(false)}>
        Set Payment for student {student?.student.child.firstName}{' '}
        {student?.student.child.lastName} on {student?.monthFee}-
        {student?.yearFee}
      </ModalHeader>
      <ModalBody className="p-4">
        <form onSubmit={onSubmit} noValidate>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="amount">Payment Amount</label>
                <Controller
                  invalid={errors.amount}
                  name="amount"
                  control={control}
                  as={InputAmount}
                  defaultValue="0"
                  placeholder="Payment Amount"
                />
              </div>
              <div className="form-group">
                <label htmlFor="storeCashIn">Lưu Phiếu Thu</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text bg-gray">
                      <input
                        type="checkbox"
                        className=""
                        id="storeCashIn"
                        name="storeCashIn"
                        ref={register}
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    disabled={!storeCashIn}
                    ref={register}
                  />
                </div>
                <FormHookErrorMessage error={errors.name} />
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
            </div>
            <div className="col-md-6">
              <FormGroupInput
                name="remark"
                placeholder="Remark"
                type="textarea"
                label="Remark"
                rows={5}
                register={register}
              />
            </div>
          </div>
          {sendEmailConfirm ? (
            <div className="row">
              <div className="col-12">
                <SendEmailEditorForm
                  register={register}
                  setValue={setValue}
                  control={control}
                  errors={errors}
                  values={studentPrint}
                />
              </div>
            </div>
          ) : null}
        </form>
        {confirmModal}
      </ModalBody>
      <ModalFooter>
        <ModalCancelButton onClick={() => onClose(false)} />
        <ModalOKButton
          color="primary"
          disabled={!isValid}
          isLoading={isLoading}
          type="button"
          onClick={onSubmit}
        >
          <i className="fa fa-money fa-fw mr-2" /> Set Payment
        </ModalOKButton>
      </ModalFooter>
    </Modal>
  );
};

StudentFeePaid.propTypes = {
  student: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default StudentFeePaid;
