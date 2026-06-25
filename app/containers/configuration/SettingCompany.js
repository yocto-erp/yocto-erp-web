import React, { useEffect, useState } from "react"
import * as yup from "yup"
import { Form } from "reactstrap"
import { toast } from "react-toastify"
import { Controller } from "react-hook-form"
import { Link } from "react-router-dom"
import { FormattedMessage } from "react-intl"
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
import { formatDate, formatDateOnlyFromStr, parseIso } from "../../libs/utils/date.util"
import { IconEdit } from "../Icon/constants"
import { COMPANY_SCHOOL_UPDATE } from "../CompanySchool/constants"
import messages from "./messages"
import commonCompanyMessages from "../../components/common/company/messages"

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
          <div className="mb-4 display-flex">
            <h2>
              <FormattedMessage {...messages.title} />{" "}
            </h2>
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
              <FormattedMessage {...commonCompanyMessages.formName}>
                {(label) => (
                  <FormGroupInput
                    name="name"
                    label={label}
                    register={register}
                    error={errors.name}
                    type="text"
                    placeholder={label}
                  />
                )}
              </FormattedMessage>
              <FormattedMessage {...commonCompanyMessages.formEmail}>
                {(label) => (
                  <FormGroupInput
                    name="englishName"
                    label={label}
                    register={register}
                    error={errors.englishName}
                    type="text"
                    placeholder={label}
                  />
                )}
              </FormattedMessage>
              <FormattedMessage {...commonCompanyMessages.formGSM}>
                {(label) => (
                  <FormGroupInput
                    name="gsm"
                    label={label}
                    register={register}
                    error={errors.gsm}
                    type="text"
                    placeholder={label}
                  />
                )}
              </FormattedMessage>
              <FormattedMessage {...commonCompanyMessages.formEmail}>
                {(label) => (
                  <FormGroupInput
                    name="email"
                    label={label}
                    register={register}
                    error={errors.email}
                    type="text"
                    placeholder={label}
                  />
                )}
              </FormattedMessage>
              <FormattedMessage {...commonCompanyMessages.formWebsite}>
                {(label) => (
                  <FormGroupInput
                    name="website"
                    label={label}
                    register={register}
                    error={errors.website}
                    type="url"
                    placeholder={label}
                  />
                )}
              </FormattedMessage>
              <FormattedMessage {...commonCompanyMessages.formFacebook}>
                {(label) => (
                  <FormGroupInput
                    name="facebook"
                    label={label}
                    register={register}
                    error={errors.facebook}
                    type="url"
                    placeholder={label}
                  />
                )}
              </FormattedMessage>
              <FormattedMessage {...commonCompanyMessages.formEstablishedDate}>
                {(label) => (
                  <FormGroup label={label}>
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
                )}
              </FormattedMessage>
              <FormGroupInput
                name="address"
                label={<FormattedMessage {...commonCompanyMessages.formAddress} />}
                register={register}
                type="text"
                placeholder="Address"
              />
              <FormGroupInput
                name="remark"
                label={<FormattedMessage {...commonCompanyMessages.formRemark} />}
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
            <div className="display-flex justify-content-between align-items-center mb-4">
              <h2>
                <FormattedMessage {...messages.schoolTitle} />
              </h2>
              <Link className="btn btn-sm btn-primary" to={COMPANY_SCHOOL_UPDATE}>
                <FormattedMessage {...messages.btnUpdateSchool} />
                <IconEdit className="ml-2" size={24} />
              </Link>
            </div>
            {schoolUpdate ? (
              <Widget>
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td>
                        <strong>
                          <FormattedMessage {...commonCompanyMessages.schoolOwner} />
                        </strong>
                      </td>
                      <td>{schoolUpdate.fullNameOwner}</td>
                      <td>
                        <strong>
                          <FormattedMessage {...commonCompanyMessages.schoolManager} />
                        </strong>
                      </td>
                      <td>{schoolUpdate.fullNameManage}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <FormattedMessage {...commonCompanyMessages.schoolRegion} />
                        </strong>
                      </td>
                      <td>
                        <ul className="list-inline">
                          {schoolUpdate.region.map((t) => (
                            <li key={t.value} className="list-inline-item badge">
                              <span className="badge badge-info">{t.name}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <strong>
                          <FormattedMessage {...commonCompanyMessages.schoolLevel} />
                        </strong>
                      </td>
                      <td>
                        <ul className="list-inline">
                          {schoolUpdate.level.map((t) => (
                            <li key={t.value} className="list-inline-item badge">
                              <span className="badge badge-info">{t.name}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <FormattedMessage {...commonCompanyMessages.schoolStudentSize} />
                        </strong>
                      </td>
                      <td>{schoolUpdate.studentSize}</td>
                      <td>
                        {" "}
                        <strong>
                          <FormattedMessage {...commonCompanyMessages.schoolJoinSWAN} />
                        </strong>
                      </td>
                      <td>{formatDateOnlyFromStr(schoolUpdate.joinedDate)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <FormattedMessage {...commonCompanyMessages.staff} />
                        </strong>
                      </td>
                      <td colSpan="3">{schoolUpdate.numberWorker}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <FormattedMessage {...commonCompanyMessages.typeOrganization} />
                        </strong>
                      </td>
                      <td colSpan="3">
                        <div className="form-group">
                          <textarea
                            readOnly
                            rows={4}
                            className="form-control"
                            style={{ resize: "none" }}
                          >
                            {schoolUpdate.typeOrganization}
                          </textarea>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <FormattedMessage {...commonCompanyMessages.structureOrganization} />
                        </strong>
                      </td>
                      <td colSpan="3">
                        <div className="form-group">
                          <textarea
                            readOnly
                            rows={4}
                            className="form-control"
                            style={{ resize: "none" }}
                          >
                            {schoolUpdate.legalStructure}
                          </textarea>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <FormattedMessage {...commonCompanyMessages.classesDetail} />
                        </strong>
                      </td>
                      <td colSpan="3">
                        <div className="form-group">
                          <textarea
                            readOnly
                            rows={4}
                            className="form-control"
                            style={{ resize: "none" }}
                          >
                            {schoolUpdate.infoClass}
                          </textarea>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <FormattedMessage {...commonCompanyMessages.teachingMethod} />
                        </strong>
                      </td>
                      <td colSpan="3">
                        <div className="form-group">
                          <textarea
                            readOnly
                            rows={4}
                            className="form-control"
                            style={{ resize: "none" }}
                          >
                            {schoolUpdate.organizationalStructure}
                          </textarea>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <FormattedMessage {...commonCompanyMessages.certificate} />
                        </strong>
                      </td>
                      <td colSpan="3">
                        <div className="form-group">
                          <textarea
                            readOnly
                            rows={4}
                            className="form-control"
                            style={{ resize: "none" }}
                          >
                            {schoolUpdate.methodTeacher}
                          </textarea>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <FormattedMessage {...commonCompanyMessages.mentor} />
                        </strong>
                      </td>
                      <td colSpan="3">
                        <div className="form-group">
                          <textarea
                            readOnly
                            rows={4}
                            className="form-control"
                            style={{ resize: "none" }}
                          >
                            {schoolUpdate.methodSchool}
                          </textarea>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <FormattedMessage {...commonCompanyMessages.lastYearSummary} />
                        </strong>
                      </td>
                      <td colSpan="3">
                        <div className="form-group">
                          <textarea
                            readOnly
                            rows={4}
                            className="form-control"
                            style={{ resize: "none" }}
                          >
                            {schoolUpdate.descriptionLastYear}
                          </textarea>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <FormattedMessage {...commonCompanyMessages.nextYearSummary} />
                        </strong>
                      </td>
                      <td colSpan="3">
                        <div className="form-group">
                          <textarea
                            readOnly
                            rows={4}
                            className="form-control"
                            style={{ resize: "none" }}
                          >
                            {schoolUpdate.demandThisYear}
                          </textarea>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <FormattedMessage {...commonCompanyMessages.suggestion} />
                        </strong>
                      </td>
                      <td colSpan="3">
                        <div className="form-group">
                          <textarea
                            readOnly
                            rows={4}
                            className="form-control"
                            style={{ resize: "none" }}
                          >
                            {schoolUpdate.suggestion}
                          </textarea>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <FormattedMessage {...commonCompanyMessages.lastUpdated} />
                        </strong>
                      </td>
                      <td colSpan="3">{formatDate(new Date(schoolUpdate.lastUpdated))}</td>
                    </tr>
                  </tbody>
                </table>
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
