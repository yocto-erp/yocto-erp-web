import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Table,
  Button,
} from 'reactstrap';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import { v4 as uuidv4 } from 'uuid';
import { Controller, useFieldArray } from 'react-hook-form';
import productApi from '../../../libs/apis/product.api';
import Widget from '../../../components/Widget/Widget';
import SubmitButton from '../../../components/button/SubmitButton';
import BackButton from '../../../components/button/BackButton';
import { useHookCRUDForm } from '../../../libs/hooks/useHookCRUDForm';
import CreateButton from '../../../components/button/CreateButton';
import FileUpload from '../../../components/FileUpload';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required.'),
  priceBaseUnit: Yup.number()
    .moreThan(0)
    .required('This field is required.'),
  units: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Unit name is required'),
        rate: Yup.number().required('Unit rate is required'),
      }),
    )
    .required('Product units is required'),
});

const { create, update, read } = productApi;

function MyForm({ id }) {
  const {
    control,
    register,
    submit,
    errors,
    state: { isLoading },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      console.log(`Success: ${JSON.stringify(resp)}`);
      toast.success(id ? 'Update product success' : 'Create product success');
    },
    mappingToForm: form => {
      console.log(`Mapping to form`);
      return {
        name: form.name,
        priceBaseUnit: form.priceBaseUnit,
        remark: form.remark,
        units: form.units,
      };
    },
    validationSchema,
    initForm: {
      priceBaseUnit: 0,
      units: [{ name: '', rate: 1 }],
    },
    id,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'units',
    // keyName: "id", default to "id", you can change the key name
  });

  const form = React.useMemo(() => {
    console.log('cache');
    return (
      <Form onSubmit={submit} noValidate formNoValidate>
        <Row>
          <Col xs="6" lg="6" md="12" sm="12">
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
              <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs="6" lg="6" md="12" sm="12">
            <FormGroup>
              <Label for="priceBaseUnit" className="required">
                Price Base Unit <span className="text-danger">*</span>
              </Label>
              <Input
                invalid={!!errors.priceBaseUnit}
                type="number"
                name="priceBaseUnit"
                innerRef={register}
                id="priceBaseUnit"
                placeholder="Product Price Base Unit"
              />
              <FormFeedback>
                {errors.priceBaseUnit && errors.priceBaseUnit.message}
              </FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs="6" lg="6" md="12" sm="12">
            <FormGroup>
              <Label for="files" className="required">
                Files
              </Label>
              <Controller
                invalid={!!errors.files}
                as={FileUpload}
                name="files"
                placeholder="Upload files"
                control={control}
                defaultValue={[]}
                accept={['image/*']}
                maxSize={5242880}
              />
              <FormFeedback>
                {errors.files && errors.files.message}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col xs="6" lg="6" md="12" sm="12">
            <FormGroup>
              <Label for="remark" className="mr-sm-2">
                Remark
              </Label>
              <Input
                type="textarea"
                name="remark"
                innerRef={register}
                id="remark"
                placeholder="Product Remark"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="6" lg="6" md="12" sm="12">
            <FormGroup>
              <Label>Units</Label>
              <Table bordered hover striped>
                <thead>
                  <tr>
                    <th>
                      Unit Name <span className="text-danger">*</span>
                    </th>
                    <th style={{ width: '120px' }}>
                      Rate <span className="text-danger">*</span>
                    </th>
                    <th className="action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        <Input
                          type="text"
                          invalid={
                            !!get(errors, ['units', index, 'name'], false)
                          }
                          name={`units[${index}].name`}
                          innerRef={register()}
                          defaultValue={item.name} // make sure to set up defaultValue
                        />
                        <FormFeedback>
                          {get(errors, ['units', index, 'name', 'message'], '')}
                        </FormFeedback>
                      </td>
                      <td style={{ width: '120px' }}>
                        <Input
                          invalid={
                            !!get(errors, ['units', index, 'rate'], false)
                          }
                          type="text"
                          name={`units[${index}].rate`}
                          disabled={item.rate === 1}
                          innerRef={register()}
                          defaultValue={item.rate} // make sure to set up defaultValue
                        />
                        <FormFeedback>
                          {get(errors, ['units', index, 'rate', 'message'], '')}
                        </FormFeedback>
                      </td>
                      <td className="action">
                        <Button
                          type="button"
                          color="danger"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          <i className="fi flaticon-trash" />{' '}
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
                            name: '',
                            rate: fields && fields.length === 0 ? 1 : '',
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
          </Col>
          <Col xs="6" lg="6" md="12" sm="12" />
        </Row>
        <BackButton className="mr-2" />
        <SubmitButton isLoading={isLoading} />
      </Form>
    );
  }, [errors, isLoading, submit, register]);
  console.log('MyForm');

  return <Widget>{form}</Widget>;
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

MyForm.defaultProps = {};

export default MyForm;
