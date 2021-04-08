import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import FormRow from '../../Form/FormRow';
import ModalCancelButton from '../../button/ModalCancelButton';
import SubmitButton from '../../button/SubmitButton';
import { useAsync } from '../../../libs/hooks/useAsync';
import personApi from '../../../libs/apis/person.api';
import { ERROR } from '../../Form/messages';

const validationSchema = Yup.object().shape({
  personId: Yup.string().required(ERROR.required),
});

const EmployeeModalForm = ({ isOpen, closeHandle }) => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isValid, isDirty },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: { personId: '', salary: '', bio: '' },
  });

  const [isLoading, exec] = useAsync({ asyncApi: personApi.create });
  const onSubmit = handleSubmit(val => {
    exec(val).then(result => {
      toast.success(`Create Person ${result.personId} success !`);
      closeHandle(result);
    });
  });
  return (
    <Modal isOpen={isOpen}>
      <Form noValidate formNoValidate>
        <ModalHeader toggle={() => closeHandle(false)}>Person Form</ModalHeader>
        <ModalBody>
          <FormRow
            label={
              <span className="text-nowrap">
                Name<span className="text-danger">*</span>
              </span>
            }
            name="personId"
            type="text"
            error={errors.personId}
            register={register}
            placeholder="Person Name"
          />
          <FormRow
            label={<span>Salary</span>}
            name="salary"
            type="text"
            register={register}
            placeholder="Salary"
          />
          <FormRow
            label="Bio"
            name="bio"
            type="text"
            register={register}
            placeholder="BIO"
          />
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton onClick={() => closeHandle(false)} />
          <SubmitButton
            disabled={!isValid || !isDirty}
            type="button"
            isLoading={isLoading}
            onClick={onSubmit}
          />
        </ModalFooter>
      </Form>
    </Modal>
  );
};

EmployeeModalForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
};

export default EmployeeModalForm;
