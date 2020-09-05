import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import {
  Container,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormFeedback,
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { mutate } from 'swr';
import messages from './messages';
import Widget from '../../../components/Widget/Widget';
import Footer from '../../Layout/Footer';
import SubmitButton from '../../../components/button/SubmitButton';
import { login } from '../../../libs/apis/auth.api';
import { set, STORAGE } from '../../../libs/utils/storage';
import { SWR_KEY_USER } from '../../../libs/hooks/useUser';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid Email1')
    .required(),
  password: yup.string().required(),
});

export function Login() {
  const {
    register,
    errors,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = formData => {
    login(formData).then(
      async r => {
        // eslint-disable-next-line no-console
        console.log(r);
        set(STORAGE.JWT, r.token);
        await mutate(SWR_KEY_USER);
      },
      () => {},
    );
  };

  return (
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
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                  isLoading={isSubmitting}
                  style={{ color: '#fff' }}
                >
                  <FormattedMessage {...messages.loginButton} />
                </SubmitButton>
                <Link
                  className="d-block text-right"
                  mt-2
                  to="forgot-password/send-mail"
                >
                  Forget Password ?
                </Link>
                <p className="widget-auth-info mt-4">
                  Don&apos;t have an account? Sign up now!
                </p>
                <Link className="d-block text-center mb-4" to="register">
                  Create an Account
                </Link>
              </div>
            </form>
          </Widget>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export default Login;
