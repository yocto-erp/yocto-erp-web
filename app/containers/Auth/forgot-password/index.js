import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
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
import Alert from 'reactstrap/es/Alert';
import messages from './messages';
import Widget from '../../../components/Widget/Widget';
import Footer from '../../Layout/Footer';
import SubmitButton from '../../../components/button/SubmitButton';
import { forgotPasswordSendMail } from '../../../libs/apis/auth.api';
import FormError from '../../../components/Form/FormError';
import useMyForm from '../../../libs/hooks/useMyForm';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid Email')
    .required('This field is required.'),
});

export function ForgotPasswordPage() {
  const {
    register,
    errors,
    onSubmit,
    formState,
    state: { isLoading, errors: serverErrors, resp },
  } = useMyForm({
    api: forgotPasswordSendMail,
    validationSchema: schema,
  });

  const formEls = useMemo(
    () => (
      <>
        <form onSubmit={onSubmit} noValidate>
          <FormGroup className="mt">
            <Label for="email">Email</Label>
            <InputGroup className="input-group-no-border">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="la la-envelope text-white" />
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
                {errors.email && errors.email.message}
              </FormFeedback>
            </InputGroup>
          </FormGroup>
          <div className="bg-widget auth-widget-footer">
            <SubmitButton
              type="submit"
              color="danger"
              className="auth-btn text-white mb-3"
              size="sm"
              disabled={!(formState.isValid && formState.isDirty)}
              isLoading={isLoading}
            >
              <FormattedMessage {...messages.forgotPasswordButton} />
            </SubmitButton>
          </div>
        </form>
      </>
    ),
    [onSubmit, errors, register, formState, isLoading],
  );

  return (
    <div>
      <Helmet>
        <title>Forgot your password?</title>
        <meta name="description" content="Description of forgot password" />
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
            {resp ? (
              <Alert color="info" className="mt-2">
                Reset password link has been send to your email. Please check
                your mailbox.
              </Alert>
            ) : (
              <>
                <p className="widget-auth-info">Nhập email bạn đã đăng kí!</p>
                <FormError
                  className="mt-3"
                  errors={serverErrors}
                  item={item => 'Email not existed !'}
                />
                {formEls}
              </>
            )}
          </Widget>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
