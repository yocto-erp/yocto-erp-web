import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import SubmitButton from '../../../../components/button/SubmitButton';
import ModalCancelButton from '../../../../components/button/ModalCancelButton';
import FormRow from '../../../../components/Form/FormRow';
import { LANGUAGE_TYPE } from '../../constants';
import useSyncForm from '../../../../libs/hooks/useSyncForm';

const AddLanguageModal = ({ isOpen, closeHandle }) => {
  const schema = Yup.object().shape({
    languageId: Yup.number().required('This field is required.'),
  });

  const {
    register,
    onSubmit,
    errors,
    formState: { isValid },
  } = useSyncForm({
    validationSchema: schema,
    api: async formData => {
      closeHandle(formData);
    },
  });

  return (
    <Modal isOpen={isOpen}>
      <Form onSubmit={onSubmit} noValidate formNoValidate>
        <ModalHeader toggle={() => closeHandle(false)}>
          Add Language To Survey
        </ModalHeader>
        <ModalBody>
          <FormRow
            label={
              <>
                Language<span className="text-danger">*</span>
              </>
            }
            name="languageId"
            type="select"
            register={register}
            error={errors.languageId}
          >
            <option value="">Select Language</option>
            {LANGUAGE_TYPE.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </FormRow>
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton onClick={() => closeHandle(false)} />
          <SubmitButton disabled={!isValid} />
        </ModalFooter>
      </Form>
    </Modal>
  );
};

AddLanguageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
};

export default AddLanguageModal;
