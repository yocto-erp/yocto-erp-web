import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { toast } from 'react-toastify';
import ModalCancelButton from '../../../../components/button/ModalCancelButton';
import ModalOKButton from '../../../../components/button/ModalOKButton';
import { useApi } from '../../../../libs/hooks/useApi';
import EmailTemplateSelect from '../../../../components/common/template/EmailTemplateSelect';
import { TEMPLATE_TYPE } from '../../../../libs/apis/template/templateType.api';
import RawHTML from '../../../../components/RawHtml';
import studentMonthlyFeeApi from '../../../../libs/apis/student/student-monthly-fee.api';
import useStudentConfigure from '../../../../libs/hooks/useStudentConfigure';

const SendMailStudentFee = ({ isOpen = false, fees = [], onClose }) => {
  console.log(fees);
  const { configure } = useStudentConfigure();
  const [emailTemplate, setEmailTemplate] = React.useState(null);
  const [attached, setAttached] = React.useState(false);
  const {
    state: { isLoading, errors, resp },
    exec,
  } = useApi(() =>
    studentMonthlyFeeApi.sendEmail(
      fees,
      emailTemplate.templateId,
      attached,
      configure.printTemplateId,
    ),
  );

  useEffect(() => {
    if (errors && errors.length) {
      toast.error(errors.map(t => t.message).join('\n'));
    }
  }, [errors]);

  useEffect(() => {
    if (resp) {
      toast.success('Send Email request has been success.');
      onClose(false);
    }
  }, [resp, onClose]);

  return (
    <Modal className="primary large" isOpen={isOpen} fade={false}>
      <ModalHeader toggle={() => onClose(false)}>
        Send email to parent for monthly fee.
      </ModalHeader>
      <ModalBody>
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="emailTemplate">
                Email Template <span className="text-danger">*</span>
              </label>
              <EmailTemplateSelect
                id="emailTemplate"
                name="emailTemplate"
                placeholder="Select Email Template"
                value={emailTemplate}
                type={TEMPLATE_TYPE.STUDENT_FEE}
                onChange={val => {
                  console.log(val);
                  setEmailTemplate(val);
                }}
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="attachment"
                checked={attached}
                onChange={val => {
                  setAttached(val.target.checked);
                }}
              />
              <label className="form-check-label" htmlFor="attachment">
                Send with PDF Attachment
              </label>
            </div>
            <div className="alert alert-danger" role="alert">
              This will send email to student parent (include mother and father,
              if got information)
            </div>
          </div>
          <div className="col-8">
            <div className="form-group">
              <label htmlFor="subject">Email Preview</label>
              {emailTemplate ? (
                <div className="card">
                  <div className="card-body">
                    <div className="card-text">
                      <p>
                        <strong>Subject:</strong>
                      </p>
                      <p>{emailTemplate.subject}</p>
                      <hr />
                      <p>
                        <strong>Content:</strong>
                      </p>
                      <div style={{ maxHeight: 400, overflow: 'auto' }}>
                        <RawHTML html={emailTemplate.template.content} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalCancelButton onClick={() => onClose(false)} />
        <ModalOKButton
          color="primary"
          disabled={!emailTemplate}
          isLoading={isLoading}
          onClick={exec}
        >
          <i className="fa fa-envelope fa-fw mr-2" /> Send Email
        </ModalOKButton>
      </ModalFooter>
    </Modal>
  );
};

SendMailStudentFee.propTypes = {
  fees: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default SendMailStudentFee;
