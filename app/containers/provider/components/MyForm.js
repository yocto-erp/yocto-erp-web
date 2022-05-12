import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import * as Yup from "yup";
import {
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import { useHookCRUDForm } from "../../../libs/hooks/useHookCRUDForm";
import Widget from "../../../components/Widget/Widget";
import SubmitButton from "../../../components/button/SubmitButton";
import BackButton from "../../../components/button/BackButton";
import { providerApi } from "../../../libs/apis/provider/provider.api";
import messages from "../messages";
import SelectSubject from "../../partner/subject/components/SelectSubject";
import { LIST_PROVIDER_STATUS, PROVIDER_STATUS } from "../constants";
import DateSelect from "../../../components/date/DateSelect";
import FormGroupInput from "../../../components/Form/FormGroupInput";
import { isPositiveNumber } from "../../../libs/utils/number.util";
import AssetSelect from "../../../components/assets/AssetSelect";
import FormError from "../../../components/Form/FormError";
import ProductMultipleSelect from "../../../components/common/product/ProductMultipleSelect";
import { hasText } from "../../../utils/util";

const validationSchema = Yup.object().shape({
  subject: Yup.object().required(),
  status: isPositiveNumber,
  products: Yup.array()
    .of(Yup.object())
    .required("This field is required.")
    .min(1),
});

const { create, update, read } = providerApi;

function MyForm({ id, intl }) {
  const {
    register,
    submit,
    errors,
    state: { isLoading, formData, errors: serverErrors },
    formState: { isDirty, isValid },
    control,
    setValue,
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        intl.formatMessage(messages.formSaveSuccess, { name: resp.name }),
      );
    },
    mappingToForm: server => ({
      ...server,
      contractStartDate: hasText(server.contractStartDate)
        ? new Date(server.contractStartDate)
        : null,
      contractEndDate: hasText(server.contractEndDate)
        ? new Date(server.contractEndDate)
        : null,
    }),
    validationSchema,
    initForm: {
      name: "",
      subject: "",
      remark: "",
      status: PROVIDER_STATUS.PENDING,
      contractStartDate: null,
      contractEndDate: null,
      products: [],
      assets: [],
    },
    id,
  });

  return (
    <Widget>
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormError errors={serverErrors} />
        <Row>
          <Col md={8}>
            <FormGroup>
              <Label for="subject" className="mr-sm-2">
                <FormattedMessage {...messages.formPartner} />
              </Label>
              <Controller
                name="subject"
                defaultValue={formData.subject}
                control={control}
                render={({ onChange, ...data }, { invalid }) => (
                  <>
                    <FormattedMessage {...messages.formPartner}>
                      {msg => (
                        <SelectSubject
                          id="subject"
                          placeholder={msg}
                          invalid={invalid}
                          onAdded={newPartner => {
                            setValue("subject", newPartner, {
                              shouldValidate: true,
                            });
                          }}
                          mappingValue={null}
                          onChange={val => {
                            onChange(val);
                          }}
                          {...data}
                        />
                      )}
                    </FormattedMessage>
                  </>
                )}
              />
            </FormGroup>

            <div className="row">
              <div className="col-auto">
                <FormGroup>
                  <Label for="contract" className="mr-sm-2">
                    <FormattedMessage {...messages.formContractTerm} />
                  </Label>
                  <div className="row">
                    <div className="col-auto">
                      <Controller
                        name="contractStartDate"
                        defaultValue={formData.contractStartDate}
                        control={control}
                        render={({ onChange, value, ...data }) => (
                          <FormattedMessage {...messages.formContractStart}>
                            {msg => (
                              <DateSelect
                                placeholder={msg}
                                id="contractStartDate"
                                value={value}
                                onChange={onChange}
                                isClearable
                                {...data}
                              />
                            )}
                          </FormattedMessage>
                        )}
                      />
                    </div>
                    <div className="col-auto">
                      <Controller
                        name="contractEndDate"
                        defaultValue={formData.contractEndDate}
                        control={control}
                        render={({ onChange, value, ...data }) => (
                          <div>
                            <FormattedMessage {...messages.formContractEnd}>
                              {msg => (
                                <DateSelect
                                  placeholder={msg}
                                  id="contractEndDate"
                                  value={value}
                                  onChange={onChange}
                                  isClearable
                                  {...data}
                                />
                              )}
                            </FormattedMessage>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </FormGroup>
              </div>

              <div className="col">
                <FormGroupInput
                  name="status"
                  isRequired
                  type="select"
                  label={<FormattedMessage {...messages.formStatus} />}
                  register={register}
                  error={errors.status}
                >
                  <FormattedMessage {...messages.formStatus}>
                    {msg => (
                      <>
                        <option value="">{msg}</option>
                        {LIST_PROVIDER_STATUS.map(t => (
                          <FormattedMessage
                            {...messages[`providerStatus${t.id}`]}
                            key={t.id}
                          >
                            {msg1 => <option value={t.id}>{msg1}</option>}
                          </FormattedMessage>
                        ))}
                      </>
                    )}
                  </FormattedMessage>
                </FormGroupInput>
              </div>
            </div>

            <FormGroup>
              <Label for="remark" className="required">
                <FormattedMessage {...messages.formRemark} />
              </Label>
              <FormattedMessage {...messages.formRemark}>
                {msg => (
                  <Input
                    type="textarea"
                    name="remark"
                    innerRef={register}
                    id="remark"
                    rows={10}
                    placeholder={msg}
                  />
                )}
              </FormattedMessage>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup className="pb-3 h-100">
              <Controller
                defaultValue={formData?.assets || []}
                name="assets"
                control={control}
                render={({ onChange, ...data }, { invalid }) => (
                  <AssetSelect
                    placeholder="Select files"
                    maxSize={500000}
                    {...data}
                    onChange={onChange}
                    className="h-100"
                    invalid={invalid}
                  />
                )}
              />
              <FormFeedback>
                {errors.assets && errors.assets.message}
              </FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label>Products</Label>
          <Controller
            defaultValue={formData?.products || []}
            name="products"
            control={control}
            render={({ onChange, value }) => (
              <ProductMultipleSelect
                name="products"
                onChange={onChange}
                value={value}
              />
            )}
          />
        </FormGroup>
        <BackButton className="mr-2" />
        <SubmitButton disabled={!isValid || !isDirty} isLoading={isLoading} />
      </Form>
    </Widget>
  );
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  intl: intlShape.isRequired,
};

MyForm.defaultProps = {};

export default injectIntl(MyForm);
