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
import Widget from "../../../../components/Widget/Widget";
import SubmitButton from "../../../../components/button/SubmitButton";
import BackButton from "../../../../components/button/BackButton";
import { useHookCRUDForm } from "../../../../libs/hooks/useHookCRUDForm";
import CreateButton from "../../../../components/button/CreateButton";
import OrderFormDetail from "../../components/OrderFormDetail";
import purchaseApi from "../../../../libs/apis/order/purchase.api";
import { ERROR } from "../../../../components/Form/messages";
import InputAsyncTagging from "../../../../components/Form/InputAsyncTagging";
import taggingApi from "../../../../libs/apis/tagging.api";
import FormHookErrorMessage from "../../../../components/Form/FormHookErrorMessage";
import { transformUnNumber } from "../../../../libs/utils/number.util";
import SelectSubject from "../../../partner/subject/components/SelectSubject";
import FormError from "../../../../components/Form/FormError";

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
        price: Yup.number()
          .transform(transformUnNumber)
          .moreThan(0)
          .required(),
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
            <FormGroup>
              <Label for="name" className="mr-sm-2 required">
                Name<span className="text-danger">*</span>
              </Label>
              <Input
                invalid={!!errors.name}
                type="text"
                name="name"
                innerRef={register}
                id="name"
                placeholder="Name"
              />
              <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="subject" className="mr-sm-2">
                Partner
              </Label>
              <Controller
                name="subject"
                defaultValue={formData ? formData.partnerCompanyId : null}
                control={control}
                render={({ onChange, ...data }) => (
                  <SelectSubject
                    id="subject"
                    placeholder="Choose Partner"
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
            <FormGroup>
              <Label for="tagging" className="mr-sm-2">
                Tagging
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
          <Col md="6">
            <FormGroup>
              <Label for="remark" className="mr-sm-2">
                Remark
              </Label>
              <Input
                rows={5}
                type="textarea"
                name="remark"
                innerRef={register}
                id="remark"
                placeholder="Remark"
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Table bordered hover striped size="sm">
            <thead>
              <tr>
                <th style={{ width: "30%" }}>
                  Product<span className="text-danger">*</span>
                </th>
                <th style={{ width: "250px" }}>
                  Unit<span className="text-danger">*</span>
                </th>
                <th style={{ width: "150px" }}>
                  Quantity<span className="text-danger">*</span>
                </th>
                <th style={{ width: "150px" }}>
                  Price Per Unit<span className="text-danger">*</span>
                </th>
                <th>Remark</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => (
                <OrderFormDetail
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
                    Add
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
