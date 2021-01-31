import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import useStudentConfigure from '../../../libs/hooks/useStudentConfigure';
import ModalOKButton from '../../../components/button/ModalOKButton';
import Price from '../../../components/common/Price';

const StudentInfoView = ({ student, isOpen, onClose }) => {
  const { configure } = useStudentConfigure();
  const studentClass = useMemo(() => {
    let rs = null;
    if (student && configure) {
      rs = configure.classes.find(t => t.id === student.class);
    }
    return rs;
  }, [student, configure]);
  return (
    <Modal className="primary" isOpen={isOpen} fade={false}>
      <ModalHeader toggle={() => onClose(false)}>
        {student?.child.name} ({student?.alias})
      </ModalHeader>
      <ModalBody>
        <table className="table-no-border summary">
          <tbody>
            <tr>
              <td>Class</td>
              <td>
                <strong>{studentClass?.name}</strong>
              </td>
            </tr>
            {student?.father ? (
              <tr>
                <td>Father</td>
                <td>
                  <strong>{student?.father.name}</strong>
                </td>
              </tr>
            ) : null}
            {student?.mother ? (
              <tr>
                <td>Mother</td>
                <td>
                  <strong>{student?.mother.name}</strong>
                </td>
              </tr>
            ) : null}
            <tr>
              <td>Monthly Tuition Fee</td>
              <td>
                <strong>
                  <Price amount={studentClass?.tuitionFee} />
                </strong>
              </td>
            </tr>
            <tr>
              <td>Daily Fee Return</td>
              <td>
                <strong>
                  <Price amount={studentClass?.feePerDay} scale={2} />
                </strong>
              </td>
            </tr>
            <tr>
              <td>Daily Meal Fee Return</td>
              <td>
                <strong>
                  <Price amount={studentClass?.mealFeePerDay} scale={2} />
                </strong>
              </td>
            </tr>
            <tr>
              <td>Daily Trial Fee</td>
              <td>
                <strong>
                  <Price amount={studentClass?.feePerTrialDay} />
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
      </ModalBody>
      <ModalFooter>
        <ModalOKButton color="primary" onClick={() => onClose(false)}>
          <i className="fa fa-check" /> OK
        </ModalOKButton>
      </ModalFooter>
    </Modal>
  );
};

StudentInfoView.propTypes = {
  student: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default StudentInfoView;
