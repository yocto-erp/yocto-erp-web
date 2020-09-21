import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import FormRow from '../../Form/FormRow';
import ModalCancelButton from '../../button/ModalCancelButton';
import SubmitButton from '../../button/SubmitButton';
import companyApi from '../../../libs/apis/company.api';
import { useAsync } from '../../../libs/hooks/useAsync';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required.'),
});

const CompanyModalForm = ({ isOpen, closeHandle }) => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isValid, isDirty },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: { name: '', gsm: '', address: '', remark: '' },
  });

  const [isLoading, exec] = useAsync({ asyncApi: companyApi.create });
  const onSubmit = handleSubmit(val => {
    exec(val).then(result => {
      toast.success(`Create Company ${result.name} success !`);
      closeHandle(result);
    });
  });
  return (
    <Modal isOpen={isOpen}>
      <Form noValidate formNoValidate>
        <ModalHeader toggle={() => closeHandle(false)}>
          Company Form
        </ModalHeader>
        <ModalBody>
          <FormRow
            label={
              <span className="text-nowrap">
                Name <span className="text-danger">*</span>
              </span>
            }
            name="name"
            type="text"
            error={errors.name}
            register={register}
            placeholder="Company Name"
          />
          <FormRow
            label={<span>Phone</span>}
            name="gsm"
            type="text"
            register={register}
            placeholder="gsm"
          />
          <FormRow
            label="Address"
            name="address"
            type="text"
            register={register}
            placeholder="Address"
          />
          <FormRow
            label="Remark"
            name="remark"
            type="textarea"
            register={register}
            placeholder="Remark"
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

CompanyModalForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
};

export default CompanyModalForm;
