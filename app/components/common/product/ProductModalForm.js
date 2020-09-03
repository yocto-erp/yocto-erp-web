import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from 'reactstrap';
import { yupResolver } from '@hookform/resolvers';
import { useFieldArray, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import FormRow from '../../Form/FormRow';
import ModalCancelButton from '../../button/ModalCancelButton';
import SubmitButton from '../../button/SubmitButton';
import CreateButton from '../../button/CreateButton';
import productApi from '../../../libs/apis/product/product.api';
import { useAsync } from '../../../libs/hooks/useAsync';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required.'),
  priceBaseUnit: Yup.number(),
  units: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('This field is required.'),
        rate: Yup.number().required('This field is required.'),
      }),
    )
    .required('This field is required.'),
});

const ProductModalForm = ({ isOpen, closeHandle }) => {
  const {
    control,
    register,
    handleSubmit,
    errors,
    formState: { isValid, isDirty },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: { name: 'test', units: [{ name: '', rate: 1 }] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'units',
    // keyName: "id", default to "id", you can change the key name
  });
  const [isLoading, exec] = useAsync({ asyncApi: productApi.create });
  const onSubmit = handleSubmit(val => {
    console.log(val);
    exec(val).then(result => {
      toast.success(`Create Product ${result.name} success !`);
      closeHandle(result);
    });
  });
  return (
    <Modal isOpen={isOpen}>
      <Form noValidate formNoValidate>
        <ModalHeader toggle={() => closeHandle(false)}>
          Product Form
        </ModalHeader>
        <ModalBody>
          <FormRow
            label={
              <>
                Name<span className="text-danger">*</span>
              </>
            }
            name="name"
            type="text"
            error={errors.name}
            register={register}
            placeholder="Product Name"
          />
          <FormRow
            label={
              <>
                Price<span className="text-danger">*</span>
              </>
            }
            name="priceBaseUnit"
            type="number"
            register={register}
            error={errors.priceBaseUnit}
            placeholder="Product Price Base Unit"
          />
          <FormRow
            label="Remark"
            name="remark"
            type="textarea"
            register={register}
            placeholder="Remark"
          />
          <FormGroup>
            <Label>Units</Label>
            <Table bordered hover striped>
              <thead>
                <tr>
                  <th>
                    Unit Name<span className="text-danger">*</span>
                  </th>
                  <th style={{ width: '120px' }}>
                    Rate<span className="text-danger">*</span>
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
                        invalid={!!get(errors, ['units', index, 'name'], false)}
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
                        invalid={!!get(errors, ['units', index, 'rate'], false)}
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

ProductModalForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
};

export default ProductModalForm;
