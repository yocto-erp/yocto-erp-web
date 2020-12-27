import React, { useMemo } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, Table } from 'reactstrap';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useFieldArray } from 'react-hook-form';
import SubmitButton from '../../../../components/button/SubmitButton';
import BackButton from '../../../../components/button/BackButton';
import { useHookCRUDForm } from '../../../../libs/hooks/useHookCRUDForm';
import CreateButton from '../../../../components/button/CreateButton';
import studentMonthlyFeeApi from '../../../../libs/apis/student/student-monthly-fee.api';
import FormDetail from './FormDetail';
import '../../student.scss';
import useStudentConfigure from '../../../../libs/hooks/useStudentConfigure';
import Widget from '../../../../components/Widget/Widget';
import Price from '../../../../components/common/Price';

const { create, update, read } = studentMonthlyFeeApi;

const transferUnNumber = value => (Number.isNaN(value) ? 0 : value);

function MyForm({ id }) {
  const { configure: studentConfig } = useStudentConfigure();

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
                .required('Student is required.')
                .nullable(true),
              scholarShip: Yup.number().transform(transferUnNumber),
              absentDay: Yup.number().transform(transferUnNumber),
              studentAbsentDay: Yup.number().transform(transferUnNumber),
              trialDate: Yup.number().transform(transferUnNumber),
              otherFee: Yup.number().transform(transferUnNumber),
              otherDeduceFee: Yup.number().transform(transferUnNumber),
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
    trigger,
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
    mappingToForm: form => {
      console.log('from server', form);
      return {
        details: form.map(t => ({
          ...t,
          monthYear: new Date(t.yearFee, t.monthFee),
        })),
      };
    },
    mappingToServer: form => {
      console.log(form);
      console.log(id);
      const details = form.details.map(result => {
        const studentClassConfigure = studentConfig.classes.find(
          clz => clz.id === result.student.class,
        );
        const trialDateFee =
          result.trialDate * studentClassConfigure.feePerTrialDay;
        const absentDayFee =
          result.absentDay *
          studentClassConfigure.feePerDay *
          (1 - result.scholarShip / 100);
        const studentAbsentDayFee = result.student.enableMeal
          ? studentClassConfigure.mealFeePerDay * result.studentAbsentDay
          : 0;
        const scholarFee =
          studentClassConfigure.tuitionFee * (result.scholarShip / 100);
        const totalAmount =
          studentClassConfigure.tuitionFee -
          scholarFee -
          absentDayFee +
          trialDateFee +
          result.busFee +
          result.mealFee +
          result.otherFee -
          result.otherDeduceFee;
        return {
          id: result.id,
          monthYear: result.monthYear,
          studentId: result.student.id,
          scholarShip: result.scholarShip,
          absentDay: result.absentDay,
          studentAbsentDay: result.studentAbsentDay,
          studentAbsentDayFee,
          trialDate: result.trialDate,
          busFee: result.busFee,
          mealFee: result.mealFee,
          otherFee: result.otherFee,
          otherDeduceFee: result.otherDeduceFee,
          remark: result.remark,
          scholarFee,
          feePerMonth: studentClassConfigure.tuitionFee,
          trialDateFee,
          absentDayFee,
          totalAmount,
        };
      });
      return {
        details,
      };
    },
    validationSchema,
    initForm: {
      details: [
        {
          id: uuidv4(),
          monthYear: new Date(),
          student: null,
          scholarShip: '',
          absentDay: '',
          studentAbsentDay: '',
          trialDate: '',
          busFee: '',
          mealFee: '',
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
    keyName: 'fId',
  });

  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate>
        <div className="table-responsive mb-4">
          <Table bordered striped size="sm">
            <thead>
              <tr>
                <th style={{ width: '250px' }}>
                  Month / Student<span className="text-danger">*</span>
                </th>
                <th className="min">Scholar Ship</th>
                <th className="min">Absent Day(s)</th>
                <th className="min">Trial Day(s)</th>
                <th style={{ width: '100px' }}>Bus Fee</th>
                <th style={{ width: '100px' }}>Meal Fee</th>
                <th style={{ width: '120px' }}>Other Fee</th>
                <th>Remark</th>
                <th className="min text-nowrap">Total</th>
                {id ? <></> : <th className="action">Action</th>}
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => (
                <FormDetail
                  studentConfig={studentConfig}
                  key={item.id}
                  control={control}
                  errors={errors}
                  register={register}
                  getValues={getValues}
                  setValue={setValue}
                  item={item}
                  index={index}
                  remove={remove}
                  trigger={trigger}
                  isUpdated={!!id}
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
                          id: uuidv4(),
                          monthYear: new Date(),
                          student: null,
                          scholarShip: '',
                          absentDay: '',
                          studentAbsentDay: '',
                          trialDate: '',
                          busFee: '',
                          mealFee: '',
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

        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} disabled={!(isValid && isDirty)} />
      </Form>
    ),
    [
      errors,
      isLoading,
      submit,
      register,
      control,
      isValid,
      isDirty,
      studentConfig,
    ],
  );

  const configure = useMemo(
    () =>
      studentConfig ? (
        <div className="row mb-4">
          <div className="col-4">
            <table className="table table-bordered table-sm">
              <tbody>
                <tr>
                  <td className="min font-weight-bold">Days Of Month</td>
                  <td className="text-nowrap">
                    {studentConfig.numberDayOfMonth}
                  </td>
                </tr>
                <tr>
                  <td className="min font-weight-bold">Bus Fee</td>
                  <td className="text-nowrap">
                    <Price amount={studentConfig.busFee} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : null,
    [studentConfig],
  );

  return (
    <Widget>
      {configure}
      {form}
    </Widget>
  );
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
