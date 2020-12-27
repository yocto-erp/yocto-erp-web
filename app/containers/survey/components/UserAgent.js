import React from 'react';
import PropTypes from 'prop-types';
import { parseUserAgent } from '../../../utils/client';

const UserAgent = ({ agent }) => {
  const ua = parseUserAgent(agent);
  console.log(ua);
  return (
    <div>
      {ua.browser.name}
      <br />
      {ua.os.name} - {ua.os.version}
    </div>
  );
};

UserAgent.propTypes = {
  agent: PropTypes.string,
};

export default UserAgent;
