import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { Form, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import FormError from "../../../../components/Form/FormError";
import FormRow from "../../../../components/Form/FormRow";
import ModalCancelButton from "../../../../components/button/ModalCancelButton";
import SubmitButton from "../../../../components/button/SubmitButton";
import { API_STATE, useApi } from "../../../../libs/hooks/useApi";
import { studentTrackingApi } from "../../../../libs/apis/student/student-tracking.api";
import { LIST_STUDENT_DAILY_STATUS } from "../constants";
import { studentTrackingMessage } from "../messages";

const validationSchema = Yup.object().shape({
  status: Yup.string().required(),
});

const StudentTrackingUpdateStatusModal = ({
  listDate,
  closeHandle,
  student,
  isOpen,
}) => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isValid, isDirty },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      status: null,
    },
  });

  const { exec, state, reset } = useApi(studentTrackingApi.update);

  const onSubmit = handleSubmit(val => {
    exec({ listDate, ...val, student });
  });

  useEffect(() => {
    if (state.status === API_STATE.SUCCESS) {
      reset();
      toast.info("Update status success");
      closeHandle(true);
    }
  }, [state]);

  return (
    <Modal isOpen={isOpen} size="lg">
      <Form noValidate formNoValidate>
        <ModalHeader toggle={() => closeHandle(false)}>
          Update status{" "}
          <strong>
            {student?.child.name} ({student?.alias})
          </strong>{" "}
          on {listDate?.length} days
        </ModalHeader>
        <ModalBody>
          <FormError errors={state.errors} />
          <FormRow
            label={
              <span className="text-nowrap">
                Status <span className="text-danger">*</span>
              </span>
            }
            labelCol={2}
            valueCol={10}
            name="status"
            type="select"
            error={errors.name}
            register={register}
            placeholder="Select Status"
          >
            <option value="">Select Status</option>
            {LIST_STUDENT_DAILY_STATUS.map(t => (
              <FormattedMessage
                {...studentTrackingMessage[`formStatus${t.id}`]}
              >
                {msg => <option value={t.id}>{msg}</option>}
              </FormattedMessage>
            ))}
          </FormRow>
          <FormRow
            label={<span className="text-nowrap">Remark</span>}
            labelCol={2}
            valueCol={10}
            rows={6}
            name="remark"
            type="textarea"
            register={register}
            placeholder="Remark"
          />
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton onClick={() => closeHandle(false)} />
          <SubmitButton
            disabled={!isValid || !isDirty}
            type="submit"
            isLoading={state.status === API_STATE.LOADING}
            onClick={onSubmit}
          />
        </ModalFooter>
      </Form>
    </Modal>
  );
};

StudentTrackingUpdateStatusModal.propTypes = {
  isOpen: PropTypes.bool,
  student: PropTypes.object.isRequired,
  listDate: PropTypes.array,
  closeHandle: PropTypes.func.isRequired,
};

export default StudentTrackingUpdateStatusModal;
