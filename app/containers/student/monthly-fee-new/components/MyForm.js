import React, { useEffect } from "react"
import * as Yup from "yup"
import PropTypes from "prop-types"
import { useLocation } from "react-router-dom"
import { Form, Table } from "reactstrap"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"
import { useFieldArray } from "react-hook-form"
import SubmitButton from "../../../../components/button/SubmitButton"
import BackButton from "../../../../components/button/BackButton"
import { useHookCRUDForm } from "../../../../libs/hooks/useHookCRUDForm"
import CreateButton from "../../../../components/button/CreateButton"
import FormDetail from "./FormDetail"
import "../../student.scss"
import useStudentConfigure from "../../../../libs/hooks/useStudentConfigure"
import Widget from "../../../../components/Widget/Widget"
import studentMonthlyFeeNewApi from "../../../../libs/apis/student/student-monthly-fee-new.api"
import { studentFeeCalculate } from "./student-fee.util"

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

function MyForm({ id }) {
  const { configure: studentConfig } = useStudentConfigure()
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
              studentClass: Yup.object().required("This field is required."),
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
    mappingToForm: (form) => ({
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
    }),
    mappingToServer: (form) => {
      const details = form.details.map((result) => {
        const studentClassConfigure = result.studentClass
        const {
          student,
          absentDay,
          studentClass,
          scholarShip,
          studentAbsentDay,
          monthYear,
          otherFee,
          otherDeduceFee,
          busFee,
          mealFee,
        } = result
        const {
          totalFee,
          absentDayFee,
          studentAbsentDayDeductMealFee,
          scholarShipFee,
        } = studentFeeCalculate({
          student,
          absentDay,
          studentClass,
          scholarShip,
          studentAbsentDay,
          monthYear,
          otherFee,
          otherDeduceFee,
          busFee,
          mealFee,
        })

        return {
          id: result.id,
          monthYear: result.monthYear,
          studentId: result.student.id,
          scholarShip: result.scholarShip,
          absentDay: result.absentDay,
          studentAbsentDay: result.studentAbsentDay,
          studentAbsentDayFee: studentAbsentDayDeductMealFee,
          trialDate: result.trialDate,
          busFee: result.busFee,
          mealFee: result.mealFee,
          otherFee: result.otherFee,
          otherFeeDesc: result.otherFeeDesc,
          extraData: result.extraData,
          remark: result.remark,
          scholarFee: scholarShipFee,
          feePerMonth: studentClassConfigure.tuitionFeePerMonth,
          absentDayFee,
          totalAmount: totalFee,
          privateId: result.privateId,
          class: result.studentClass,
        }
      })
      return {
        details,
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

  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate className="mt-10">
        <div className="table-responsive mb-5">
          <Table bordered striped size="sm">
            <thead>
              <tr>
                <th style={{ width: "200px" }}>
                  Month / Student
                  <br />
                  Scholar Ship<span className="text-danger">*</span>
                </th>
                <th className="min" style={{ verticalAlign: "middle", textAlign: "center" }}>
                  Chi phí bus, tiền ăn
                </th>
                <th style={{ width: "120px", verticalAlign: "middle", textAlign: "center" }}>
                  Chí phí khác
                </th>
                <th
                  className="min"
                  style={{ width: "120px", verticalAlign: "middle", textAlign: "center" }}
                >
                  Ngày nghỉ
                  <br /> (trả lại tiền)
                </th>
                <th style={{ width: "120px", verticalAlign: "middle", textAlign: "center" }}>
                  Tiền trả lại khác
                </th>

                <th style={{ width: "120px", verticalAlign: "middle", textAlign: "center" }}>
                  Remark
                </th>
                <th
                  className="min text-nowrap"
                  style={{ width: "120px", verticalAlign: "middle", textAlign: "center" }}
                >
                  Total
                </th>
                {id ? (
                  <></>
                ) : (
                  <th
                    className="action min"
                    style={{ verticalAlign: "middle", textAlign: "center" }}
                  >
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => (
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
