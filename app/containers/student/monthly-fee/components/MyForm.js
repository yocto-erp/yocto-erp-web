import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, FormGroup, Table } from 'reactstrap';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useFieldArray } from 'react-hook-form';
import Widget from '../../../../components/Widget/Widget';
import SubmitButton from '../../../../components/button/SubmitButton';
import BackButton from '../../../../components/button/BackButton';
import { useHookCRUDForm } from '../../../../libs/hooks/useHookCRUDForm';
import CreateButton from '../../../../components/button/CreateButton';
import purchaseApi from '../../../../libs/apis/order/purchase.api';
import FormDetail from './FormDetail';
import { ERROR } from '../../../../components/Form/messages';

const { create, update, read } = purchaseApi;

function MyForm({ id }) {
  const validationSchema = React.useMemo(
    () =>
      Yup.object().shape({
        details: Yup.array()
          .of(
            Yup.object().shape({
              monthYear: Yup.date()
                .typeError(ERROR.required)
                .required(ERROR.required),
              student: Yup.object()
                .required('This field is required.')
                .nullable(true),
              scholarShip: Yup.number()
                .typeError(ERROR.required)
                .moreThan(0, ERROR.numberGT0)
                .required(ERROR.required),
              absentDay: Yup.number()
                .typeError(ERROR.required)
                .moreThan(0, ERROR.numberGT0)
                .required(ERROR.required),
              trialDate: Yup.number()
                .typeError(ERROR.required)
                .moreThan(0, ERROR.numberGT0)
                .required(ERROR.required),
              busFee: Yup.number()
                .typeError(ERROR.required)
                .moreThan(0, ERROR.numberGT0)
                .required(ERROR.required),
              mealFee: Yup.number()
                .typeError(ERROR.required)
                .moreThan(0, ERROR.numberGT0)
                .required(ERROR.required),
              otherFee: Yup.number()
                .typeError(ERROR.required)
                .moreThan(0, ERROR.numberGT0)
                .required(ERROR.required),
              otherDeduceFee: Yup.number()
                .typeError(ERROR.required)
                .moreThan(0, ERROR.numberGT0)
                .required(ERROR.required),
            }),
          )
          .required('Details is required'),
      }),
    [],
  );
  const {
    control,
    register,
    submit,
    errors,
    getValues,
    setValue,
    state: { isLoading, formData },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update Student Monthly ${resp.name} success`
          : `Create Monthly ${resp.name} success`,
      );
    },
    mappingToForm: form => ({
      details: form.details.map(t => ({ ...t, id: uuidv4() })),
    }),
    mappingToServer: form => {
      const details = form.details.map(result => ({
        monthYear: result.monthYear,
        studentId: result.student.id,
        scholarShip: result.scholarShip,
        absentDay: result.absentDay,
        trialDate: result.trialDate,
        busFee: result.busFee,
        mealFee: result.mealFee,
        otherFee: result.otherFee,
        otherDeduceFee: result.otherDeduceFee,
        remark: result.remark,
      }));
      return {
        name: form.name,
        partnerCompanyId: form.partnerCompanyId.id,
        partnerPersonId: form.partnerPersonId.id,
        remark: form.remark,
        details,
      };
    },
    validationSchema,
    initForm: {
      details: [
        {
          monthYear: new Date(),
          student: null,
          quantity: 0,
          price: 0,
          remark: '',
        },
      ],
    },
    id,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details',
  });

  const form = React.useMemo(() => {
    console.log('cache');
    return (
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormGroup>
          <Table bordered hover striped size="sm">
            <thead>
              <tr>
                <th style={{ width: '10%' }}>
                  Month<span className="text-danger">*</span>
                </th>
                <th style={{ width: '20%' }}>
                  Student<span className="text-danger">*</span>
                </th>
                <th style={{ width: '150px' }}>
                  Scholar Ship<span className="text-danger">*</span>
                </th>
                <th style={{ width: '150px' }}>
                  Absent Date<span className="text-danger">*</span>
                </th>
                <th style={{ width: '150px' }}>
                  Trial Date<span className="text-danger">*</span>
                </th>
                <th style={{ width: '150px' }}>
                  Bus Fee<span className="text-danger">*</span>
                </th>
                <th style={{ width: '150px' }}>
                  Meal Fee<span className="text-danger">*</span>
                </th>
                <th style={{ width: '150px' }}>
                  Other Extra Fee<span className="text-danger">*</span>
                </th>
                <th style={{ width: '150px' }}>
                  Other Deduct Fee<span className="text-danger">*</span>
                </th>
                <th>Remark</th>
                <th>Total</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => (
                <FormDetail
                  key={item.id}
                  control={control}
                  errors={errors}
                  register={register}
                  getValues={getValues}
                  setValue={setValue}
                  item={item}
                  index={index}
                  remove={remove}
                />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="12">
                  <CreateButton
                    size="sm"
                    type="button"
                    onClick={() => {
                      append({
                        id: uuidv4(),
                        monthYear: new Date(),
                        student: null,
                        scholarShip: 0,
                        absentDay: 0,
                        trialDate: 0,
                        busFee: 0,
                        mealFee: 0,
                        otherFee: 0,
                        otherDeduceFee: 0,
                        remark: '',
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
        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} />
      </Form>
    );
  }, [errors, isLoading, submit, register, control]);
  console.log('MyForm');

  return <Widget>{form}</Widget>;
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
