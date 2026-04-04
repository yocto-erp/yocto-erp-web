import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Form, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { yupResolver } from "@hookform/resolvers"
import { useForm, Controller } from "react-hook-form"

import * as Yup from "yup"
import { toast } from "react-toastify"
import FormRow from "../../../components/Form/FormRow"
import ModalCancelButton from "../../../components/button/ModalCancelButton"
import SubmitButton from "../../../components/button/SubmitButton"
import companyNoteApi from "../../../libs/apis/note/companyNote.api"
import AssetSelect from "../../../components/assets/AssetSelect"
import FormGroup from "../../../components/Form/FormGroup"
import { ALL_MIME_TYPE } from "../../../components/assets/constants"
import FormHookErrorMessage from "../../../components/Form/FormHookErrorMessage"
const validationSchema = Yup.object().shape({
  note: Yup.string().required("This field is required."),
})

const NoteModalForm = ({ isOpen, closeHandle, companyId, noteId }) => {
  const [isLoading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    errors,
    control,
    reset,
    formState: { isValid, isDirty },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: { name: "", assets: [] },
  })
  const onSubmit = handleSubmit((val) => {
    setLoading(true)
    const newValues = {
      ...val,
      companyId,
    }
    if (noteId) {
      companyNoteApi.update(noteId, newValues).then((t) => {
        toast.success(`Update Note Success !`)
        closeHandle(t)
      })
    } else {
      companyNoteApi.create(newValues).then((t) => {
        toast.success(`Create Note Success !`)
        closeHandle(t)
      })
    }
    reset({})
    setLoading(false)
  })

  useEffect(() => {
    companyNoteApi.read(noteId).then((t) => {
      const values = {
        ...t,
      }
      reset(values)
    })
  }, [])

  return (
    <Modal isOpen={isOpen}>
      <Form noValidate formNoValidate>
        <ModalHeader
          toggle={() => {
            closeHandle(false)
            reset({})
          }}
        >
          Note Form
        </ModalHeader>
        <ModalBody>
          <FormRow
            rows={4}
            label={
              <>
                Note<span className="text-danger">*</span>
              </>
            }
            name="note"
            type="textarea"
            error={errors.note}
            register={register}
            placeholder="note"
          />
          <FormGroup className="pb-3 h-100">
            <Controller
              name="assets"
              control={control}
              render={({ onChange, ...data }, { invalid }) => (
                <AssetSelect
                  fileTypes={ALL_MIME_TYPE}
                  placeholder="Select files"
                  maxSize={500000}
                  {...data}
                  onChange={onChange}
                  className="h-100"
                  invalid={invalid}
                />
              )}
            />
            <FormHookErrorMessage error={errors.assets} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton
            onClick={() => {
              closeHandle(false)
              reset({})
            }}
          />
          <SubmitButton
            disabled={!isValid || !isDirty}
            type="button"
            isLoading={isLoading}
            onClick={onSubmit}
          />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

NoteModalForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  companyId: PropTypes.any,
  noteId: PropTypes.any,
  closeHandle: PropTypes.func.isRequired,
}

export default NoteModalForm
