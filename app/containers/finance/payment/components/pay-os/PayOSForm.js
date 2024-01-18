import React from "react";

import { useFormContext } from "react-hook-form";
import FormGroupInput from "../../../../../components/Form/FormGroupInput";

const PayOSForm = () => {
  const { register, errors } = useFormContext();
  return (
    <>
      <FormGroupInput
        label="Client ID"
        isRequired
        name="setting.payos.clientId"
        placeholder="Client ID"
        type="text"
        error={errors.setting?.payos?.clientId}
        register={register}
      />
      <FormGroupInput
        label="API Key"
        isRequired
        name="setting.payos.apiKey"
        placeholder="Api Key"
        type="text"
        error={errors.setting?.payos?.apiKey}
        register={register}
      />
      <FormGroupInput
        label="Checksum"
        isRequired
        name="setting.payos.checksum"
        placeholder="Checksum"
        type="text"
        error={errors.setting?.payos?.checksum}
        register={register}
      />
    </>
  );
};

PayOSForm.propTypes = {};

export default PayOSForm;
