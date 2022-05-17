import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import {
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { Controller, useFieldArray } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import Widget from "../../../../components/Widget/Widget";
import SubmitButton from "../../../../components/button/SubmitButton";
import BackButton from "../../../../components/button/BackButton";
import { useHookCRUDForm } from "../../../../libs/hooks/useHookCRUDForm";
import CreateButton from "../../../../components/button/CreateButton";
import purchaseApi from "../../../../libs/apis/order/purchase.api";
import { ERROR } from "../../../../components/Form/messages";
import InputAsyncTagging from "../../../../components/Form/InputAsyncTagging";
import taggingApi from "../../../../libs/apis/tagging.api";
import FormHookErrorMessage from "../../../../components/Form/FormHookErrorMessage";
import { transformUnNumber } from "../../../../libs/utils/number.util";
import FormError from "../../../../components/Form/FormError";
import SelectProvider from "../../../provider/components/SelectProvider";
import messages from "../messages";
import { commonMessage } from "../../../messages";
import SelectUserShop from "../../../user/components/SelectUserShop";
import Permission from "../../../../components/Acl/Permission";
import { PERMISSION } from "../../../../components/Acl/constants";
import PurchaseOrderFormDetail from "./PurchaseOrderFormDetail";
import SelectOrderStatus from "../../components/SelectOrderStatus";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  details: Yup.array()
    .of(
      Yup.object().shape({
        product: Yup.object()
          .required()
          .nullable(true),
        quantity: Yup.number()
          .transform(transformUnNumber)
          .typeError(ERROR.required)
          .moreThan(0, ERROR.numberGT0)
          .required(ERROR.required),
        unit: Yup.object()
          .required()
          .nullable(true),
      }),
    )
    .required(),
});

const { create, update, read } = purchaseApi;

function MyForm({ id }) {
  const {
    control,
    register,
    submit,
    errors,
    getValues,
    setValue,
    state: { isLoading, formData, errors: serverError },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update Purchase ${resp.name} success`
          : `Create Purchase ${resp.name} success`,
      );
    },
    mappingToForm: serverData => ({
      ...serverData,
      details: serverData.details.map(t => ({
        ...t,
        id: `${t.orderId}-${t.orderDetailId}`,
      })),
    }),
    validationSchema,
    initForm: {
      name: "",
      remark: "",
      subject: null,
      tagging: [],
      shop: null,
      details: [
        {
          product: null,
          unit: null,
          quantity: "",
          price: "",
          remark: "",
          id: uuidv4(),
        },
      ],
    },
    id,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
    keyName: "fId",
  });

  return (
    <Widget>
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormError errors={serverError} />
        <Row>
          <Col md="6">
            <FormattedMessage {...messages.formName}>
              {msg => (
                <FormGroup>
                  <Label for="name" className="mr-sm-2 required">
                    {msg}
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    invalid={!!errors.name}
                    type="text"
                    name="name"
                    innerRef={register}
                    id="name"
                    placeholder={msg}
                  />
                  <FormFeedback>
                    {errors.name && errors.name.message}
                  </FormFeedback>
                </FormGroup>
              )}
            </FormattedMessage>
            <Permission permissions={[PERMISSION.ORDER.PURCHASE.SHOP]}>
              <FormattedMessage {...commonMessage.formShop}>
                {msg => (
                  <FormGroup>
                    <Label for="shop" className="mr-sm-2">
                      {msg}
                    </Label>
                    <Controller
                      name="shop"
                      defaultValue={formData ? formData.shop : null}
                      control={control}
                      render={props => (
                        <SelectUserShop
                          id="shop"
                          placeholder={msg}
                          {...props}
                        />
                      )}
                    />
                  </FormGroup>
                )}
              </FormattedMessage>
            </Permission>
            <Permission permissions={[PERMISSION.ORDER.PURCHASE.PROVIDER]}>
              <FormattedMessage {...messages.formPartner}>
                {msg => (
                  <FormGroup>
                    <Label for="subject" className="mr-sm-2">
                      {msg}
                    </Label>
                    <Controller
                      name="subject"
                      defaultValue={formData ? formData.partnerCompanyId : null}
                      control={control}
                      render={({ onChange, ...data }) => (
                        <SelectProvider
                          id="subject"
                          placeholder={msg}
                          onAdded={newCompany => {
                            setValue("subject", newCompany, {
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
                  </FormGroup>
                )}
              </FormattedMessage>
            </Permission>
            <FormattedMessage {...commonMessage.formStatus}>
              {msg => (
                <FormGroup>
                  <Label for="status" className="mr-sm-2">
                    {msg}
                  </Label>
                  <Controller
                    name="status"
                    defaultValue={formData ? formData.shop : null}
                    control={control}
                    render={props => (
                      <SelectOrderStatus
                        id="status"
                        placeholder={msg}
                        {...props}
                      />
                    )}
                  />
                </FormGroup>
              )}
            </FormattedMessage>
          </Col>
          <Col md="6">
            <FormattedMessage {...messages.formRemark}>
              {msg => (
                <FormGroup>
                  <Label for="remark" className="mr-sm-2">
                    {msg}
                  </Label>
                  <Input
                    rows={5}
                    type="textarea"
                    name="remark"
                    innerRef={register}
                    id="remark"
                    placeholder={msg}
                  />
                </FormGroup>
              )}
            </FormattedMessage>
            <FormGroup>
              <Label for="tagging" className="mr-sm-2">
                <FormattedMessage {...commonMessage.formTagging} />
              </Label>
              <Controller
                name="tagging"
                id="tagging"
                defaultValue={formData.tagging}
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
        </Row>
        <FormGroup>
          <Table bordered hover striped size="sm">
            <thead>
              <tr>
                <th style={{ width: "30%" }}>
                  <FormattedMessage {...messages.formTableProduct} />
                  <span className="text-danger">*</span>
                </th>
                <th style={{ width: "250px" }}>
                  <FormattedMessage {...messages.formTableUnit} />
                  <span className="text-danger">*</span>
                </th>
                <th style={{ width: "150px" }}>
                  <FormattedMessage {...messages.formTableQty} />
                  <span className="text-danger">*</span>
                </th>
                <Permission permissions={[PERMISSION.ORDER.PURCHASE.AMOUNT]}>
                  <th style={{ width: "150px" }}>
                    <FormattedMessage {...messages.formTablePrice} />
                    <span className="text-danger">*</span>
                  </th>
                </Permission>
                <th>
                  <FormattedMessage {...messages.formTableRemark} />
                </th>
                <th className="action">
                  <FormattedMessage {...commonMessage.action} />
                </th>
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => (
                <PurchaseOrderFormDetail
                  key={item.id}
                  control={control}
                  errors={errors}
                  register={register}
                  getValues={getValues}
                  setValue={setValue}
                  item={item}
                  index={index}
                  remove={remove}
                />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="6">
                  <CreateButton
                    size="sm"
                    type="button"
                    onClick={() => {
                      append({
                        id: uuidv4(),
                        product: null,
                        unit: null,
                        quantity: 0,
                        price: 0,
                        remark: "",
                      });
                    }}
                  >
                    <FormattedMessage {...messages.formTableBtnAddProduct} />
                  </CreateButton>
                </td>
              </tr>
            </tfoot>
          </Table>
        </FormGroup>
        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} />
      </Form>
    </Widget>
  );
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
