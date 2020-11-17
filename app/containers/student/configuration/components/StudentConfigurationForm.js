import React, { useEffect } from 'react';
import { Col, Form, FormGroup, Label, Row, Table } from 'reactstrap';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Controller, useFieldArray } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import Widget from '../../../../components/Widget/Widget';
import studentConfigurationApi from '../../../../libs/apis/student/student-config.api';
import { ERROR } from '../../../../components/Form/messages';
import useMyForm from '../../../../libs/hooks/useMyForm';
import FormError from '../../../../components/Form/FormError';
import FormErrorMessage from '../../../../components/Form/FormHookErrorMessage';
import SubmitButton from '../../../../components/button/SubmitButton';
import InputNumber from '../../../../components/Form/InputNumber';
import InputAmount from '../../../../components/Form/InputAmount';
import CreateButton from '../../../../components/button/CreateButton';
import BusRouteForm from './BusRouteForm';
import ClassForm from './ClassForm';

const StudentConfigurationForm = () => {
  const validationSchema = React.useMemo(
    () =>
      Yup.object().shape({
        numberDayOfMonth: Yup.number()
          .typeError(ERROR.required)
          .moreThan(0, ERROR.numberGT0)
          .required(ERROR.required),
        monthlyTuitionFee: Yup.number()
          .typeError(ERROR.required)
          .positive(ERROR.amountGT0)
          .required(ERROR.required),
        feePerDay: Yup.number()
          .typeError(ERROR.required)
          .positive(ERROR.amountGT0)
          .required(ERROR.required),
        feePerTrialDay: Yup.number()
          .typeError(ERROR.required)
          .positive(ERROR.amountGT0)
          .required(ERROR.required),
        mealFeePerDay: Yup.number()
          .typeError(ERROR.required)
          .positive(ERROR.amountGT0)
          .required(ERROR.required),
        busFee: Yup.number()
          .typeError(ERROR.required)
          .positive(ERROR.amountGT0)
          .required(ERROR.required),
        busRoutes: Yup.array()
          .of(
            Yup.object().shape({
              id: Yup.string().required(ERROR.required),
              name: Yup.string().required(ERROR.required),
            }),
          )
          .required(ERROR.required),
        classes: Yup.array()
          .of(
            Yup.object().shape({
              id: Yup.string().required(ERROR.required),
              name: Yup.string().required(ERROR.required),
            }),
          )
          .required(ERROR.required),
      }),
    [],
  );

  const {
    control,
    register,
    errors,
    onSubmit,
    reset,
    formState: { isValid, isDirty },
    state: { isLoading, errors: serverErrors, resp: submitResp },
  } = useMyForm({
    api: async data => {
      console.log(data);
      return studentConfigurationApi.save(data);
    },
    validationSchema,
    defaultValues: {
      numberDayOfMonth: 0,
      feePerDay: 0,
      monthlyTuitionFee: 0,
      feePerTrialDay: 0,
      mealFeePerDay: 0,
      busFee: 0,
      busRoutes: [{ id: '', name: '' }],
      classes: [{ id: '', name: '' }],
    },
  });

  useEffect(() => {
    studentConfigurationApi.get().then(resp => {
      console.log(resp);
      if (resp) {
        reset(resp);
      }
    });
  }, [reset]);

  useEffect(() => {
    if (submitResp) {
      toast.success(
        `Configuration Student success: ${JSON.stringify(submitResp)}`,
      );
    }
  }, [submitResp]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'busRoutes',
  });

  const {
    fields: classFields,
    append: classAppend,
    remove: classRemove,
  } = useFieldArray({
    control,
    name: 'classes',
  });

  const form = React.useMemo(
    () => (
      <Form onSubmit={onSubmit} noValidate formNoValidate>
        <Row>
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
            <FormGroup>
              <Label for="numberDayOfMonth">
                Number Day of Month <span className="text-danger">*</span>
              </Label>
              <Controller
                invalid={!!errors.numberDayOfMonth}
                name="numberDayOfMonth"
                control={control}
                as={InputNumber}
                defaultValue={0}
                placeholder="Number Day of Month"
              />
              <FormErrorMessage error={errors.numberDayOfMonth} />
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
            <FormGroup>
              <Label for="monthlyTuitionFee">
                Monthly Tuition Fee <span className="text-danger">*</span>
              </Label>
              <Controller
                type="number"
                name="monthlyTuitionFee"
                invalid={!!errors.monthlyTuitionFee}
                control={control}
                as={InputAmount}
                defaultValue={0}
                placeholder="Monthly Tuition Fee"
              />
              <FormErrorMessage error={errors.monthlyTuitionFee} />
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
            <FormGroup>
              <Label for="feePerDay">
                Fee Per Day <span className="text-danger">*</span>
              </Label>
              <Controller
                type="number"
                name="feePerDay"
                invalid={!!errors.feePerDay}
                control={control}
                as={InputAmount}
                defaultValue={0}
                placeholder="Fee Per Day"
              />
              <FormErrorMessage error={errors.feePerDay} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
            <FormGroup>
              <Label for="feePerTrialDay">
                Fee Per Trial Day <span className="text-danger">*</span>
              </Label>
              <Controller
                type="number"
                name="feePerTrialDay"
                invalid={!!errors.feePerTrialDay}
                control={control}
                as={InputAmount}
                defaultValue={0}
                placeholder="Fee Per Trial Day"
              />
              <FormErrorMessage error={errors.feePerTrialDay} />
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
            <FormGroup>
              <Label for="mealFeePerDay">
                Meal Fee Per Day <span className="text-danger">*</span>
              </Label>
              <Controller
                type="number"
                name="mealFeePerDay"
                invalid={!!errors.mealFeePerDay}
                control={control}
                as={InputAmount}
                defaultValue={0}
                placeholder="Meal Fee Per Day"
              />
              <FormErrorMessage error={errors.mealFeePerDay} />
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
            <FormGroup>
              <Label for="busFee">Bus Fee</Label>
              <Controller
                type="number"
                name="busFee"
                invalid={!!errors.busFee}
                control={control}
                as={InputAmount}
                defaultValue={0}
                placeholder="Bus Fee"
              />
              <FormErrorMessage error={errors.busFee} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="6" lg="6" xl="6">
            <FormGroup>
              <Label for="busRoutes">Bus Route</Label>
              <Table bordered hover striped size="sm">
                <thead>
                  <tr>
                    <th style={{ width: '30%' }}>
                      ID<span className="text-danger">*</span>
                    </th>
                    <th style={{ width: '250px' }}>
                      Name<span className="text-danger">*</span>
                    </th>
                    <th className="action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((item, index) => (
                    <BusRouteForm
                      key={item.key}
                      errors={errors}
                      register={register}
                      item={item}
                      index={index}
                      remove={remove}
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="6">
                      <CreateButton
                        size="sm"
                        type="button"
                        onClick={() => {
                          append({
                            id: '',
                            name: '',
                            key: uuidv4(),
                          });
                        }}
                      >
                        Add
                      </CreateButton>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="6" xl="6">
            <FormGroup>
              <Label for="classes">Class</Label>
              <Table bordered hover striped size="sm">
                <thead>
                  <tr>
                    <th style={{ width: '30%' }}>
                      ID<span className="text-danger">*</span>
                    </th>
                    <th style={{ width: '250px' }}>
                      Name<span className="text-danger">*</span>
                    </th>
                    <th className="action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {classFields.map((item, index) => (
                    <ClassForm
                      key={item.key}
                      errors={errors}
                      register={register}
                      item={item}
                      index={index}
                      remove={classRemove}
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="6">
                      <CreateButton
                        size="sm"
                        type="button"
                        onClick={() => {
                          classAppend({
                            id: '',
                            name: '',
                            key: uuidv4(),
                          });
                        }}
                      >
                        Add
                      </CreateButton>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </FormGroup>
          </Col>
        </Row>
        <SubmitButton isLoading={isLoading} disabled={!(isValid && isDirty)} />
      </Form>
    ),
    [onSubmit, errors, register, isLoading, reset],
  );
  return (
    <Widget>
      {serverErrors && serverErrors.length ? (
        <FormError errors={serverErrors} />
      ) : (
        ''
      )}
      {form}
    </Widget>
  );
};

StudentConfigurationForm.propTypes = {};

export default StudentConfigurationForm;
