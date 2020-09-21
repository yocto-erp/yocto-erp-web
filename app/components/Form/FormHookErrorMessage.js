import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FormFeedback } from 'reactstrap';
import messages from './messages';

const FormErrorMessage = ({ error }) => {
  console.log(error);
  const errorMessage = useMemo(() => {
    if (!error) {
      return '';
    }
    if (messages[error.message]) {
      return (
        <FormFeedback>
          <FormattedMessage {...messages[error.message]} />
        </FormFeedback>
      );
    }
    return <FormFeedback>{error.message}</FormFeedback>;
  }, [error]);

  return <>{errorMessage}</>;
};
FormErrorMessage.propTypes = {
  error: PropTypes.object,
};

export default FormErrorMessage;
