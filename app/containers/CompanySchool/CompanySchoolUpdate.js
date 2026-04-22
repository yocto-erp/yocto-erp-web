import React, { useEffect, useState } from "react"
import * as yup from "yup"
import { Form } from "reactstrap"
import { Controller } from "react-hook-form"
import { useHistory } from "react-router-dom"
import Widget from "../../components/Widget/Widget"
import useMyForm from "../../libs/hooks/useMyForm"
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
import InputNumber from "../../components/Form/InputNumber"
import { CompanySchoolUpdateApi } from "../../libs/apis/company-school/company-school-update.api"
import AlertModal from "../../components/modal/AlertModal"
import { CONFIGURATION_COMPANY_ROOT_PATH } from "../configuration/constants"

const validationSchema = yup.object().shape({
  fullNameOwner: yup.string().required(ERROR.required),
})

const CompanySchoolUpdate = () => {
  const history = useHistory()
  const {
    register,
    control,
    onSubmit,
    formState: { isValid, isDirty, errors },
    state,
    reset,
  } = useMyForm({
    api: CompanySchoolUpdateApi.save,
    validationSchema,
  })
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (state.status === API_STATE.SUCCESS) {
      setOpen(true)
    }
  }, [state])

  useEffect(() => {
    CompanySchoolUpdateApi.get().then((t) => {
      const values = {
        ...t,
        joinedDate: t.joinedDate ? parseIso(t.joinedDate) : null,
      }
      reset(values)
    })
  }, [])

  const onCloseHandle = React.useCallback(() => {
    setOpen(false)
    history.push(CONFIGURATION_COMPANY_ROOT_PATH)
  }, [open])
  const modal = React.useMemo(
    () => (
      <AlertModal
        isOpen={open}
        title="Update School"
        message="Update info school success!"
        onClose={onCloseHandle}
        type="success"
      />
    ),
    [open],
  )
  return (
    <>
      {modal}
      <div>{state.status === API_STATE.FAIL ? <FormError errors={state.errors} /> : null}</div>
      <div className="mb-4">
        <h2>Update Information School</h2>
      </div>
      <Widget>
        <Form onSubmit={onSubmit} noValidate>
          <div className="row">
            <div className="col-md-4">
              <FormGroupInput
                name="fullNameOwner"
                label={
                  <>
                    Full Name Owner/chairman
                    <div>(Họ và tên chủ trường/người đại diện pháp luật/người đại diện BLĐ)</div>
                  </>
                }
                register={register}
                error={errors.fullNameOwner}
                type="text"
                placeholder="Full Name Owner/chairman"
              />
            </div>
            <div className="col-md-4">
              <FormGroupInput
                name="fullNameManage"
                label={
                  <>
                    Full Name Manager
                    <div>(Họ và tên người quản lý trực tiếp)</div>
                  </>
                }
                register={register}
                error={errors.fullNameManage}
                type="text"
                placeholder="Full Name Manager"
              />
            </div>
            <div className="col-md-4">
              <FormGroupInput
                name="region"
                label={
                  <>
                    Region
                    <div>(Trường thuộc vùng miền)</div>
                  </>
                }
                register={register}
                error={errors.region}
                type="text"
                placeholder="Region"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <FormGroupInput
                name="level"
                label={
                  <>
                    Level
                    <div>(Trường có các khối lớp)</div>
                  </>
                }
                register={register}
                error={errors.level}
                type="text"
                placeholder="level grade"
              />
            </div>
            <div className="col-md-4">
              <FormGroup>
                <Label for="studentSize" className="mr-sm-2">
                  Student Size
                  <div>(Quy mô học sinh)</div>
                </Label>
                <div className="mt-2">
                  <Controller
                    control={control}
                    defaultValue=""
                    invalid={!!errors.studentSize}
                    name="studentSize"
                    render={({ onChange, value, onBlur, ...props }) => (
                      <InputNumber
                        {...props}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder="Student Size"
                      />
                    )}
                  />
                </div>
                <FormHookErrorMessage error={errors.studentSize} />
              </FormGroup>
            </div>
            <div className="col-md-4">
              {" "}
              <FormGroup>
                <Label for="joinedDate" className="mr-sm-2">
                  Joined Date
                  <div>(Năm gia nhập chính thức SWAVN)</div>
                </Label>
                <div className="mt-2">
                  <Controller
                    name="joinedDate"
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
                </div>
                <FormHookErrorMessage error={errors.joinedDate} />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <FormGroupInput
                rows="4"
                name="typeOrganization"
                label={
                  <>
                    Type Organization
                    <div>
                      (Nếu tổ chức đang theo hình thức một phần lợi nhuận và một phần phi lợi nhuận,
                      vui lòng ghi rõ % cho từng phần. Ví dụ: Trường đang theo 50% lợi nhuận và 50%
                      phi lợi nhuận.)
                    </div>
                  </>
                }
                register={register}
                type="textarea"
                placeholder="Type Organization"
              />
            </div>
            <div className="col-md-4">
              <FormGroupInput
                rows="4"
                name="legalStructure"
                label={
                  <>
                    Legal Structure
                    <div>
                      (Nếu cơ cấu pháp lý của tổ chức kết hợp nhiều hình thức, vui lòng ghi rõ chi
                      Ví dụ: Tổ chức vừa có trường mầm non, vừa có playgroup.)
                      <br />
                      <br />
                    </div>
                  </>
                }
                register={register}
                type="textarea"
                placeholder="Legal Structure"
              />
            </div>
            <div className="col-md-4">
              <FormGroupInput
                rows="4"
                name="infoClass"
                label={
                  <>
                    Class Information
                    <div>
                      (Vui lòng liệt kê các thông tin về lớp học bao gồm: tên lớp, số lượng học
                      sinh, số giáo viên)
                      <br />
                      <br />
                      <br />
                    </div>
                  </>
                }
                register={register}
                type="textarea"
                placeholder="Class Information"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <FormGroupInput
                rows="4"
                name="organizationalStructure"
                label={
                  <>
                    Organizational Structure
                    <div>
                      (Hình thức hoạt động của tổ chức: Theo tinh thần Steiner-Waldorf
                      (Steiner-inspired), Phương pháp Steiner-Waldorf hoàn toàn (fully Steiner))
                      <br />
                    </div>
                  </>
                }
                register={register}
                type="textarea"
                placeholder="Organizational Structure"
              />
            </div>
            <div className="col-md-4">
              <FormGroupInput
                rows="4"
                name="methodTeacher"
                label={
                  <>
                    Courses/Training
                    <div>
                      (Tình hình đào tạo theo phương pháp Steiner (Các Module đã được đào tạo/Đã tốt
                      nghiệp khóa mấy, tại đâu/Đã hoàn tất chứng chỉ quốc tế)
                    </div>
                  </>
                }
                register={register}
                type="textarea"
                placeholder="Courses/Training"
              />
            </div>
            <div className="col-md-4">
              <FormGroupInput
                rows="4"
                name="methodSchool"
                label={
                  <>
                    Mentoring
                    <div>
                      (Tình hình đào tạo tại trường Giáo viên đào tạo/Giáo viên hướng dẫn (mentors)
                      đã từng làm việc và hỗ trợ trường)
                      <br />
                    </div>
                  </>
                }
                register={register}
                type="textarea"
                placeholder="Mentoring"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <FormGroupInput
                rows="4"
                name="numberWorker"
                label={
                  <>
                    Staff
                    <div>
                      ( Số lượng người lao động (ghi rõ số lượng giáo viên, nhân viên văn phòng,
                      bếp, bảo vệ....):)
                      <br />
                      <br />
                    </div>
                  </>
                }
                register={register}
                type="textarea"
                placeholder="Staff"
              />
            </div>
            <div className="col-md-4">
              <FormGroupInput
                rows="4"
                name="descriptionLastYear"
                label={
                  <>
                    Description Last Year
                    <div>
                      (Tình hình trường trong năm vừa qua) <br /> <br />
                      <br />
                    </div>
                  </>
                }
                register={register}
                type="textarea"
                placeholder="Description Last Year"
              />
            </div>
            <div className="col-md-4">
              <FormGroupInput
                rows="4"
                name="demandThisYear"
                label={
                  <>
                    Demand This Year{" "}
                    <div>
                      (Nhu cầu đào tạo năm nay) <br /> <br /> <br />
                    </div>
                  </>
                }
                register={register}
                type="textarea"
                placeholder="Demand This Year"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <FormGroupInput
                name="suggestion"
                label={<>Suggestion (Góp ý xây dựng)</>}
                register={register}
                type="textarea"
                placeholder="Suggestion"
              />
            </div>
          </div>

          <BackButton className="mr-2" />
          <SubmitButton
            isLoading={state.status === API_STATE.LOADING}
            disabled={!isDirty || !isValid}
          />
        </Form>
      </Widget>
    </>
  )
}

CompanySchoolUpdate.propTypes = {}

export default CompanySchoolUpdate
