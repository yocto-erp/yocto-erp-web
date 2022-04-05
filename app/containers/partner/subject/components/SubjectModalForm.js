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
import messages from "../messages";
import { useAsync } from "../../../../libs/hooks/useAsync";
import subjectApi from "../../../../libs/apis/partner/subject.api";
import { LIST_GENDER } from "../../../../libs/apis/person.api";
import FormHookErrorMessage from "../../../../components/Form/FormHookErrorMessage";
import FormRow from "../../../../components/Form/FormRow";
import ModalCancelButton from "../../../../components/button/ModalCancelButton";
import SubmitButton from "../../../../components/button/SubmitButton";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  sex: Yup.string().required(),
});

const TITLE_COL = 3;
const INPUT_COL = 9;
const SubjectModalForm = ({ isOpen, closeHandle, headerTitle }) => {
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

  const [isLoading, exec] = useAsync({ asyncApi: subjectApi.create });
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
                        register={register}
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

SubjectModalForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
  headerTitle: PropTypes.string,
};

export default SubjectModalForm;
