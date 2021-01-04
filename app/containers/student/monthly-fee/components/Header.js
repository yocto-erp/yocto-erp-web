import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import CreateButton from '../../../../components/button/CreateButton';
import { editPage, newPage } from '../../../../libs/utils/crud.util';
import { useListStateContext } from '../../../../components/ListWidget/constants';
import SendMailButton from '../../../../components/button/SendMailButton';
import ConfigureButton from '../../../../components/button/ConfigureButton';
import { STUDENT_CONFIGURATION_ROOT_PATH } from '../../constants';
import PageTitle from '../../../Layout/PageTitle';
import { STUDENT_MONTHLY_ROOT_PATH } from '../constants';
import SendMailStudentFee from './SendMail';

const ROOT_PATH = STUDENT_MONTHLY_ROOT_PATH;
const Header = ({ history }) => {
  const getStateSelect = useListStateContext();
  const totalSelectedItems = Object.keys(getStateSelect).length;
  const [isOpenSendMail, setIsOpenSendMail] = React.useState(false);
  const actions = (
    <div>
      <div className="mr-2 d-inline">
        {totalSelectedItems ? (
          <span>Select: {totalSelectedItems} items</span>
        ) : null}
      </div>
      <CreateButton
        className="mr-2 btn-raised"
        onClick={() => {
          history.push(newPage(ROOT_PATH));
        }}
      />

      <CreateButton
        className="mr-2 btn-raised"
        icon="fi flaticon-edit"
        disabled={!totalSelectedItems}
        color="warning"
        onClick={() => {
          history.push(editPage(ROOT_PATH, Object.values(getStateSelect)));
        }}
      >
        Edit
      </CreateButton>

      <SendMailButton
        className="mr-2 btn-raised"
        disabled={!totalSelectedItems}
        onClick={() => {
          setIsOpenSendMail(true);
        }}
      />

      <ConfigureButton
        className="shadow btn-raised"
        onClick={() => {
          history.push(STUDENT_CONFIGURATION_ROOT_PATH);
        }}
      />
      <SendMailStudentFee
        key={uuidv4()}
        fees={Object.values(getStateSelect)}
        onClose={setIsOpenSendMail}
        isOpen={isOpenSendMail}
      />
    </div>
  );
  return <PageTitle title="Student Monthly Fee" actions={actions} />;
};

Header.propTypes = {
  history: PropTypes.any.isRequired,
};

export default Header;
