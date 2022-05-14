import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl";
import * as yup from "yup";

import {
  Container,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from "reactstrap";

import { Link } from "react-router-dom";
import Alert from "reactstrap/es/Alert";
import messages from "./messages";
import Widget from "../../../components/Widget/Widget";
import Footer from "../../Layout/Footer";
import SubmitButton from "../../../components/button/SubmitButton";
import { registerUser } from "../../../libs/apis/auth.api";
import useMyForm from "../../../libs/hooks/useMyForm";
import FormError from "../../../components/Form/FormError";
import FormHookErrorMessage from "../../../components/Form/FormHookErrorMessage";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid Email")
    .required("Email is required."),
  password: yup.string().required("Password is required."),
  firstName: yup.string().required("First Name is required."),
  lastName: yup.string().required("Last Name is required."),
});

export function RegisterPage() {
  const {
    register,
    errors,
    onSubmit,
    formState,
    state: { isLoading, errors: serverErrors, resp },
  } = useMyForm({
    validationSchema: schema,
    api: registerUser,
  });

  const formEls = useMemo(
    () => (
      <>
        <form onSubmit={onSubmit} noValidate>
          <FormGroup className="mt">
            <Label for="displayName">
              <FormattedMessage {...messages.formFullName} />
              &nbsp;<span className="text-danger">*</span>
            </Label>
            <InputGroup className="input-group-no-border">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="la la-user text-white" />
                </InputGroupText>
              </InputGroupAddon>
              <FormattedMessage {...messages.formFirstName}>
                {msg => (
                  <Input
                    invalid={!!errors.firstName}
                    id="firstName"
                    className="input-transparent pl-3"
                    type="text"
                    innerRef={register}
                    name="firstName"
                    placeholder={msg}
                  />
                )}
              </FormattedMessage>
              <FormattedMessage {...messages.formLastName}>
                {msg => (
                  <Input
                    invalid={!!errors.lastName}
                    id="lastName"
                    className="input-transparent pl-3"
                    type="text"
                    innerRef={register}
                    name="lastName"
                    placeholder={msg}
                  />
                )}
              </FormattedMessage>

              <FormHookErrorMessage error={errors.lastName} />
              <FormHookErrorMessage error={errors.firstName} />
            </InputGroup>
          </FormGroup>
          <FormGroup className="mt">
            <Label for="email">
              <FormattedMessage {...messages.formEmail} />{" "}
              <span className="text-danger">*</span>
            </Label>
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
          <FormGroup>
            <FormattedMessage {...messages.formPassword}>
              {msg => (
                <>
                  <Label for="password">
                    {msg}&nbsp;<span className="text-danger">*</span>
                  </Label>
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
                      placeholder={msg}
                    />
                    <FormFeedback>
                      {errors.password && errors.password.message}
                    </FormFeedback>
                  </InputGroup>
                </>
              )}
            </FormattedMessage>
          </FormGroup>
          <div className="bg-widget auth-widget-footer">
            <SubmitButton
              type="submit"
              color="danger"
              className="auth-btn text-white"
              size="sm"
              disabled={!(formState.isValid && formState.isDirty)}
              isLoading={isLoading}
              style={{ color: "#fff" }}
            >
              <FormattedMessage {...messages.registerButton} />
            </SubmitButton>
            <p className="widget-auth-info m-4">
              <FormattedMessage {...messages.alreadyHaveAccount} />
              &nbsp;
              <Link to="/login">
                <FormattedMessage {...messages.loginHere} />
              </Link>
            </p>
          </div>
        </form>
      </>
    ),
    [onSubmit, errors, register, formState, isLoading],
  );

  return (
    <div>
      <Helmet>
        <FormattedMessage {...messages.header}>
          {msg => <title>{msg}</title>}
        </FormattedMessage>

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
            {resp ? (
              <Alert
                color="primary"
                className="mt-2"
                style={{ fontSize: "1.1rem" }}
              >
                <FormattedHTMLMessage
                  {...messages.registerSuccess}
                  values={{ email: resp.email }}
                />
              </Alert>
            ) : (
              <>
                <p className="widget-auth-info">Use your email to register.</p>
                <FormError
                  className="mt-3"
                  errors={serverErrors}
                  item={item => [item]}
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

export default RegisterPage;
