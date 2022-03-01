import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Form } from "reactstrap";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import { useHookCRUDForm } from "../../../../libs/hooks/useHookCRUDForm";
import Widget from "../../../../components/Widget/Widget";
import SubmitButton from "../../../../components/button/SubmitButton";
import BackButton from "../../../../components/button/BackButton";
import { ERROR } from "../../../../components/Form/messages";
import FormHookErrorMessage from "../../../../components/Form/FormHookErrorMessage";
import studentClassApi from "../../../../libs/apis/student/student-class.api";
import InputAmount from "../../../../components/Form/InputAmount";
import FormGroup from "../../../../components/Form/FormGroup";
import FormGroupInput from "../../../../components/Form/FormGroupInput";
import { transformUnNumberToNull } from "../../../../libs/utils/number.util";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(ERROR.required),
  tuitionFeePerMonth: Yup.number()
    .transform(transformUnNumberToNull)
    .nullable()
    .moreThan(0, "Tuition Fee must larger than 0")
    .required("this field is required"),
  absentFeeReturnPerDay: Yup.number()
    .transform(transformUnNumberToNull)
    .nullable()
    .moreThan(0, "Tuition Fee must larger than 0")
    .required("this field is required"),
  feePerTrialDay: Yup.number()
    .transform(transformUnNumberToNull)
    .nullable()
    .required("this field is required"),
  mealFeePerMonth: Yup.number()
    .transform(transformUnNumberToNull)
    .nullable()
    .moreThan(0, "Tuition Fee must larger than 0"),
  mealFeeReturnPerDay: Yup.number()
    .transform(transformUnNumberToNull)
    .nullable(),
});

const { create, update, read } = studentClassApi;

function MyForm({ id }) {
  const {
    register,
    submit,
    errors,
    control,
    state: { isLoading },
    formState: { isDirty, isValid },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update class ${resp.name} success`
          : `Create class ${resp.name} success`,
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
        <div className="row">
          <div className="col-md-6">
            <FormGroup
              label="Monthly Tuition Fee"
              id="tuitionFeePerMonth"
              isRequired
            >
              <Controller
                name="tuitionFeePerMonth"
                control={control}
                defaultValue=""
                render={({ onChange, value }, { invalid }) => (
                  <InputAmount
                    onChange={onChange}
                    value={value}
                    invalid={invalid}
                    placeholder="Monthly Tuition Fee"
                  />
                )}
              />
              <FormHookErrorMessage error={errors.tuitionFeePerMonth} />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup
              label="Absent Fee Return Per Day"
              id="absentFeeReturnPerDay"
              isRequired
            >
              <Controller
                name="absentFeeReturnPerDay"
                control={control}
                defaultValue=""
                render={({ onChange, value }, { invalid }) => (
                  <InputAmount
                    onChange={onChange}
                    value={value}
                    invalid={invalid}
                    placeholder="Absent Fee Return Per Day"
                  />
                )}
              />
              <FormHookErrorMessage error={errors.absentFeeReturnPerDay} />
            </FormGroup>
          </div>
        </div>

        <FormGroup label="Fee Per Trial Day" id="feePerTrialDay" isRequired>
          <Controller
            name="feePerTrialDay"
            control={control}
            defaultValue=""
            render={({ onChange, value }, { invalid }) => (
              <InputAmount
                onChange={onChange}
                value={value}
                invalid={invalid}
                placeholder="Fee Per Trial Day"
              />
            )}
          />
          <FormHookErrorMessage error={errors.feePerTrialDay} />
        </FormGroup>
        <div className="row">
          <div className="col-md-6">
            <FormGroup
              label="Meal Fee Per Month"
              id="mealFeePerMonth"
              isRequired
            >
              <Controller
                name="mealFeePerMonth"
                control={control}
                defaultValue=""
                render={({ onChange, value }, { invalid }) => (
                  <InputAmount
                    onChange={onChange}
                    value={value}
                    invalid={invalid}
                    placeholder="Meal Fee Per Month"
                  />
                )}
              />
              <FormHookErrorMessage error={errors.mealFeePerMonth} />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup
              label="Meal Fee Return Per Day"
              id="mealFeeReturnPerDay"
              isRequired
            >
              <Controller
                name="mealFeeReturnPerDay"
                control={control}
                defaultValue=""
                render={({ onChange, value }, { invalid }) => (
                  <InputAmount
                    onChange={onChange}
                    value={value}
                    invalid={invalid}
                    placeholder="Meal Fee Return Per Day"
                  />
                )}
              />
              <FormHookErrorMessage error={errors.mealFeeReturnPerDay} />
            </FormGroup>
          </div>
        </div>

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
