import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Col,
} from 'reactstrap';
import { yupResolver } from '@hookform/resolvers';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import FormRow from '../../Form/FormRow';
import ModalCancelButton from '../../button/ModalCancelButton';
import SubmitButton from '../../button/SubmitButton';
import { useAsync } from '../../../libs/hooks/useAsync';
import partnerPersonApi from '../../../libs/apis/partner/partner-person.api';
import DateSelect from '../../date/DateSelect';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('This field is required.'),
  lastName: Yup.string().required('This field is required.'),
  email: Yup.string()
    .email('Email not format.')
    .required('This field is required.'),
});

const CustomerModalForm = ({ isOpen, closeHandle }) => {
  const {
    control,
    register,
    handleSubmit,
    errors,
    formState: { isValid, isDirty },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      gsm: '',
      address: '',
      birthday: new Date(),
      sex: 0,
      remark: '',
    },
  });

  const [isLoading, exec] = useAsync({ asyncApi: partnerPersonApi.create });
  const onSubmit = handleSubmit(val => {
    exec(val).then(result => {
      toast.success(`Create Customer success !`);
      closeHandle(result);
    });
  });
  return (
    <Modal isOpen={isOpen}>
      <Form noValidate formNoValidate>
        <ModalHeader toggle={() => closeHandle(false)}>
          Customer Form
        </ModalHeader>
        <ModalBody>
          <FormRow
            label={
              <>
                First Name<span className="text-danger">*</span>
              </>
            }
            labelCol={3}
            valueCol={9}
            name="firstName"
            type="text"
            error={errors.firstName}
            register={register}
            placeholder="First Name"
          />
          <FormRow
            label={
              <>
                Last Name<span className="text-danger">*</span>
              </>
            }
            labelCol={3}
            valueCol={9}
            name="lastName"
            type="text"
            register={register}
            placeholder="Last Name"
            error={errors.lastName}
          />
          <FormRow
            label="gsm"
            labelCol={3}
            valueCol={9}
            name="gsm"
            type="text"
            register={register}
            placeholder="gsm"
          />

          <FormRow
            label={
              <>
                Email<span className="text-danger">*</span>
              </>
            }
            labelCol={3}
            valueCol={9}
            name="email"
            type="text"
            register={register}
            placeholder="Email"
            error={errors.email}
          />
          <FormRow
            label="Address"
            labelCol={3}
            valueCol={9}
            name="address"
            type="text"
            register={register}
            placeholder="Address"
          />

          <FormGroup row>
            <Label sm={3} for="birthday">
              Birthday
            </Label>
            <Col sm={9}>
              <Controller
                name="birthday"
                control={control}
                invalid={!!errors.birthday}
                as={DateSelect}
              />
            </Col>
          </FormGroup>
          <FormRow
            label="Sex"
            labelCol={3}
            valueCol={9}
            name="sex"
            type="select"
            register={register}
            placeholder="Choose sex"
          >
            <option value={0}>MALE</option>
            <option value={1}>FEMALE</option>
          </FormRow>
          <FormRow
            label="Remark"
            labelCol={3}
            valueCol={9}
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

CustomerModalForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
};

export default CustomerModalForm;
