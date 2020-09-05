import React, { useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import Alert from 'reactstrap/es/Alert';
import messages from './messages';
import Widget from '../../../components/Widget/Widget';
import Footer from '../../Layout/Footer';
import SubmitButton from '../../../components/button/SubmitButton';
import { forgotPasswordSendMail } from '../../../libs/apis/auth.api';

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
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const [isCheck, check] = useState(false);
  const onSubmit = formData => {
    forgotPasswordSendMail(formData).then(
      async r => {
        console.log(r);
        check(true);
        console.log('send mail success');
      },
      () => {},
    );
  };

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
            <p className="widget-auth-info">Nhập email bạn đã đăng kí!</p>
            <div>
              {isCheck ? <Alert color="success">Please check mail!</Alert> : ''}
            </div>
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
                    {errors.email && errors.email.message}
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
                  <FormattedMessage {...messages.forgotPasswordButton} />
                </SubmitButton>
              </div>
            </form>
          </Widget>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
