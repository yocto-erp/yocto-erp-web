import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { Controller } from 'react-hook-form';
import { useHookCRUDForm } from '../../../libs/hooks/useHookCRUDForm';
import employeeApi from '../../../libs/apis/employee.api';
import Widget from '../../../components/Widget/Widget';
import SubmitButton from '../../../components/button/SubmitButton';
import BackButton from '../../../components/button/BackButton';
import { ERROR } from '../../../components/Form/messages';
import FormErrorMessage from '../../../components/Form/FormHookErrorMessage';
import CustomerSelect from '../../../components/common/customer/CustomerSelect';
import DateSelect from '../../../components/date/DateSelect';
import InputAmount from '../../../components/Form/InputAmount';

const validationSchema = Yup.object().shape({
  personId: Yup.object().required(ERROR.required),
  salary: Yup.number().required(ERROR.required),
});

const { create, update, read } = employeeApi;

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
          ? `Update Employee ${resp.person.name} success`
          : `Create Employee ${resp.person.name} success`,
      );
    },
    mappingToForm: form => ({
      // personId: form.personId,
      ...form,
      personId: form.person,
      startedDate: form.startedDate ? new Date(form.startedDate) : new Date(),
      // fullName: form.child
      //   ? `${form.child.firstName} ${form.child.lastName}`
      //   : '',
    }),
    mappingToServer: form => {
      console.log(form);
      return {
        ...form,
        // personId: form.personId,
        personId: form.personId ? form.personId.id : null,
        salary: form.salary,
        bio: form.bio,
        startedDate: form.startedDate,
      };
    },
    validationSchema,
    initForm: {
      personId: null,
      salary: '',
      bio: '',
    },
    id,
  });

  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormGroup>
          <Label for="" className="mr-sm-2">
            Employee
          </Label>
          <Controller
            name="personId"
            defaultValue={formData ? formData.personId : null}
            control={control}
            render={({ onChange, ...data }) => (
              <CustomerSelect
                id="personId"
                placeholder="Employee ID"
                onAdded={newPerson => {
                  setValue('personId', newPerson, {
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
          <Label for="salary" className="mr-sm-2">
            Salary
          </Label>
          <Controller
            type="number"
            name="salary"
            id="salary"
            invalid={!!errors.salary}
            control={control}
            as={InputAmount}
            defaultValue={formData?.salary}
            placeholder="Enter salary here"
          />
          <FormErrorMessage error={errors.salary} />
        </FormGroup>
        <FormGroup>
          <Label for="bio" className="required">
            BIO
          </Label>
          <Input
            type="textarea"
            name="bio"
            innerRef={register}
            id="bio"
            rows="4"
            cols="50"
            placeholder="Employee bio"
          />
        </FormGroup>
        <FormGroup>
          <Label for="startedDate" className="mr-sm-2">
            Join Date
          </Label>
          <div>
            <Controller
              defaultValue={formData ? formData.startedDate : null}
              name="startedDate"
              control={control}
              invalid={!!errors.startedDate}
              as={DateSelect}
            />
          </div>
          <FormErrorMessage error={errors.startedDate} />
        </FormGroup>
        <FormGroup>
          <Label for="bio" className="required">
            Status
          </Label>
          <Input name="status" type="select" innerRef={register}>
            <option value="">Select Status</option>
            <option value={1}>PENDING</option>
            <option value={2}>ACTIVE</option>
            <option value={3}>RESIGNED</option>
          </Input>
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
