import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Alert, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import messages from './messages';
import Widget from '../../../components/Widget/Widget';
import Footer from '../../Layout/Footer';
import { verifyEmail } from '../../../libs/apis/auth.api';

export function VerifyMailPage() {
  const [isCheck, check] = useState(false);
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const email = params.get('email');
  const token = params.get('token');
  useEffect(() => {
    verifyEmail({ email, token }).then(t => {
      check(true);
      console.log(t);
    });
  }, []);
  return (
    <div>
      <Helmet>
        <title>Verify Email</title>
        <meta name="description" content="Description of Register" />
      </Helmet>
      <div className="auth-page d-flex align-items-center">
        <Container>
          <Widget
            className="widget-auth mx-auto"
            title={
              <h3 className="mt-0">
                <FormattedMessage {...messages.header} />
              </h3>
            }
          >
            <>
              {isCheck ? (
                <Alert color="success">
                  Email has been activated successful!.
                  <Link className="text-center mb-4" to="/">
                    Login
                  </Link>
                </Alert>
              ) : (
                <Alert color="danger">Invalid email or activate token!</Alert>
              )}
            </>
          </Widget>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export default VerifyMailPage;
