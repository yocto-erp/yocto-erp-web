import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { Controller } from 'react-hook-form';
import { useHookCRUDForm } from '../../../libs/hooks/useHookCRUDForm';
import Widget from '../../../components/Widget/Widget';
import SubmitButton from '../../../components/button/SubmitButton';
import BackButton from '../../../components/button/BackButton';
import { ERROR } from '../../../components/Form/messages';
import FormErrorMessage from '../../../components/Form/FormHookErrorMessage';
import TimeSelect from '../../../components/date/TimeSelect';
import shiftWorkApi from '../../../libs/apis/shift-work.api';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(ERROR.required),
});

const { create, update, read } = shiftWorkApi;

function MyForm({ id }) {
  const {
    control,
    register,
    submit,
    errors,
    setValue,
    state: { isLoading },
    formState: { isDirty, formData, isValid },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update shift-work ${resp.name} success`
          : `Create shift-work ${resp.name} success`,
      );
    },
    mappingToForm: form => ({
      ...form,
      name: form.name,
      fromTime: form.fromTime,
      toTime: form.toTime,
      remark: form.remark,
    }),
    mappingToServer: form => {
      console.log(form);
      return {
        ...form,
        name: form.name,
        remark: form.remark,
        fromTime: form.fromTime,
        toTime: form.toTime,
      };
    },
    validationSchema,
    initForm: {
      name: null,
      fromTime: '',
      toTime: '',
      remark: '',
    },
    id,
  });

  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormGroup>
          <Label for="name" className="mr-sm-2">
            Name
          </Label>
          <Input
            invalid={!!errors.name}
            type="text"
            name="name"
            innerRef={register}
            id="name"
            placeholder="shiftWork Name"
          />
          <FormErrorMessage error={errors.name} />
        </FormGroup>

        <Row>
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
            <FormGroup>
              <Label for="fromTime" className="mr-sm-2">
                From Time
              </Label>
              <div>
                <Controller
                  defaultValue={formData ? formData.fromTime : null}
                  name="fromTime"
                  control={control}
                  invalid={!!errors.fromTime}
                  as={TimeSelect}
                />
              </div>
              <FormErrorMessage error={errors.fromTime} />
            </FormGroup>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4" xl="4">
            <FormGroup>
              <Label for="toTime" className="required">
                To Time
              </Label>
              <div>
                <Controller
                  defaultValue={formData ? formData.toTime : null}
                  name="toTime"
                  control={control}
                  invalid={!!errors.toTime}
                  as={TimeSelect}
                />
              </div>
              <FormErrorMessage error={errors.toTime} />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="remark" className="required">
            Remark
          </Label>
          <Input
            type="textarea"
            name="remark"
            innerRef={register}
            id="remark"
            rows="6"
            cols="50"
            placeholder="remark"
          />
        </FormGroup>
        <BackButton className="mr-2" />
        <SubmitButton disabled={!isValid || !isDirty} isLoading={isLoading} />
      </Form>
    ),
    [errors, isLoading, submit, register, isValid, isDirty],
  );
  return <Widget>{form}</Widget>;
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
