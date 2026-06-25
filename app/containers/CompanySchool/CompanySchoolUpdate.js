import React, { useEffect, useState } from "react"
import * as yup from "yup"
import { Form } from "reactstrap"
import { Controller } from "react-hook-form"
import { useHistory } from "react-router-dom"
import { FormattedMessage } from "react-intl"
import Widget from "../../components/Widget/Widget"
import useMyForm from "../../libs/hooks/useMyForm"
import { ERROR } from "../../components/Form/messages"
import BackButton from "../../components/button/BackButton"
import SubmitButton from "../../components/button/SubmitButton"
import { API_STATE } from "../../libs/hooks/useApi"
import FormError from "../../components/Form/FormError"
import DateSelect from "../../components/date/DateSelect"
import FormHookErrorMessage from "../../components/Form/FormHookErrorMessage"
import { parseIso } from "../../libs/utils/date.util"
import { CompanySchoolUpdateApi } from "../../libs/apis/company-school/company-school-update.api"
import AlertModal from "../../components/modal/AlertModal"
import { CONFIGURATION_COMPANY_ROOT_PATH } from "../configuration/constants"
import Select from "../../components/common/Select"
import FormRowInput from "../../components/Form/FormRowInput"
import FormRowOnly from "../../components/Form/FormRowOnly"
import FormRow from "../../components/Form/FormRow"
import commonCompanyMessages from "../../components/common/company/messages"

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
    form: {
      region: [],
      level: [],
      joinedDate: "",
    },
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
        <h2>
          <FormattedMessage {...commonCompanyMessages.schoolFormTitle} />
        </h2>
      </div>
      <Widget>
        <Form onSubmit={onSubmit} noValidate>
          <FormRowInput
            name="fullNameOwner"
            label={<FormattedMessage {...commonCompanyMessages.schoolOwner} />}
            register={register}
            error={errors.fullNameOwner}
            type="text"
            placeholder="Họ và tên chủ trường"
            hint={<span className="text-muted small">Chủ trường (Người đại diện pháp luật)</span>}
          />
          <FormRowInput
            name="fullNameManage"
            label={<FormattedMessage {...commonCompanyMessages.schoolManager} />}
            register={register}
            error={errors.fullNameManage}
            type="text"
            placeholder="Họ và tên người quản lý trực tiếp"
            hint={<span className="text-muted small">Họ và tên người Quản lý trực tiếp</span>}
          />
          <FormRowOnly
            label={<FormattedMessage {...commonCompanyMessages.schoolRegion} />}
            id="region"
          >
            <Controller
              name="region"
              control={control}
              render={(props) => (
                <Select
                  id="region"
                  isMulti
                  options={[
                    { name: "Miền Bắc", value: "Miền Bắc" },
                    { name: "Miền Trung", value: "Miền Trung" },
                    { name: "Miền Nam", value: "Miền Nam" },
                  ]}
                  placeholder="Chọn Vùng miền"
                  {...props}
                />
              )}
            />
            <FormHookErrorMessage error={errors.region} />
          </FormRowOnly>
          <FormRowOnly
            label={<FormattedMessage {...commonCompanyMessages.schoolLevel} />}
            id="level"
          >
            <Controller
              name="level"
              control={control}
              render={(props) => (
                <Select
                  id="level"
                  isMulti
                  options={[
                    { name: "Mầm non", value: "Mầm non" },
                    { name: "Tiểu học", value: "Tiểu học" },
                    { name: "Trung học", value: "Trung học" },
                    { name: "Phổ thông", value: "Phổ thông" },
                  ]}
                  placeholder="Chọn khối lớp"
                  {...props}
                />
              )}
            />
            <FormHookErrorMessage error={errors.level} />
          </FormRowOnly>
          <FormRow
            label={<FormattedMessage {...commonCompanyMessages.schoolArea} />}
            name="extraData.buildingArea"
            type="number"
            register={register}
            error={errors.extraData?.buildingArea}
            placeholder="Tổng diện tích xây dựng"
          />
          <FormRow
            label={<FormattedMessage {...commonCompanyMessages.schoolPlaygroundArea} />}
            name="extraData.buildingArea"
            type="number"
            register={register}
            error={errors.extraData?.playgroundArea}
            placeholder="Tổng diện tích sân chơi"
          />
          <FormRow
            label={<FormattedMessage {...commonCompanyMessages.schoolTotalClass} />}
            name="extraData.totalClass"
            type="number"
            register={register}
            error={errors.extraData?.playgroundArea}
            placeholder="Quy mô lớp tối đa"
          />
          <FormRow
            label={<FormattedMessage {...commonCompanyMessages.schoolCurrentClass} />}
            name="extraData.schoolCurrentClass"
            type="number"
            register={register}
            error={errors.extraData?.playgroundArea}
            placeholder="Số lớp hiện tại"
          />
          <FormRow
            label={<FormattedMessage {...commonCompanyMessages.schoolTotalStudent} />}
            name="extraData.schoolTotalStudent"
            type="number"
            register={register}
            error={errors.extraData?.schoolTotalStudent}
            placeholder="Số học sinh tối đa"
          />
          <FormRow
            label={<FormattedMessage {...commonCompanyMessages.schoolStudentSize} />}
            name="studentSize"
            type="number"
            register={register}
            error={errors.studentSize}
            placeholder="Số học sinh hiện tại"
          />
          <FormRowOnly label={<FormattedMessage {...commonCompanyMessages.schoolJoinSWAN} />}>
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
            <FormHookErrorMessage error={errors.joinedDate} />
          </FormRowOnly>
          <FormRow
            name="typeOrganization"
            label={<FormattedMessage {...commonCompanyMessages.typeOrganization} />}
            register={register}
            rows={4}
            type="textarea"
            placeholder="Mô hình hoạt đông của doanh nghiệp"
            hint={
              <span className="form-text small text-muted">
                Nếu tổ chức đang theo hình thức một phần lợi nhuận và một phần phi lợi nhuận, vui
                lòng ghi rõ % cho từng phần. Ví dụ: Trường đang theo 50% lợi nhuận và 50% phi lợi
                nhuận.
              </span>
            }
          />
          <FormRow
            rows="4"
            name="legalStructure"
            label={<FormattedMessage {...commonCompanyMessages.structureOrganization} />}
            register={register}
            type="textarea"
            placeholder="Cấu trúc trường"
            hint={
              <span className="small form-text text-muted">
                Nếu cơ cấu pháp lý của tổ chức kết hợp nhiều hình thức, vui lòng ghi rõ chi Ví dụ:
                Tổ chức vừa có trường mầm non, vừa có playgroup.
              </span>
            }
          />
          <FormRow
            rows="4"
            name="infoClass"
            label={<FormattedMessage {...commonCompanyMessages.classesDetail} />}
            register={register}
            type="textarea"
            placeholder="Thông tin chi tiết lớp"
            hint={
              <span className="small form-text text-muted">
                Vui lòng liệt kê các thông tin về lớp học bao gồm: tên lớp, số lượng học sinh, số
                giáo viên, ví dụ
                <br />
                - Lớp ánh sao (mầm non), 10 bạn, cô Nhật Anh phụ trách.
                <br />- Lớp một, 8 bạn, thầy Hùng
              </span>
            }
          />
          <FormRow
            rows="4"
            name="organizationalStructure"
            label={<FormattedMessage {...commonCompanyMessages.teachingMethod} />}
            register={register}
            type="textarea"
            placeholder="Organizational Structure"
            hint={
              <span className="small form-text text-muted">
                Hình thức hoạt động của tổ chức: Theo tinh thần Steiner-Waldorf (Steiner-inspired),
                Phương pháp Steiner-Waldorf hoàn toàn (fully Steiner)
              </span>
            }
          />
          <FormRow
            rows="4"
            name="methodTeacher"
            label={<FormattedMessage {...commonCompanyMessages.certificate} />}
            hint={
              <span className="small form-text text-muted">
                (Tình hình đào tạo, chứng chỉ theo phương pháp Steiner (Các Module đã được đào
                tạo/Đã tốt nghiệp khóa mấy, tại đâu/Đã hoàn tất chứng chỉ quốc tế) của các giáo
                viên, thành viên trong trường
              </span>
            }
            register={register}
            type="textarea"
            placeholder="Courses/Training"
          />
          <FormRow
            rows="4"
            name="methodSchool"
            label={<FormattedMessage {...commonCompanyMessages.mentor} />}
            hint={
              <span className="small form-text text-muted">
                Tình hình được tư vấn (hỗ trợ) tại trường, các giáo viên đã từng đào tạo, hướng dẫn,
                tư vấn (mentors), hỗ trợ trường
              </span>
            }
            register={register}
            type="textarea"
            placeholder="Mentoring"
          />
          <FormRow
            rows="4"
            name="numberWorker"
            label={<FormattedMessage {...commonCompanyMessages.staff} />}
            hint={
              <span className="small form-text text-muted">
                Số lượng người lao động (ghi rõ số lượng giáo viên, nhân viên văn phòng, bếp, bảo
                vệ....
              </span>
            }
            register={register}
            type="textarea"
            placeholder="Chi tiết nhân viên"
          />
          <FormRow
            rows="4"
            name="descriptionLastYear"
            label={<FormattedMessage {...commonCompanyMessages.lastYearSummary} />}
            hint={
              <span className="small form-text text-muted">
                Tổng kết tình hình chung của trường trong năm vừa qua
              </span>
            }
            register={register}
            type="textarea"
            placeholder="Tổng kết tình hình chung của trường trong năm vừa qua"
          />
          <FormRow
            rows="4"
            name="demandThisYear"
            label={<FormattedMessage {...commonCompanyMessages.nextYearSummary} />}
            hint={<span className="small form-text text-muted">Nhu cầu đào tạo sắp tới</span>}
            register={register}
            type="textarea"
            placeholder="Nhu cầu đào tạo"
          />
          <FormRow
            name="suggestion"
            label={<FormattedMessage {...commonCompanyMessages.suggestion} />}
            hint={
              <span className="small text-muted">
                Góp ý xây dựng, hỗ trợ cộng đồng và SWAN sữa chữa và phát triển hơn{" "}
              </span>
            }
            register={register}
            type="textarea"
            placeholder="Suggestion"
          />

          <div className="d-flex justify-content-between mt-2">
            <BackButton className="mr-2" />
            <SubmitButton
              isLoading={state.status === API_STATE.LOADING}
              disabled={!isDirty || !isValid}
            />
          </div>
        </Form>
      </Widget>
    </>
  )
}

CompanySchoolUpdate.propTypes = {}

export default CompanySchoolUpdate
