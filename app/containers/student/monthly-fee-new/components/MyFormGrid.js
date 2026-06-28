import React, { useEffect } from "react"
import * as Yup from "yup"
import PropTypes from "prop-types"
import { Form } from "reactstrap"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"
import { useFieldArray } from "react-hook-form"
import SubmitButton from "../../../../components/button/SubmitButton"
import BackButton from "../../../../components/button/BackButton"
import { useHookCRUDForm } from "../../../../libs/hooks/useHookCRUDForm"
import CreateButton from "../../../../components/button/CreateButton"
import "../../student.scss"
import useStudentConfigure from "../../../../libs/hooks/useStudentConfigure"
import Widget from "../../../../components/Widget/Widget"
import studentMonthlyFeeNewApi from "../../../../libs/apis/student/student-monthly-fee-new.api"
import StudentFeeForm from "./new-layout/StudentFeeForm"

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
  studentClass: null,
})

const validationSchema = Yup.object().shape({
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
        studentClass: Yup.object().shape({
          name: Yup.string().required(),
        }),
      }),
    )
    .required("Details is required"),
})

function MyFormGrid({ id }) {
  const { configure: studentConfig } = useStudentConfigure()

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
      console.log("MappingToForm", form)
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
          return {
            ...t,
            monthYear,
            studentClass: t.class,
          }
        }),
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

  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate className="mt-10">
        {!id && (
          <div className="row mb-4">
            <div className="col-4">
              <CreateButton
                size="sm"
                type="button"
                onClick={() => {
                  append(newFee())
                }}
              >
                Add Student
              </CreateButton>
            </div>
          </div>
        )}
        <div className="row">
          {fields.map((item, index) => (
            <div className="col-md-6 col-sm-6" key={item.id}>
              <StudentFeeForm
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
              />
            </div>
          ))}
        </div>
        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} disabled={!(formState.isValid && formState.isDirty)} />
      </Form>
    ),
    [isLoading, studentConfig, id, fields, formState],
  )

  return <Widget>{form}</Widget>
}

MyFormGrid.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

MyFormGrid.defaultProps = {}

export default MyFormGrid
