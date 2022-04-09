import React from "react";
import PropTypes from "prop-types";
import {
  Col,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { Controller } from "react-hook-form";
import messages from "../messages";
import subjectApi from "../../../../libs/apis/partner/subject.api";
import FormHookErrorMessage from "../../../../components/Form/FormHookErrorMessage";
import ModalCancelButton from "../../../../components/button/ModalCancelButton";
import SubmitButton from "../../../../components/button/SubmitButton";
import { useHookCRUDForm } from "../../../../libs/hooks/useHookCRUDForm";
import {
  LIST_SUBJECT_TYPE,
  SUBJECT_TYPE,
  subjectValidationSchema,
} from "../constants";
import FormError from "../../../../components/Form/FormError";
import FormGroupInput from "../../../../components/Form/FormGroupInput";
import CompanySelect from "../../../../components/common/company/CompanySelect";
import CustomerSelect from "../../../../components/common/customer/CustomerSelect";
import InputAsyncTagging from "../../../../components/Form/InputAsyncTagging";
import taggingApi from "../../../../libs/apis/tagging.api";
import AssetSingleSelect from "../../../../components/assets/AssetSingleSelect";
import FormGroup from "../../../../components/Form/FormGroup";

const { create, update, read } = subjectApi;

const SubjectModalForm = ({ isOpen, closeHandle, headerTitle, id }) => {
  const {
    register,
    submit,
    errors,
    watch,
    control,
    setValue,
    state: { isLoading, formData, errors: serverErrors },
    formState: { isDirty, isValid },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      let msg = "";
      if (Number(resp.type) === SUBJECT_TYPE.COMPANY) {
        msg = resp.company.name;
      } else {
        msg =
          resp.person.fullName ||
          `${resp.person.firstName} ${resp.person.lastName}`;
      }
      toast.success(
        id ? `Update Partner ${msg} success` : `Create Partner ${msg} success`,
      );
      closeHandle(resp);
    },
    validationSchema: subjectValidationSchema,
    initForm: {
      person: null,
      company: null,
      type: SUBJECT_TYPE.PERSONAL,
      remark: "",
      asset: null,
      contactPerson: null,
      tagging: [],
    },
    id,
  });

  const type = watch("type");

  return (
    <Modal isOpen={isOpen} size="lg">
      <Form noValidate formNoValidate>
        <ModalHeader toggle={() => closeHandle(false)}>
          {headerTitle || <FormattedMessage {...messages.modalTitle} />}
        </ModalHeader>
        <ModalBody>
          <FormError errors={serverErrors} />
          <Row>
            <Col xs="12" sm="6" md="12" lg="6" xl="6">
              <FormGroupInput
                className={id ? "hide" : ""}
                label="Loại đối tác"
                name="type"
                type="select"
                register={register}
                error={errors.type}
              >
                <option value="">Chọn loại đối tác</option>
                {LIST_SUBJECT_TYPE.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </FormGroupInput>
              {Number(type) === SUBJECT_TYPE.COMPANY ? (
                <FormattedMessage {...messages.formCompanyLabel}>
                  {msg => (
                    <FormGroup isRequired label={msg}>
                      <Controller
                        name="company"
                        defaultValue={formData.company}
                        control={control}
                        render={({ onChange, ...data }, { invalid }) => (
                          <CompanySelect
                            id="company"
                            placeholder={msg}
                            invalid={invalid}
                            onAdded={newCompany => {
                              setValue("company", newCompany, {
                                shouldValidate: true,
                              });
                            }}
                            onChange={val => {
                              onChange(val);
                            }}
                            {...data}
                          />
                        )}
                      />
                      <FormHookErrorMessage error={errors.company} />
                    </FormGroup>
                  )}
                </FormattedMessage>
              ) : (
                <FormattedMessage {...messages.formPersonLabel}>
                  {msg => (
                    <FormGroup isRequired label={msg}>
                      <Controller
                        name="person"
                        defaultValue={formData.person}
                        control={control}
                        render={({ onChange, ...data }, { invalid }) => (
                          <CustomerSelect
                            id="person"
                            placeholder={msg}
                            invalid={invalid}
                            onAdded={newPerson => {
                              setValue("person", newPerson, {
                                shouldValidate: true,
                              });
                            }}
                            onChange={val => {
                              onChange(val);
                            }}
                            {...data}
                          />
                        )}
                      />
                      <FormHookErrorMessage error={errors.person} />
                    </FormGroup>
                  )}
                </FormattedMessage>
              )}
              {Number(type) === SUBJECT_TYPE.COMPANY ? (
                <FormattedMessage {...messages.formContactPerson}>
                  {msg => (
                    <FormGroup label={msg}>
                      <Controller
                        name="contactPerson"
                        defaultValue={formData.contactPerson}
                        control={control}
                        render={({ onChange, ...data }) => (
                          <CustomerSelect
                            id="contactPerson"
                            placeholder={msg}
                            onAdded={newCustomer => {
                              setValue("contactPerson", newCustomer, {
                                shouldValidate: true,
                              });
                            }}
                            onChange={onChange}
                            {...data}
                          />
                        )}
                      />
                    </FormGroup>
                  )}
                </FormattedMessage>
              ) : null}
              <FormattedMessage {...messages.formRemark}>
                {msg => (
                  <FormGroupInput
                    label={msg}
                    rows={4}
                    type="textarea"
                    name="remark"
                    register={register}
                    placeholder={msg}
                  />
                )}
              </FormattedMessage>
              <FormGroup label="Tagging">
                <Controller
                  name="tagging"
                  id="tagging"
                  defaultValue={formData ? formData.tagging : []}
                  control={control}
                  render={({ onChange, ...data }) => (
                    <InputAsyncTagging
                      {...data}
                      onChange={onChange}
                      loadOptionApi={taggingApi.search}
                    />
                  )}
                />
                <FormHookErrorMessage error={errors.tagging} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup label="">
                <Controller
                  defaultValue={formData?.asset}
                  name="assets"
                  control={control}
                  render={({ onChange, ...data }, { invalid }) => (
                    <AssetSingleSelect
                      placeholder="Select Photo"
                      {...data}
                      onChange={onChange}
                      invalid={invalid}
                    />
                  )}
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton onClick={() => closeHandle(false)} />
          <SubmitButton
            disabled={!isValid || !isDirty}
            type="button"
            isLoading={isLoading}
            onClick={submit}
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
  id: PropTypes.any,
};

export default SubjectModalForm;
