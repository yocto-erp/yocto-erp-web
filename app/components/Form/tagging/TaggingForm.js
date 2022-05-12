import React, { useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import { SketchPicker } from "react-color";
import * as yup from "yup";
import useMyForm from "../../../libs/hooks/useMyForm";
import ModalCancelButton from "../../button/ModalCancelButton";
import ModalOKButton from "../../button/ModalOKButton";
import FormGroupInput from "../FormGroupInput";
import taggingApi from "../../../libs/apis/tagging.api";

const schema = yup.object().shape({
  label: yup.string().required(),
  color: yup.string(),
});

const TaggingForm = ({ initForm, onClose }) => {
  const {
    reset,
    register,
    errors,
    onSubmit,
    control,
    state: { isLoading, errors: serverErrors },
  } = useMyForm({
    form: initForm || { label: "", color: "#ffffff" },
    validationSchema: schema,
    api: data => {
      console.log(data);
      return taggingApi.create(data).then(resp => {
        onClose(resp);
      });
    },
  });

  useEffect(() => {
    reset(initForm || {});
  }, [initForm]);

  useEffect(() => {
    if (serverErrors && serverErrors.length) {
      toast.error(serverErrors.map(t => t.message).join("\n"));
    }
  }, [serverErrors]);

  return (
    <Modal className="info" isOpen={initForm !== null} fade={false}>
      <ModalHeader toggle={() => onClose(null)}>Create New Label</ModalHeader>
      <ModalBody>
        <form onSubmit={onSubmit} noValidate>
          <FormGroupInput
            name="label"
            label="Label"
            placeholder="Label"
            register={register}
            error={errors.label}
          />
          <Controller
            name="color"
            control={control}
            defaultValue="#ffffff"
            render={({ value, onChange }) => (
              <SketchPicker
                color={value}
                onChangeComplete={color => onChange(color?.hex || "")}
              />
            )}
          />
        </form>
      </ModalBody>
      <ModalFooter>
        <ModalCancelButton onClick={() => onClose(false)} />
        <ModalOKButton
          color="warning"
          onClick={() => {
            console.log("ok");
            onSubmit().then();
          }}
          isLoading={isLoading}
          type="button"
        >
          <i className="fa fa-check fa-fw mr-2" /> Save
        </ModalOKButton>
      </ModalFooter>
    </Modal>
  );
};

TaggingForm.propTypes = {
  initForm: PropTypes.object,
  onClose: PropTypes.func,
};

export default TaggingForm;
