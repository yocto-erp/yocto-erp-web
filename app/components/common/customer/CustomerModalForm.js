import React from "react";
import PropTypes from "prop-types";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import FormRow from "../../Form/FormRow";
import ModalCancelButton from "../../button/ModalCancelButton";
import SubmitButton from "../../button/SubmitButton";
import { useAsync } from "../../../libs/hooks/useAsync";
import personApi, { LIST_GENDER } from "../../../libs/apis/person.api";
import { ERROR } from "../../Form/messages";
import FormHookErrorMessage from "../../Form/FormHookErrorMessage";
import messages from "./messages";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(ERROR.required),
  lastName: Yup.string().required(ERROR.required),
  sex: Yup.string().required(ERROR.required),
});

const TITLE_COL = 3;
const INPUT_COL = 9;
const CustomerModalForm = ({ isOpen, closeHandle, headerTitle }) => {
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
      firstName: "",
      lastName: "",
      email: "",
      gsm: "",
      address: "",
      sex: "",
      remark: "",
    },
  });

  const [isLoading, exec] = useAsync({ asyncApi: personApi.create });
  const onSubmit = handleSubmit(val => {
    exec(val).then(result => {
      toast.success(`Create Customer success !`);
      closeHandle(result);
    });
  });
  return (
    <Modal isOpen={isOpen} size="lg">
      <Form noValidate formNoValidate>
        <ModalHeader toggle={() => closeHandle(false)}>
          {headerTitle || <FormattedMessage {...messages.modalTitle} />}
        </ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Label sm={TITLE_COL}>
              Họ tên <span className="text-danger">*</span>
            </Label>
            <Col sm={INPUT_COL}>
              <Row>
                <Col sm={4}>
                  <FormattedMessage {...messages.formGenderSelectDefault}>
                    {msg => (
                      <Input
                        name="sex"
                        type="select"
                        innerRef={register}
                        invalid={!!errors.sex}
                        placeholder={msg}
                      >
                        <option value="">{msg}</option>
                        {LIST_GENDER.map(t => (
                          <FormattedMessage
                            {...messages[`formGender${t.id}`]}
                            key={t.id}
                          >
                            {msg1 => <option value={t.id}>{msg1}</option>}
                          </FormattedMessage>
                        ))}
                      </Input>
                    )}
                  </FormattedMessage>
                  <FormHookErrorMessage error={errors.sex} />
                </Col>
                <Col sm={4}>
                  <Input
                    type="text"
                    innerRef={register}
                    name="firstName"
                    invalid={!!errors.firstName}
                    placeholder="Họ"
                  />
                  <FormHookErrorMessage error={errors.firstName} />
                </Col>
                <Col sm={4}>
                  <Input
                    type="text"
                    innerRef={register}
                    name="lastName"
                    invalid={!!errors.lastName}
                    placeholder="Tên"
                  />
                  <FormHookErrorMessage error={errors.lastName} />
                </Col>
              </Row>
            </Col>
          </FormGroup>
          <FormattedMessage {...messages.formGSM}>
            {msg => (
              <FormRow
                label={msg}
                labelCol={TITLE_COL}
                valueCol={INPUT_COL}
                name="gsm"
                type="tel"
                register={register}
                placeholder={msg}
              />
            )}
          </FormattedMessage>
          <FormattedMessage {...messages.formEmail}>
            {msg => (
              <FormRow
                label={msg}
                labelCol={TITLE_COL}
                valueCol={INPUT_COL}
                name="email"
                type="email"
                register={register}
                placeholder={msg}
                error={errors.email}
              />
            )}
          </FormattedMessage>
          <FormattedMessage {...messages.formAddress}>
            {msg => (
              <FormRow
                label={msg}
                labelCol={TITLE_COL}
                valueCol={INPUT_COL}
                name="address"
                type="text"
                register={register}
                placeholder={msg}
              />
            )}
          </FormattedMessage>
          <FormattedMessage {...messages.formRemark}>
            {msg => (
              <FormRow
                label={msg}
                labelCol={TITLE_COL}
                valueCol={INPUT_COL}
                name="remark"
                type="textarea"
                register={register}
                placeholder={msg}
              />
            )}
          </FormattedMessage>
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton onClick={() => closeHandle(false)} />
          <SubmitButton
            disabled={!isValid || !isDirty}
            type="button"
            isLoading={isLoading}
            onClick={onSubmit}
          />
        </ModalFooter>
      </Form>
    </Modal>
  );
};

CustomerModalForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
  headerTitle: PropTypes.string,
};

export default CustomerModalForm;
