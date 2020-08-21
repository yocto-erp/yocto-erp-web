import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from '../../components/messages';

const Footer = () => (
  <footer className="auth-footer">
    {<FormattedMessage {...messages.footer} />}
  </footer>
);

Footer.propTypes = {};

export default Footer;
