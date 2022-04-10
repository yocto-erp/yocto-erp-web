import React, { useEffect } from "react";
import { Form } from "reactstrap";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import Widget from "../../components/Widget/Widget";
import useMyForm from "../../libs/hooks/useMyForm";
import SubmitButton from "../../components/button/SubmitButton";
import { API_STATE } from "../../libs/hooks/useApi";
import InputAsyncTagging from "../../components/Form/InputAsyncTagging";
import taggingApi from "../../libs/apis/tagging.api";
import saleApi from "../../libs/apis/order/sale.api";

const validationSchema = Yup.object().shape({
  taggingPOSDebt: Yup.array(),
  taggingPOSCost: Yup.array(),
  taggingPOSWarehouse: Yup.array(),
});
const SaleConfigurePage = () => {
  const {
    control,
    onSubmit,
    reset,
    formState: { isValid, isDirty },
    state,
  } = useMyForm({
    api: async data => saleApi.saveConfigure(data),
    validationSchema,
    defaultValues: {
      numberDayOfMonth: 0,
      feePerDay: 0,
      monthlyTuitionFee: 0,
      feePerTrialDay: 0,
      mealFeePerDay: 0,
      busFee: 0,
      busRoutes: [{ id: "", name: "" }],
      classes: [
        {
          id: "",
          name: "",
          tuitionFee: 0,
          feePerDay: 0,
          feePerTrialDay: 0,
          mealFeePerDay: 0,
          mealFeePerMonth: 0,
        },
      ],
      printTemplateId: "",
    },
  });

  useEffect(() => {
    saleApi.getConfigure().then(resp => {
      console.log(resp);
      if (resp) {
        reset(resp);
      }
    });
  }, [reset]);

  useEffect(() => {
    if (state.status === API_STATE.SUCCESS) {
      toast.success(`Update Sale Configuration success.`);
    } else if (state.status === API_STATE.FAIL) {
      toast.error(state.errors.map(t => t.message || t.code).join("\n"));
    }
  }, [state]);

  return (
    <Widget>
      <Form onSubmit={onSubmit} noValidate formNoValidate>
        <p className="form-heading">Tagging mặc định</p>
        <div className="form-group row">
          <label htmlFor="taggingPOSDebt" className="col-md-3 col-form-label">
            Phiếu ghi nợ từ POS
          </label>
          <div className="col-md-9">
            <Controller
              name="taggingPOSDebt"
              defaultValue={null}
              control={control}
              render={({ onChange, ...data }) => (
                <InputAsyncTagging
                  id="taggingPOSDebt"
                  {...data}
                  onChange={onChange}
                  loadOptionApi={taggingApi.search}
                />
              )}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="taggingPOSCost" className="col-md-3 col-form-label">
            Phiếu thu tiền từ POS
          </label>
          <div className="col-md-9">
            <Controller
              name="taggingPOSCost"
              id="taggingPOSCost"
              defaultValue={null}
              control={control}
              render={({ onChange, ...data }) => (
                <InputAsyncTagging
                  {...data}
                  onChange={onChange}
                  loadOptionApi={taggingApi.search}
                />
              )}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="taggingPOSWarehouse"
            className="col-md-3 col-form-label"
          >
            Phiếu xuất kho từ POS
          </label>
          <div className="col-md-9">
            <Controller
              name="taggingPOSWarehouse"
              defaultValue={null}
              control={control}
              render={({ onChange, ...data }) => (
                <InputAsyncTagging
                  id="taggingPOSWarehouse"
                  {...data}
                  onChange={onChange}
                  loadOptionApi={taggingApi.search}
                />
              )}
            />
          </div>
        </div>
        <SubmitButton
          isLoading={state.status === API_STATE.LOADING}
          disabled={!(isValid && isDirty)}
        />
      </Form>
    </Widget>
  );
};

SaleConfigurePage.propTypes = {};

export default SaleConfigurePage;
