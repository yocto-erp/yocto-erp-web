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
import studentMonthlyFeeApi from '../../../../libs/apis/student/student-monthly-fee.api';
import FormDetail from './FormDetail';
import { ERROR } from '../../../../components/Form/messages';
import '../../student.scss';

const { create, update, read } = studentMonthlyFeeApi;

function MyForm({ id }) {
  const validationSchema = React.useMemo(
    () =>
      Yup.object().shape({
        details: Yup.array()
          .of(
            Yup.object().shape({
              monthYear: Yup.date()
                .required('This field is required.')
                .nullable(true),
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
    formState: { isValid, isDirty },
    state: { isLoading },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update Student Monthly success`
          : `Create Monthly ${resp.name} success`,
      );
    },
    mappingToForm: form => ({
      details: form.details,
    }),
    mappingToServer: form => {
      console.log(form);
      console.log(id);
      const details = form.details.map(result => ({
        id: result.id,
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
        details,
      };
    },
    validationSchema,
    initForm: {
      details: [
        {
          id: '',
          monthYear: new Date(),
          student: null,
          scholarShip: '',
          absentDay: '',
          trialDate: '',
          busFee: 0,
          mealFee: 0,
          otherFee: '',
          otherDeduceFee: '',
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
        <FormGroup className="scroll-table-student">
          <div className="table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl">
            <Table bordered hover striped size="sm">
              <thead>
                <tr>
                  {id ? <th className="size-with-td-120">ID</th> : <></>}
                  <th className="size-with-td-120">
                    Month<span className="text-danger">*</span>
                  </th>
                  <th style={{ minWidth: '230px' }}>
                    Student<span className="text-danger">*</span>
                  </th>
                  <th style={{ minWidth: '150px' }}>
                    Scholar Ship<span className="text-danger">*</span>
                  </th>
                  <th style={{ minWidth: '130px' }}>
                    Absent Date<span className="text-danger">*</span>
                  </th>
                  <th className="size-with-td-120">
                    Trial Date<span className="text-danger">*</span>
                  </th>
                  <th className="size-with-td-120">Bus Fee</th>
                  <th className="size-with-td-120">Meal Fee</th>
                  <th style={{ minWidth: '150px' }}>Other Extra Fee</th>
                  <th style={{ minWidth: '160px' }}>Other Deduct Fee</th>
                  <th style={{ minWidth: '160px' }}>Remark</th>
                  <th>Total</th>
                  {id ? <></> : <th className="action">Action</th>}
                </tr>
              </thead>
              <tbody>
                {fields.map((item, index) => (
                  <FormDetail
                    key={index.toString()}
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
              {id ? (
                <></>
              ) : (
                <tfoot>
                  <tr>
                    <td colSpan="12">
                      <CreateButton
                        size="sm"
                        type="button"
                        onClick={() => {
                          append({
                            ids: uuidv4(),
                            id: '',
                            monthYear: new Date(),
                            student: null,
                            scholarShip: '',
                            absentDay: '',
                            trialDate: '',
                            busFee: 0,
                            mealFee: 0,
                            otherFee: '',
                            otherDeduceFee: '',
                            remark: '',
                          });
                        }}
                      >
                        Add
                      </CreateButton>
                    </td>
                  </tr>
                </tfoot>
              )}
            </Table>
          </div>
        </FormGroup>
        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} disabled={!(isValid && isDirty)} />
      </Form>
    );
  }, [errors, isLoading, submit, register, control, isValid, isDirty]);

  return <Widget>{form}</Widget>;
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
