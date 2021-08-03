import React, { useEffect } from 'react';
import * as yup from 'yup';
import { Form } from 'reactstrap';
import { toast } from 'react-toastify';
import Widget from '../../components/Widget/Widget';
import useMyForm from '../../libs/hooks/useMyForm';
import { CompanySettingApi } from '../../libs/apis/configuration/company-setting.api';
import { ERROR } from '../../components/Form/messages';
import FormGroupInput from '../../components/Form/FormGroupInput';
import BackButton from '../../components/button/BackButton';
import SubmitButton from '../../components/button/SubmitButton';
import { API_STATE } from '../../libs/hooks/useApi';
import PageTitle from '../Layout/PageTitle';
import FormError from '../../components/Form/FormError';

const validationSchema = yup.object().shape({
  name: yup.string().required(ERROR.required),
  gsm: yup.string().required(ERROR.required),
  publicId: yup
    .string()
    .max(64)
    .required(ERROR.required),
});

const SettingCompany = () => {
  const {
    register,
    onSubmit,
    formState: { isValid, isDirty, errors },
    state,
    reset,
  } = useMyForm({
    api: CompanySettingApi.save,
    validationSchema,
  });

  useEffect(() => {
    if (state.status === API_STATE.SUCCESS) {
      toast.success('Update company success');
    }
  }, [state]);

  useEffect(() => {
    CompanySettingApi.get().then(t => {
      reset(t);
    });
  }, []);

  return (
    <>
      <PageTitle title="Update Company Information" />
      <div className="row">
        <div className="col-md-6">
          <Widget>
            {state.status === API_STATE.FAIL ? (
              <FormError errors={state.errors} />
            ) : null}
            <Form onSubmit={onSubmit} noValidate>
              <FormGroupInput
                name="publicId"
                label="Public Id"
                register={register}
                error={errors.publicId}
                type="text"
                placeholder="Public Id"
              />
              <FormGroupInput
                name="name"
                label="Name"
                register={register}
                error={errors.name}
                type="text"
                placeholder="Company Name"
              />
              <FormGroupInput
                name="gsm"
                label="Phone Number"
                register={register}
                error={errors.gsm}
                type="text"
                placeholder="Phone Number"
              />
              <FormGroupInput
                name="address"
                label="Address"
                register={register}
                type="text"
                placeholder="Address"
              />
              <FormGroupInput
                name="remark"
                label="Introduction"
                register={register}
                type="textarea"
                placeholder="Introduction"
              />
              <BackButton className="mr-2" />
              <SubmitButton
                isLoading={state.status === API_STATE.LOADING}
                disabled={!isDirty || !isValid}
              />
            </Form>
          </Widget>
        </div>
      </div>
    </>
  );
};

SettingCompany.propTypes = {};

export default SettingCompany;
