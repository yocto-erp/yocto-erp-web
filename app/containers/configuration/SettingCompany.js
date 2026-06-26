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
import { hasText } from "../../utils/util"

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
    form: { establishedDate: "" },
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
                <table className="table table-borderless report">
                  <tbody>
                    <tr>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.schoolOwner} />
                      </td>
                      <td className="value">{schoolUpdate.fullNameOwner}</td>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.schoolManager} />
                      </td>
                      <td className="value">{schoolUpdate.fullNameManage}</td>
                    </tr>
                    <tr>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.schoolRegion} />
                      </td>
                      <td className="value">
                        <ul className="list-inline">
                          {schoolUpdate.region.map((t) => (
                            <li key={t.value} className="list-inline-item badge">
                              <span className="badge badge-info">{t.name}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.schoolLevel} />
                      </td>
                      <td className="value">
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
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.schoolArea} />
                      </td>
                      <td className="value">{schoolUpdate.extraData?.buildingArea}</td>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.schoolPlaygroundArea} />
                      </td>
                      <td className="value">{schoolUpdate.extraData?.playgroundArea}</td>
                    </tr>
                    <tr>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.schoolTotalClass} />
                      </td>
                      <td className="value">{schoolUpdate.extraData.totalClass}</td>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.schoolCurrentClass} />
                      </td>
                      <td className="value">{schoolUpdate.extraData.schoolCurrentClass}</td>
                    </tr>
                    <tr>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.schoolTotalStudent} />
                      </td>
                      <td className="value">{schoolUpdate.extraData.schoolTotalStudent}</td>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.schoolStudentSize} />
                      </td>
                      <td className="value">{schoolUpdate.studentSize}</td>
                    </tr>
                    <tr>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.schoolJoinSWAN} />
                      </td>
                      <td colSpan="3" className="value">
                        {formatDateOnlyFromStr(schoolUpdate.joinedDate)}
                      </td>
                    </tr>
                    <tr>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.staff} />
                      </td>
                      <td colSpan="3" className="value">
                        {hasText(schoolUpdate.numberWorker) && (
                          <div className="form-group">
                            <textarea
                              readOnly
                              rows={4}
                              value={schoolUpdate.numberWorker}
                              className="form-control"
                              style={{ resize: "none" }}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.typeOrganization} />
                      </td>
                      <td colSpan="3" className="value">
                        {hasText(schoolUpdate.typeOrganization) && (
                          <div className="form-group">
                            <textarea
                              readOnly
                              rows={4}
                              value={schoolUpdate.typeOrganization}
                              className="form-control"
                              style={{ resize: "none" }}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.structureOrganization} />
                      </td>
                      <td colSpan="3" className="value">
                        {hasText(schoolUpdate.legalStructure) && (
                          <div className="form-group">
                            <textarea
                              readOnly
                              rows={4}
                              className="form-control"
                              style={{ resize: "none" }}
                              value={schoolUpdate.legalStructure}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.classesDetail} />
                      </td>
                      <td colSpan="3" className="value">
                        {hasText(schoolUpdate.infoClass) && (
                          <div className="form-group">
                            <textarea
                              readOnly
                              rows={4}
                              className="form-control"
                              style={{ resize: "none" }}
                              value={schoolUpdate.infoClass}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.teachingMethod} />
                      </td>
                      <td colSpan="3" className="value">
                        {hasText(schoolUpdate.organizationalStructure) && (
                          <div className="form-group">
                            <textarea
                              readOnly
                              rows={4}
                              className="form-control"
                              style={{ resize: "none" }}
                              value={schoolUpdate.organizationalStructure}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.certificate} />
                      </td>
                      <td colSpan="3" className="value">
                        {hasText(schoolUpdate.methodTeacher) && (
                          <div className="form-group">
                            <textarea
                              readOnly
                              rows={4}
                              className="form-control"
                              style={{ resize: "none" }}
                              value={schoolUpdate.methodTeacher}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.mentor} />
                      </td>
                      <td colSpan="3" className="value">
                        {hasText(schoolUpdate.methodSchool) && (
                          <div className="form-group">
                            <textarea
                              readOnly
                              rows={4}
                              className="form-control"
                              style={{ resize: "none" }}
                              value={schoolUpdate.methodSchool}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.lastYearSummary} />
                      </td>
                      <td colSpan="3">
                        {hasText(schoolUpdate.descriptionLastYear) && (
                          <div className="form-group">
                            <textarea
                              readOnly
                              rows={4}
                              className="form-control"
                              style={{ resize: "none" }}
                              value={schoolUpdate.descriptionLastYear}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.nextYearSummary} />
                      </td>
                      <td colSpan="3" className="value">
                        {hasText(schoolUpdate.demandThisYear) && (
                          <div className="form-group">
                            <textarea
                              readOnly
                              rows={4}
                              className="form-control"
                              style={{ resize: "none" }}
                              value={schoolUpdate.demandThisYear}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.suggestion} />
                      </td>
                      <td colSpan="3" className="value">
                        {hasText(schoolUpdate.suggestion) && (
                          <div className="form-group">
                            <textarea
                              readOnly
                              rows={4}
                              className="form-control"
                              style={{ resize: "none" }}
                              value={schoolUpdate.suggestion}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="key">
                        <FormattedMessage {...commonCompanyMessages.lastUpdated} />
                      </td>
                      <td colSpan="3" className="value">
                        {formatDate(new Date(schoolUpdate.lastUpdated))}
                      </td>
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
