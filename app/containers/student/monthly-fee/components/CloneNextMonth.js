import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import * as Yup from "yup";
import { Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import ModalCancelButton from "../../../../components/button/ModalCancelButton";
import studentMonthlyFeeApi from "../../../../libs/apis/student/student-monthly-fee.api";
import FormHookErrorMessage from "../../../../components/Form/FormHookErrorMessage";
import useSyncForm from "../../../../libs/hooks/useSyncForm";
import SubmitButton from "../../../../components/button/SubmitButton";
import { transformUnNumber } from "../../../../libs/utils/number.util";
import InputNumber from "../../../../components/Form/InputNumber";
import { STUDENT_MONTHLY_ROOT_PATH } from "../constants";
import { newPage } from "../../../../libs/utils/crud.util";
import MonthRangeSelect from "../../../../components/date/MonthRangeSelect";

const CloneNextMonth = ({
  isOpen = false,
  ids = [],
  onClose,
  isUpdated = false,
}) => {
  const history = useHistory();
  const validationSchema = React.useMemo(
    () =>
      Yup.object().shape({
        monthYear: Yup.object()
          .required("This field is required.")
          .nullable(true),
        absentDay: Yup.number().transform(transformUnNumber),
        returnMealDay: Yup.number().transform(transformUnNumber),
      }),
    [],
  );
  const {
    errors,
    onSubmit,
    control,
    formState: { isDirty, isValid },
  } = useSyncForm({
    validationSchema,
    api: formData =>
      new Promise(resolve => {
        const details = result.map(t => ({
          ...t,
          id: uuidv4(),
          monthYear: formData.monthYear,
          absentDay: formData.absentDay || "",
          studentAbsentDay: formData.returnMealDay || "",
        }));
        history.push(newPage(STUDENT_MONTHLY_ROOT_PATH), { details });
        resolve(true);
      }),
  });

  const [result, setResult] = useState([]);

  useEffect(() => {
    if (ids && ids.length) {
      studentMonthlyFeeApi.read(ids.toString()).then(data => {
        setResult(data);
      });
    }
  }, [ids]);

  return (
    <Modal isOpen={isOpen} fade={false}>
      <Form onSubmit={onSubmit} noValidate formNoValidate>
        <ModalHeader toggle={() => onClose(false)}>
          Clone Student Next Month
        </ModalHeader>
        <ModalBody>
          <div className="form-group form-row">
            <label htmlFor="monthYear" className="col-md-4 col-form-label">
              Month Year
            </label>
            <div className="col-md-8">
              <Controller
                defaultValue={null}
                control={control}
                name="monthYear"
                render={({ onChange, value, onBlur }, { invalid }) => (
                  <MonthRangeSelect
                    onChange={onChange}
                    onBlur={onBlur}
                    isClearable={!isUpdated}
                    value={value}
                    disabled={isUpdated}
                    invalid={invalid}
                  />
                )}
              />
              <FormHookErrorMessage error={errors.monthYear} />
            </div>
          </div>
          <div className="form-group form-row">
            <label htmlFor="absentDay" className="col-md-4 col-form-label">
              Days Return Fee
            </label>
            <div className="col-md-8">
              <Controller
                control={control}
                defaultValue=""
                id="absentDay"
                name="absentDay"
                invalid={errors.absentDay}
                render={({ onChange, value, onBlur, ...props }) => (
                  <InputNumber
                    {...props}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Days Return Fee"
                  />
                )}
              />
              <FormHookErrorMessage error={errors.absentDay} />
            </div>
          </div>
          <div className="form-group form-row">
            <label htmlFor="returnMealDay" className="col-md-4  col-form-label">
              Meal days return
            </label>
            <div className="col-md-8">
              <Controller
                control={control}
                defaultValue=""
                id="returnMealDay"
                name="returnMealDay"
                invalid={errors.returnMealDay}
                render={({ onChange, value, onBlur, ...props }) => (
                  <InputNumber
                    {...props}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Meal Days Return"
                  />
                )}
              />
              <FormHookErrorMessage error={errors.returnMealDay} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton onClick={() => onClose(false)} />
          <SubmitButton disabled={!isDirty || !isValid} color="primary" />
        </ModalFooter>
      </Form>
    </Modal>
  );
};

CloneNextMonth.propTypes = {
  ids: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  isUpdated: PropTypes.bool,
};

export default CloneNextMonth;
