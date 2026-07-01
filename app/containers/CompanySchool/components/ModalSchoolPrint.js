import React from "react"
import PropTypes from "prop-types"
import { yupResolver } from "@hookform/resolvers"
import * as Yup from "yup"
import { Controller, useForm } from "react-hook-form"
import { ERROR } from "../../../components/Form/messages"
import { SelectTemplate } from "../../template/SelectTemplate"
import ConfirmModalExec from "../../../components/modal/ConfirmModalExec"
import FormGroup from "../../../components/Form/FormGroup"
import { download } from "../../../libs/apis/fetch"
import { CompanySchoolUpdateApi } from "../../../libs/apis/company-school/company-school-update.api"
import FormHookErrorMessage from "../../../components/Form/FormHookErrorMessage"
import { TEMPLATE_TYPE } from "../../../libs/apis/template/templateType.api"
import { hasText } from "../../../utils/util"

const validationSchema = Yup.object().shape({
  template: Yup.object()
    .nullable()
    .required(ERROR.required),
})

const ModalSchoolPrint = ({ schoolUpdate, isOpen, onClose }) => {
  const [errorMessage, setErrorMessage] = React.useState("")
  const { handleSubmit, errors, control } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      template: null,
    },
  })

  const onSubmit = handleSubmit(async (val) => {
    try {
      await download(
        CompanySchoolUpdateApi.print(schoolUpdate.school.id, val.template?.id),
        schoolUpdate.company.name,
      )
      onClose()
    } catch (e) {
      setErrorMessage(e.message)
    }
  })

  return (
    <ConfirmModalExec
      title="Choose template and download"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => onSubmit()}
    >
      {hasText(errorMessage) && <p className="alert alert-danger">{errorMessage}</p>}
      <form onSubmit={onSubmit}>
        <FormGroup label="Chọn template" isRequired>
          <Controller
            name="template"
            defaultValue={null}
            control={control}
            render={({ onChange, value }, { invalid }) => (
              <SelectTemplate
                typeId={TEMPLATE_TYPE.SCHOOL}
                value={value}
                onChange={onChange}
                placeholder="Select template"
                invalid={invalid}
              />
            )}
          />
          <FormHookErrorMessage error={errors.template} />
        </FormGroup>
      </form>
    </ConfirmModalExec>
  )
}

ModalSchoolPrint.propTypes = {
  schoolUpdate: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export default ModalSchoolPrint
