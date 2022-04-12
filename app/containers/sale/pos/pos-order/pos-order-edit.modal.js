import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import ModalCancelButton from "../../../../components/button/ModalCancelButton";
import SubmitButton from "../../../../components/button/SubmitButton";
import FormGroupInput from "../../../../components/Form/FormGroupInput";
import { usePosDispatch, usePosListOrderContext } from "./pos.context";
import { onUpdateOrder } from "./pos.reduce";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
});
const PosOrderEditModal = ({ orderIndex, closeHandle }) => {
  const dispatch = usePosDispatch();
  const { orders } = usePosListOrderContext();
  const {
    register,
    handleSubmit,
    errors,
    reset,
    formState: { isValid, isDirty },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: { units: [{ name: "", rate: 1 }] },
  });

  useEffect(() => {
    const order = orders[orderIndex];
    reset({
      name: order?.name,
    });
  }, [orderIndex, orders]);

  const onSubmit = handleSubmit(val => {
    dispatch(onUpdateOrder(orderIndex, val));
    closeHandle(true);
    console.log(val);
  });

  return (
    <Modal isOpen={orderIndex >= 0} className="primary" fade={false}>
      <Form noValidate formNoValidate>
        <ModalHeader toggle={() => closeHandle(false)}>
          Cập nhập thông tin đơn hàng
        </ModalHeader>
        <ModalBody>
          <FormGroupInput
            name="name"
            placeholder="Tên đơn hàng"
            error={errors.name}
            label="Tên"
            type="text"
            isRequired
            register={register}
          />
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton onClick={() => closeHandle(false)}>
            Close
          </ModalCancelButton>
          <SubmitButton
            type="button"
            onClick={onSubmit}
            disabled={!isValid || !isDirty}
          >
            Update
          </SubmitButton>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

PosOrderEditModal.propTypes = {
  orderIndex: PropTypes.number,
  closeHandle: PropTypes.func.isRequired,
};

export default PosOrderEditModal;
