import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../../../../components/button/IconButton';
import { MAIL_MERGE_ROW_STATE } from '../constants';

const MailMergeStateBtnIcon = ({ state, ...props }) => {
  let rs = '';
  let color = 'warning';
  // eslint-disable-next-line default-case
  switch (state) {
    case MAIL_MERGE_ROW_STATE.PENDING:
      rs = <i className="fa fa-send" />;
      break;
    case MAIL_MERGE_ROW_STATE.DONE:
      color = 'success';
      rs = <i className="fa fa-check" />;
      break;
    case MAIL_MERGE_ROW_STATE.FAIL:
      color = 'danger';
      rs = <i className="fa fa-circle-o" />;
      break;
  }
  return (
    <IconButton color={color} {...props}>
      {rs}
    </IconButton>
  );
};

MailMergeStateBtnIcon.propTypes = {
  state: PropTypes.number,
};

export default MailMergeStateBtnIcon;
