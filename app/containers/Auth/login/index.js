import React, { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
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
import { mutate } from 'swr';
import { toast } from 'react-toastify';
import messages from './messages';
import Widget from '../../../components/Widget/Widget';
import Footer from '../../Layout/Footer';
import SubmitButton from '../../../components/button/SubmitButton';
import { login, resendEmailActive } from '../../../libs/apis/auth.api';
import { set, STORAGE } from '../../../libs/utils/storage';
import useUser, { SWR_KEY_USER } from '../../../libs/hooks/useUser';
import useMyForm from '../../../libs/hooks/useMyForm';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid Email1')
    .required(),
  password: yup.string().required(),
});

export function Login() {
  const { isAuthenticated } = useUser();
  const {
    register,
    errors,
    onSubmit,
    formState,
    getValues,
    state: { isLoading, errors: serverErrors, resp },
  } = useMyForm({
    validationSchema: schema,
    api: formData => login(formData),
  });

  useEffect(() => {
    if (resp) {
      set(STORAGE.JWT, resp.token);
      mutate(SWR_KEY_USER).then();
    }
  }, [resp]);

  const formEls = useMemo(
    () => (
      <>
        <form onSubmit={onSubmit} noValidate>
          <FormGroup className="mt">
            <Label for="email">Email</Label>
            <InputGroup className="input-group-no-border">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="la la-user text-white" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                invalid={!!errors.email}
                id="email"
                className="input-transparent pl-3"
                type="email"
                innerRef={register}
                name="email"
                placeholder="Email"
              />
              <FormFeedback>
                <FormattedMessage {...messages.invalidEmail} />
              </FormFeedback>
            </InputGroup>
          </FormGroup>
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
                <FormattedMessage {...messages.invalidPassword} />
              </FormFeedback>
            </InputGroup>
          </FormGroup>
          <div className="bg-widget auth-widget-footer">
            <SubmitButton
              type="submit"
              color="danger"
              className="auth-btn"
              size="sm"
              disabled={!(formState.isValid && formState.isDirty)}
              isLoading={isLoading}
              style={{ color: '#fff' }}
            >
              <FormattedMessage {...messages.loginButton} />
            </SubmitButton>
            <Link
              className="d-block text-right mt-2"
              to="/forgot-password/send-mail"
            >
              Forget Password ?
            </Link>
            <p className="widget-auth-info mt-4">
              Don&apos;t have an account? Sign up now!
            </p>
            <Link className="d-block text-center mb-4" to="/register">
              Create an Account
            </Link>
          </div>
        </form>
      </>
    ),
    [onSubmit, errors, register, formState, isLoading],
  );

  return isAuthenticated ? (
    <Redirect
      to={{
        pathname: '/',
      }}
    />
  ) : (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
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
            <p className="widget-auth-info">Use your email to sign in.</p>
            <>
              {serverErrors && serverErrors.length ? (
                <Alert fade={false} color="danger" className="mt-4">
                  <ul className="m-0">
                    {serverErrors.map(t => (
                      <li key={uuidv4()}>
                        {t.message}
                        {serverErrors[0].code === 'EMAIL_NOT_ACTIVE' ? (
                          <>
                            <br />
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a
                              href="#"
                              className="alert-link"
                              onClick={() => {
                                resendEmailActive(getValues().email).then(
                                  () => {
                                    toast.success(
                                      'Resend Email For activation success.',
                                    );
                                  },
                                );
                              }}
                            >
                              Click here for resend Email Activate
                            </a>
                          </>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </Alert>
              ) : null}
              {formEls}
            </>
          </Widget>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export default Login;
