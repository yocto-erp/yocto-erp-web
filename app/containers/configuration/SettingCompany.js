import React, { useEffect, useState } from "react"
import * as yup from "yup"
import { Form } from "reactstrap"
import { toast } from "react-toastify"
import { Controller } from "react-hook-form"
import { Link } from "react-router-dom"
import Widget from "../../components/Widget/Widget"
import useMyForm from "../../libs/hooks/useMyForm"
import { CompanySettingApi } from "../../libs/apis/configuration/company-setting.api"
import { ERROR } from "../../components/Form/messages"
import FormGroupInput from "../../components/Form/FormGroupInput"
import BackButton from "../../components/button/BackButton"
import SubmitButton from "../../components/button/SubmitButton"
import { API_STATE } from "../../libs/hooks/useApi"
import FormError from "../../components/Form/FormError"
import DateSelect from "../../components/date/DateSelect"
import FormHookErrorMessage from "../../components/Form/FormHookErrorMessage"
import FormGroup from "../../components/Form/FormGroup"
import Label from "../../components/Form/Label"
import { parseIso } from "../../libs/utils/date.util"
import { IconEdit } from "../Icon/constants"
import { COMPANY_SCHOOL_UPDATE } from "../CompanySchool/constants"
import DateView from "../../components/common/date/DateView"

const validationSchema = yup.object().shape({
  name: yup.string().required(ERROR.required),
  gsm: yup.string().required(ERROR.required),
  publicId: yup
    .string()
    .max(64)
    .required(ERROR.required),
})

const SettingCompany = () => {
  const [schoolUpdate, setSchoolUpdate] = useState(null)
  const [category, setCategory] = useState(null)
  const {
    register,
    control,
    onSubmit,
    formState: { isValid, isDirty, errors },
    state,
    reset,
  } = useMyForm({
    api: CompanySettingApi.save,
    validationSchema,
  })

  useEffect(() => {
    if (state.status === API_STATE.SUCCESS) {
      toast.success("Update company success")
    }
  }, [state])

  useEffect(() => {
    CompanySettingApi.get().then((t) => {
      const values = {
        ...t,
        establishedDate: t.establishedDate ? parseIso(t.establishedDate) : null,
      }
      reset(values)
      setCategory(t.category)
      setSchoolUpdate(t.schoolUpdate)
    })
  }, [])

  return (
    <>
      <div>{state.status === API_STATE.FAIL ? <FormError errors={state.errors} /> : null}</div>
      <div className="row">
        <div className="col-md-5">
          <div className="mb-4">
            <h2>General Information </h2>
          </div>
          <Widget>
            <Form onSubmit={onSubmit} noValidate>
              <FormGroupInput
                isRequired
                name="publicId"
                label="Public Id"
                register={register}
                error={errors.publicId}
                type="text"
                placeholder="Public Id"
              />
              <FormGroupInput
                name="name"
                label="Name"
                register={register}
                error={errors.name}
                type="text"
                placeholder="Company Name"
              />
              <FormGroupInput
                name="englishName"
                label="English Name"
                register={register}
                error={errors.englishName}
                type="text"
                placeholder="Company Name English"
              />
              <FormGroupInput
                name="gsm"
                label="Phone Number"
                register={register}
                error={errors.gsm}
                type="text"
                placeholder="Phone Number"
              />
              <FormGroupInput
                name="email"
                label="Email"
                register={register}
                error={errors.email}
                type="text"
                placeholder="Email"
              />
              <FormGroupInput
                name="website"
                label="Website"
                register={register}
                error={errors.website}
                type="text"
                placeholder="Link Website"
              />
              <FormGroupInput
                name="facebook"
                label="Facebook"
                register={register}
                error={errors.facebook}
                type="text"
                placeholder="Link Facebook"
              />
              <FormGroup>
                <Label for="establishedDate" className="mr-sm-2">
                  Established Date
                </Label>
                <Controller
                  name="establishedDate"
                  control={control}
                  render={({ value, onChange }, { invalid }) => (
                    <div>
                      <DateSelect
                        value={value}
                        onChange={onChange}
                        invalid={invalid}
                        placeholder="dd/mm/yyyy"
                      />
                    </div>
                  )}
                />
                <FormHookErrorMessage error={errors.establishedDate} />
              </FormGroup>
              <FormGroupInput
                name="address"
                label="Address"
                register={register}
                type="text"
                placeholder="Address"
              />
              <FormGroupInput
                name="remark"
                label="Introduction"
                register={register}
                type="textarea"
                placeholder="Introduction"
              />
              <BackButton className="mr-2" />
              <SubmitButton
                isLoading={state.status === API_STATE.LOADING}
                disabled={!isDirty || !isValid}
              />
            </Form>
          </Widget>
        </div>
        {category && Number(category) === 2 && (
          <div className="col-md-7">
            <div className="display-flex justify-content-between mb-4">
              <div>
                <h2>Information School </h2>
              </div>
              <div className="d-block">
                <Link className="btn btn-primary font-weight-bolder" to={COMPANY_SCHOOL_UPDATE}>
                  Update School
                  <IconEdit className="ml-2" size={24} />
                </Link>
              </div>
            </div>
            {schoolUpdate ? (
              <Widget>
                <div className="row">
                  <div className="col-md-6">
                    <strong>LastUpdated:</strong> <DateView date={schoolUpdate.lastUpdated} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <strong>Name Owner:</strong> {schoolUpdate.fullNameOwner}
                  </div>
                  <div className="col-md-6">
                    <strong>Name Manage:</strong> {schoolUpdate.fullNameManage}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <strong>Region:</strong> {schoolUpdate.region}
                  </div>
                  <div className="col-md-6">
                    <strong>Level:</strong> {schoolUpdate.level}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <strong>Student Size:</strong> {schoolUpdate.studentSize}
                  </div>
                  <div className="col-md-6">
                    <strong>Joined Date:</strong> <DateView date={schoolUpdate.joinedDate} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <strong>Number Worker:</strong> {schoolUpdate.numberWorker}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <strong>Type Organization:</strong> {schoolUpdate.typeOrganization}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <strong>Legal Structure:</strong> {schoolUpdate.legalStructure}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <strong>Info Class:</strong> {schoolUpdate.infoClass}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <strong>Organizational Structure:</strong>{" "}
                    {schoolUpdate.organizationalStructure}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <strong>Method Teacher:</strong> {schoolUpdate.methodTeacher}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <strong>Method School:</strong> {schoolUpdate.methodSchool}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <strong>Demand This Year:</strong> {schoolUpdate.demandThisYear}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <strong>Description Last Year:</strong> {schoolUpdate.descriptionLastYear}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">Suggestion: {schoolUpdate.suggestion}</div>
                </div>
              </Widget>
            ) : (
              <Widget>
                <div className="text-center">No Data</div>{" "}
              </Widget>
            )}
          </div>
        )}
      </div>
    </>
  )
}

SettingCompany.propTypes = {}

export default SettingCompany
