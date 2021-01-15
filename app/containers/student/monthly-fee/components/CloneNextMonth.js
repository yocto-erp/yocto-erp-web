import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import ModalCancelButton from '../../../../components/button/ModalCancelButton';
import MonthSelect from '../../../../components/date/MonthSelect';
import studentMonthlyFeeApi from '../../../../libs/apis/student/student-monthly-fee.api';
import FormErrorMessage from '../../../../components/Form/FormHookErrorMessage';
import useSyncForm from '../../../../libs/hooks/useSyncForm';
import SubmitButton from '../../../../components/button/SubmitButton';

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
        monthYear: Yup.date()
          .required('This field is required.')
          .nullable(true),
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
        }));
        resolve(history.push('/student-monthly-fee/new', { details }));
      }),
  });

  const [result, setResult] = useState([]);

  useEffect(() => {
    if (ids) {
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
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="monthYear" className="mr-3">
                  Month Year
                </label>
                <Controller
                  defaultValue={new Date()}
                  control={control}
                  name="monthYear"
                  render={({ onChange, value, onBlur }) => (
                    <MonthSelect
                      onChange={onChange}
                      onBlur={onBlur}
                      isClearable={!isUpdated}
                      value={value}
                      disabled={isUpdated}
                      invalid={!!errors.monthYear}
                    />
                  )}
                />
                <FormErrorMessage error={errors.monthYear} />
              </div>
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
