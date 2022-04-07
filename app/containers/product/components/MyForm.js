import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import { toast } from "react-toastify";
import get from "lodash/get";
import { v4 as uuidv4 } from "uuid";
import { Controller, useFieldArray } from "react-hook-form";
import productApi from "../../../libs/apis/product/product.api";
import Widget from "../../../components/Widget/Widget";
import SubmitButton from "../../../components/button/SubmitButton";
import BackButton from "../../../components/button/BackButton";
import { useHookCRUDForm } from "../../../libs/hooks/useHookCRUDForm";
import CreateButton from "../../../components/button/CreateButton";
import FormHookErrorMessage from "../../../components/Form/FormHookErrorMessage";
import { ERROR } from "../../../components/Form/messages";
import InputNumber from "../../../components/Form/InputNumber";
import InputAsyncTagging from "../../../components/Form/InputAsyncTagging";
import taggingApi from "../../../libs/apis/tagging.api";
import FormError from "../../../components/Form/FormError";
import AssetSelect from "../../../components/assets/AssetSelect";
import { MIME_TYPE } from "../../../components/assets/constants";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(ERROR.required),
  priceBaseUnit: Yup.number()
    .typeError(ERROR.required)
    .positive(ERROR.amountGT0),
  tagging: Yup.array().nullable(),
  units: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required(ERROR.required),
        rate: Yup.number()
          .typeError(ERROR.required)
          .moreThan(0, ERROR.amountGT0)
          .required(ERROR.required),
      }),
    )
    .required(ERROR.required),
});

const { create, update, read } = productApi;

function MyForm({ id }) {
  const {
    control,
    register,
    submit,
    errors,
    state: { isLoading, formData, errors: serverErrors },
    formState: { isDirty, isValid },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update product ${resp.name} success`
          : `Create product ${resp.name} success`,
      );
    },
    validationSchema,
    initForm: {
      priceBaseUnit: 0,
      units: [{ name: "", rate: 1 }],
      assets: [],
      tagging: [],
    },
    id,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "units",
    keyName: "fId",
  });

  return (
    <Widget>
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormError errors={serverErrors} />
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label for="name" className="mr-sm-2 required">
                Name <span className="text-danger">*</span>
              </Label>
              <Input
                invalid={!!errors.name}
                type="text"
                name="name"
                innerRef={register}
                id="name"
                placeholder="Product Name"
              />
              <FormHookErrorMessage error={errors.name} />
            </FormGroup>
            <FormGroup>
              <Label for="productDocumentId" className="mr-sm-2 required">
                Product Document Id
              </Label>
              <Input
                invalid={!!errors.productDocumentId}
                type="text"
                name="productDocumentId"
                innerRef={register}
                id="productDocumentId"
                placeholder="Product Document Id"
              />
              <FormHookErrorMessage error={errors.productDocumentId} />
            </FormGroup>
            <FormGroup>
              <Label for="tagging" className="mr-sm-2">
                Tagging
              </Label>
              <Controller
                name="tagging"
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
            <FormGroup>
              <Label for="remark" className="mr-sm-2">
                Remark
              </Label>
              <Input
                type="textarea"
                name="remark"
                cols={20}
                innerRef={register}
                id="remark"
                placeholder="Product Remark"
              />
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormGroup>
              <Label>Units</Label>
              <Table bordered hover striped>
                <thead>
                  <tr>
                    <th>
                      Unit Name <span className="text-danger">*</span>
                    </th>
                    <th style={{ width: "120px" }}>
                      Rate <span className="text-danger">*</span>
                    </th>
                    <th className="action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((item, index) => (
                    <tr key={`unit${item.id}`}>
                      <td>
                        <Input
                          type="text"
                          invalid={
                            !!get(errors, ["units", index, "name"], false)
                          }
                          name={`units[${index}].name`}
                          innerRef={register()}
                          defaultValue={item.name}
                        />
                        <FormHookErrorMessage
                          error={get(errors, ["units", index, "name"])}
                        />
                      </td>
                      <td style={{ width: "120px" }}>
                        <Controller
                          invalid={
                            !!get(errors, ["units", index, "rate"], false)
                          }
                          readOnly={item.rate === 1}
                          name={`units[${index}].rate`}
                          control={control}
                          as={InputNumber}
                          defaultValue={item.rate}
                        />
                        <FormHookErrorMessage
                          error={get(errors, ["units", index, "rate"])}
                        />
                      </td>
                      <td className="action">
                        <Button
                          type="button"
                          color="danger"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          <i className="fi flaticon-trash" />{" "}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3">
                      <CreateButton
                        size="sm"
                        type="button"
                        onClick={() =>
                          append({
                            id: uuidv4(),
                            name: "",
                            rate: fields && fields.length === 0 ? 1 : "",
                          })
                        }
                      >
                        Add Unit
                      </CreateButton>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </FormGroup>
            <FormGroup>
              <Label for="files" className="sr-only">
                Files
              </Label>
              <Controller
                defaultValue={formData?.assets}
                name="assets"
                control={control}
                render={({ onChange, ...data }, { invalid }) => (
                  <AssetSelect
                    fileTypes={[MIME_TYPE.IMAGE]}
                    placeholder="Select Images"
                    {...data}
                    onChange={onChange}
                    className="h-100"
                    invalid={invalid}
                  />
                )}
              />
              <FormHookErrorMessage error={errors.assets} />
            </FormGroup>
          </Col>
        </Row>

        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} disabled={!(isValid && isDirty)} />
      </Form>
    </Widget>
  );
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
