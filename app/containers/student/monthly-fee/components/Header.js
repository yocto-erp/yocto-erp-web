import React from 'react';
import PropTypes from 'prop-types';
import CreateButton from '../../../../components/button/CreateButton';
import { newPage, editPage } from '../../../../libs/utils/crud.util';
import { useListStateContext } from '../../../../components/ListWidget/constants';
import SendMailButton from '../../../../components/button/SendMailButton';
import ConfigureButton from '../../../../components/button/ConfigureButton';
import { STUDENT_CONFIGURATION_ROOT_PATH } from '../../constants';
import PageTitle from '../../../Layout/PageTitle';
import { STUDENT_MONTHLY_ROOT_PATH } from '../constants';

const ROOT_PATH = STUDENT_MONTHLY_ROOT_PATH;
const Header = ({ history }) => {
  const getStateSelect = useListStateContext();
  const actions = (
    <div>
      <CreateButton
        className="mr-2 btn-raised"
        onClick={() => {
          history.push(newPage(ROOT_PATH));
        }}
      />

      <CreateButton
        className="mr-2 btn-raised"
        text="Edit"
        icon="fi flaticon-edit"
        color="warning"
        onClick={() => {
          history.push(editPage(ROOT_PATH, Object.values(getStateSelect)));
        }}
      />

      <SendMailButton
        className="mr-2 btn-raised"
        onClick={() => {
          history.push(newPage(ROOT_PATH));
        }}
      />

      <ConfigureButton
        className="shadow btn-raised"
        onClick={() => {
          history.push(STUDENT_CONFIGURATION_ROOT_PATH);
        }}
      />
    </div>
  );
  return <PageTitle title="Student Monthly" actions={actions} />;
};

Header.propTypes = {
  history: PropTypes.any.isRequired,
};

export default Header;
