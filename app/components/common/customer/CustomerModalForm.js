import React from "react";
import PropTypes from "prop-types";
import { Form, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import FormRow from "../../Form/FormRow";
import ModalCancelButton from "../../button/ModalCancelButton";
import SubmitButton from "../../button/SubmitButton";
import { useAsync } from "../../../libs/hooks/useAsync";
import personApi from "../../../libs/apis/person.api";
import Label from "../../Form/Label";
import { ERROR } from "../../Form/messages";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(ERROR.required),
  lastName: Yup.string().required(ERROR.required),
});

const CustomerModalForm = ({ isOpen, closeHandle }) => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isValid, isDirty },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gsm: "",
      address: "",
      sex: "",
      remark: "",
    },
  });

  const [isLoading, exec] = useAsync({ asyncApi: personApi.create });
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
              <span className="text-nowrap">
                First Name <span className="text-danger">*</span>
              </span>
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
            label={<Label required>Last Name</Label>}
            labelCol={3}
            valueCol={9}
            name="lastName"
            type="text"
            register={register}
            placeholder="Last Name"
            error={errors.lastName}
          />
          <FormRow
            label="Phone"
            labelCol={3}
            valueCol={9}
            name="gsm"
            type="text"
            register={register}
            placeholder="gsm"
          />

          <FormRow
            label="Email"
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
          <FormRow
            label="Gender"
            labelCol={3}
            valueCol={9}
            name="sex"
            type="select"
            register={register}
            placeholder="Choose Gender"
          >
            <option value="">Select Gender</option>
            <option value={0}>MALE</option>
            <option value={1}>FEMALE</option>
            <option value={2}>OTHER</option>
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
