import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import {
  Alert,
  Container,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from 'reactstrap';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import messages from './messages';
import Widget from '../../../components/Widget/Widget';
import Footer from '../../Layout/Footer';
import { resetPassword, verifyToken } from '../../../libs/apis/auth.api';
import SubmitButton from '../../../components/button/SubmitButton';
import useMyForm from '../../../libs/hooks/useMyForm';
import FormError from '../../../components/Form/FormError';

const schema = yup.object().shape({
  password: yup.string().required('This field is required.'),
  rePassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('This field is required.'),
});

export function RestPasswordPage() {
  const [isCheck, check] = useState(false);
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const token = params.get('token');
  useEffect(() => {
    verifyToken({ token }).then(t => {
      check(true);
    });
  }, []);

  const {
    register,
    errors,
    onSubmit,
    state: { isLoading, resp, errors: backendErrors },
  } = useMyForm({
    validationSchema: schema,
    api: formData => {
      const { password, rePassword } = formData;
      return resetPassword({ token, password, rePassword });
    },
  });

  return (
    <div>
      <Helmet>
        <title>Reset your password!</title>
        <meta name="description" content="Description of reset password" />
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
              {resp ? (
                <Alert color="info" fade={false}>
                  Reset Password successful!.
                  <br />
                  <Link className="alert-link" to="/">
                    Login here
                  </Link>
                </Alert>
              ) : (
                <>
                  {isCheck ? (
                    <form onSubmit={onSubmit} noValidate>
                      {backendErrors && backendErrors.length ? (
                        <FormError errors={backendErrors} />
                      ) : (
                        ''
                      )}
                      <FormGroup>
                        <Label for="password">Password</Label>
                        <InputGroup className="input-group-no-border">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="la la-lock text-white" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            invalid={!!errors.password}
                            id="password"
                            className="input-transparent pl-3"
                            type="password"
                            innerRef={register}
                            required
                            name="password"
                            placeholder="Password"
                          />
                          <FormFeedback>
                            {errors.password && errors.password.message}
                          </FormFeedback>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <Label for="rePassword">Retype Password</Label>
                        <InputGroup className="input-group-no-border">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="la la-lock text-white" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            invalid={!!errors.rePassword}
                            id="rePassword"
                            className="input-transparent pl-3"
                            type="password"
                            innerRef={register}
                            required
                            name="rePassword"
                            placeholder="Retype Password"
                          />
                          <FormFeedback>
                            {errors.rePassword && errors.rePassword.message}
                          </FormFeedback>
                        </InputGroup>
                      </FormGroup>
                      <div className="bg-widget auth-widget-footer">
                        <SubmitButton
                          type="submit"
                          color="danger"
                          className="auth-btn text-white mb-3"
                          size="sm"
                          isLoading={isLoading}
                        >
                          <FormattedMessage {...messages.resetPasswordButton} />
                        </SubmitButton>
                      </div>
                    </form>
                  ) : (
                    <Alert color="danger">
                      Invalid token!
                      <br />
                      <Link to="/" className="alert-link">
                        Back Login
                      </Link>
                    </Alert>
                  )}
                </>
              )}
            </>
          </Widget>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export default RestPasswordPage;
