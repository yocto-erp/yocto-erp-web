import React, { useEffect, useMemo, useState } from "react"
import * as Yup from "yup"
import PropTypes from "prop-types"
import { useLocation } from "react-router-dom"
import { Form, Table } from "reactstrap"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"
import { Controller, useFieldArray } from "react-hook-form"
import SubmitButton from "../../../../components/button/SubmitButton"
import BackButton from "../../../../components/button/BackButton"
import { useHookCRUDForm } from "../../../../libs/hooks/useHookCRUDForm"
import CreateButton from "../../../../components/button/CreateButton"
import FormDetail from "./FormDetail"
import "../../student.scss"
import useStudentConfigure from "../../../../libs/hooks/useStudentConfigure"
import Widget from "../../../../components/Widget/Widget"
import Price from "../../../../components/common/Price"
import studentMonthlyFeeNewApi from "../../../../libs/apis/student/student-monthly-fee-new.api"
import FormGroup from "../../../../components/Form/FormGroup"
import Label from "../../../../components/Form/Label"
import { SelectClass } from "../../student-class/components/SelectClass"

const { create, update, read } = studentMonthlyFeeNewApi

const transferUnNumber = (value) => (Number.isNaN(value) ? 0 : value)

const newFee = () => ({
  id: uuidv4(),
  monthYear: null,
  toMonthYear: null,
  student: null,
  scholarShip: "",
  absentDay: "",
  studentAbsentDay: "",
  trialDate: "",
  busFee: "",
  mealFee: "",
  otherFee: "",
  otherDeduceFee: "",
  remark: "",
  debt: "",
  privateId: null,
})

function MyForm({ id }) {
  const { configure: studentConfig } = useStudentConfigure()
  const [className, setClassName] = useState()
  const location = useLocation()

  const validationSchema = React.useMemo(
    () =>
      Yup.object().shape({
        details: Yup.array()
          .of(
            Yup.object().shape({
              monthYear: Yup.object()
                .required("This field is required.")
                .nullable(true),
              student: Yup.object()
                .required("Student is required.")
                .nullable(true),
              scholarShip: Yup.number().transform(transferUnNumber),
              absentDay: Yup.number().transform(transferUnNumber),
              studentAbsentDay: Yup.number().transform(transferUnNumber),
              trialDate: Yup.number().transform(transferUnNumber),
              otherFee: Yup.number().transform(transferUnNumber),
              debt: Yup.number().transform(transferUnNumber),
              otherDeduceFee: Yup.number().transform(transferUnNumber),
            }),
          )
          .required("Details is required"),
        class: Yup.object().shape({
          name: Yup.string().required(),
        }),
      }),
    [],
  )
  const {
    control,
    register,
    submit,
    getValues,
    setValue,
    trigger,
    formState,
    state: { isLoading, errors: serverErrors },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: () => {
      toast.success(
        id ? `Update Student Monthly Fees success` : `Create Student Monthly Fees success`,
      )
    },
    mappingToForm: (form) => {
      let data
      return {
        details: form.map((t) => {
          const monthYear = {
            from: {
              month: t.monthFee,
              year: t.yearFee,
            },
            to: null,
            numberOfMonths: t.numberOfMonths || 1,
          }
          if (t.numberOfMonths > 1) {
            monthYear.to = {
              month: t.toMonth,
              year: t.toYear,
            }
          }
          data = t.class
          return {
            ...t,
            monthYear,
            class: t.class,
          }
        }),
        class: data,
      }
    },
    mappingToServer: (form) => {
      const details = form.details.map((result) => {
        /* const studentClassConfigure = studentConfig.classes.find(
          clz => clz.id === result.student.class,
        ); */
        const studentClassConfigure = form?.class
        const trialDateFee = result.trialDate * studentClassConfigure?.feePerTrialDay
        const absentDayFee = result.absentDay * studentClassConfigure?.absentFeeReturnPerDay

        const studentAbsentDayFee = result.student.enableMeal
          ? studentClassConfigure?.mealFeeReturnPerDay * result.studentAbsentDay
          : 0

        const totalAmountWithoutScholarShip =
          studentClassConfigure?.tuitionFeePerMonth * result.monthYear.numberOfMonths -
          absentDayFee -
          studentAbsentDayFee +
          trialDateFee +
          result.busFee +
          result.mealFee +
          (result.otherFee || 0) -
          (result.otherDeduceFee || 0) +
          (result.debt || 0)

        const scholarFee =
          ((studentClassConfigure?.tuitionFeePerMonth * result.monthYear.numberOfMonths -
            absentDayFee) *
            (result.scholarShip || 0)) /
          100
        const totalAmount = totalAmountWithoutScholarShip - scholarFee
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
          debt: result.debt,
          scholarFee,
          feePerMonth: studentClassConfigure?.tuitionFeePerMonth,
          trialDateFee,
          absentDayFee,
          totalAmount,
          privateId: result.privateId,
          class: form?.class,
        }
      })
      return {
        details,
        class: form?.class,
      }
    },
    validationSchema,
    initForm: {
      details: [],
      class: null,
    },
    id,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
    keyName: "fId",
  })
  useEffect(() => {
    if (serverErrors && serverErrors.length) {
      toast.error(serverErrors.map((t) => t.message).join("<br/>"))
    }
  }, [serverErrors])

  useEffect(() => {
    if (!id) {
      const details = location?.state?.details || [newFee()]
      setValue("details", details)
    }
  }, [location, id])

  const configure = useMemo(
    () =>
      studentConfig ? (
        <div>
          <table className="table table-bordered table-sm">
            <tbody>
              <tr>
                <td className="min font-weight-bold">Days Of Month</td>
                <td className="text-nowrap">{studentConfig.numberDayOfMonth}</td>
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
      ) : null,
    [studentConfig],
  )

  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate className="mt-10">
        <div className="row">
          <div className="col-4">{configure}</div>
          <div className="col-6">
            <FormGroup>
              <Label for="class" className="required">
                Class
              </Label>
              <Controller
                name="class"
                control={control}
                render={({ onChange, name, value, ...data }, { invalid }) => (
                  <SelectClass
                    id="class"
                    placeholder="Chọn lớp học"
                    invalid={invalid}
                    name={name}
                    onChange={(val) => {
                      onChange(val)
                      setClassName(val)
                    }}
                    value={value}
                    {...data}
                  />
                )}
              />
            </FormGroup>
          </div>
        </div>
        <div className="table-responsive my-5">
          <Table bordered striped size="sm">
            <thead>
              <tr>
                <th style={{ width: "250px" }}>
                  Month / Student<span className="text-danger">*</span>
                </th>
                <th className="min">Scholar Ship</th>
                <th className="min">Absent Day(s)</th>
                <th className="min">Trial Day(s)</th>
                <th style={{ width: "100px" }}>Bus Fee</th>
                <th style={{ width: "100px" }}>Meal Fee</th>
                <th style={{ width: "120px" }}>Other Fee</th>
                <th>Remark</th>
                <th className="min text-nowrap">Total</th>
                {id ? <></> : <th className="action">Action</th>}
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => {
                return (
                  <FormDetail
                    studentConfig={studentConfig}
                    key={item.id}
                    control={control}
                    register={register}
                    getValues={getValues}
                    setValue={setValue}
                    item={item}
                    index={index}
                    remove={remove}
                    trigger={trigger}
                    isUpdated={!!id}
                    formState={formState}
                    className={className}
                  />
                )
              })}
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
                        append(newFee())
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
        <SubmitButton isLoading={isLoading} disabled={!(formState.isValid && formState.isDirty)} />
      </Form>
    ),
    [isLoading, studentConfig, id, fields, formState],
  )

  return <Widget>{form}</Widget>
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

MyForm.defaultProps = {}

export default MyForm
