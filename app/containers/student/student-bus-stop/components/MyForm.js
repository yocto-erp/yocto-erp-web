import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Form } from "reactstrap";
import { toast } from "react-toastify";
import { useHookCRUDForm } from "../../../../libs/hooks/useHookCRUDForm";
import Widget from "../../../../components/Widget/Widget";
import SubmitButton from "../../../../components/button/SubmitButton";
import BackButton from "../../../../components/button/BackButton";
import { ERROR } from "../../../../components/Form/messages";
import FormGroupInput from "../../../../components/Form/FormGroupInput";
import studentBusStopApi from "../../../../libs/apis/student/student-bus-stop.api";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(ERROR.required),
});

const { create, update, read } = studentBusStopApi;

function MyForm({ id }) {
  const {
    register,
    submit,
    errors,
    state: { isLoading },
    formState: { isDirty, isValid },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update Bus Stop ${resp.name} success`
          : `Create Bus Stop ${resp.name} success`,
      );
    },
    validationSchema,
    initForm: {
      name: "",
    },
    id,
  });

  return (
    <Widget>
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormGroupInput
          name="name"
          label="Name"
          placeholder="Name"
          register={register}
          error={errors.name}
          type="text"
        />

        <BackButton className="mr-2" />
        <SubmitButton disabled={!isValid || !isDirty} isLoading={isLoading} />
      </Form>
    </Widget>
  );
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
