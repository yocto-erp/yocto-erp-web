import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import * as yup from "yup";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import FormError from "../../../components/Form/FormError";
import ModalCancelButton from "../../../components/button/ModalCancelButton";
import SubmitButton from "../../../components/button/SubmitButton";
import { API_STATE } from "../../../libs/hooks/useApi";
import useMyForm from "../../../libs/hooks/useMyForm";
import { providerApi } from "../../../libs/apis/provider/provider.api";
import messages from "../messages";
import { useListActionContext } from "../../../components/ListWidget/constants";

const schema = yup.object().shape({
  approve: yup.string().required(),
});

const ProviderApproveModal = ({ item, onClose }) => {
  const listAction = useListActionContext();
  const {
    state,
    onSubmit,
    register,
    reset,
    resetState,
    formState: { isDirty, isValid },
  } = useMyForm({
    form: {
      approve: "",
    },
    validationSchema: schema,
    api: data => {
      console.log(data);
      return providerApi.approve(item.id, data.approve === "1");
    },
  });

  useEffect(() => {
    if (state.status === API_STATE.SUCCESS) {
      if (listAction && listAction.refresh) {
        listAction.refresh();
      }
      toast.success("Duyệt nhà cung cấp thành công");
      resetState();
      reset({});
      onClose(true);
    }
  }, [state, listAction]);

  return (
    <Modal isOpen={item !== null} className="warning">
      <Form noValidate formNoValidate onSubmit={onSubmit}>
        <ModalHeader toggle={() => onClose(false)}>
          Duyệt nhà cung cấp (<strong>{item?.subject.name}</strong>)
        </ModalHeader>
        <ModalBody>
          <FormError errors={state.errors} />
          <div className="text-center">
            <div className="form-check abc-radio form-check-inline abc-radio-primary">
              <input
                className="form-check-input"
                type="radio"
                name="approve"
                ref={register}
                id="radio1"
                value="1"
              />
              <label className="form-check-label" htmlFor="radio1">
                <FormattedMessage {...messages.formApproveStatusAccept} />
              </label>
            </div>
            <div className="form-check abc-radio form-check-inline abc-radio-warning">
              <input
                className="form-check-input"
                type="radio"
                name="approve"
                ref={register}
                id="radio2"
                value="0"
              />
              <label className="form-check-label" htmlFor="radio2">
                <FormattedMessage {...messages.formApproveStatusReject} />
              </label>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton onClick={() => onClose(false)} />
          <SubmitButton
            disabled={!isValid || !isDirty}
            type="submit"
            isLoading={state.status === API_STATE.LOADING}
          />
        </ModalFooter>
      </Form>
    </Modal>
  );
};

ProviderApproveModal.propTypes = {
  item: PropTypes.object,
  onClose: PropTypes.func,
};

export default ProviderApproveModal;
