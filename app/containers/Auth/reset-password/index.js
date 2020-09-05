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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import messages from './messages';
import Widget from '../../../components/Widget/Widget';
import Footer from '../../Layout/Footer';
import { resetPassword, verifyToken } from '../../../libs/apis/auth.api';
import SubmitButton from '../../../components/button/SubmitButton';

const schema = yup.object().shape({
  password: yup.string().required('This field is required.'),
  rePassword: yup.string().required('This field is required.'),
});
export function RestPasswordPage() {
  const [isCheck, check] = useState(false);
  const [isResetStatus, resetStatus] = useState(false);
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const token = params.get('token');
  useEffect(() => {
    verifyToken({ token }).then(t => {
      check(true);
      console.log(t);
    });
  }, []);

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
    const { password, rePassword } = formData;
    resetPassword({ token, password, rePassword }).then(r => {
      console.log(r);
      resetStatus(true);
    });
  };
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
            {/* <p className="widget-auth-info">Rest your passoword</p> */}
            <>
              {isResetStatus ? (
                <Alert color="success">
                  Reset Password successful!.
                  <Link className="d-block text-center mb-4" to="/">
                    Login
                  </Link>
                </Alert>
              ) : (
                ''
              )}
            </>
            <>
              {isCheck ? (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    <Label for="rePassword">rePassword</Label>
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
                        placeholder="rePassword"
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
                      className="auth-btn"
                      size="sm"
                      isLoading={isSubmitting}
                      style={{ color: '#fff' }}
                    >
                      <FormattedMessage {...messages.resetPasswordButton} />
                    </SubmitButton>
                  </div>
                </form>
              ) : (
                <Alert color="danger">
                  Invalid token!
                  <Link to="/">Back Login</Link>
                </Alert>
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
