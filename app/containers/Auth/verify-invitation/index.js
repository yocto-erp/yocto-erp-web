import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from "reactstrap";
import * as yup from "yup";
import classNames from "classnames";
import { Link } from "react-router-dom";
import messages from "./messages";
import Widget from "../../../components/Widget/Widget";
import Footer from "../../Layout/Footer";
import userApi from "../../../libs/apis/user.api";
import { useApi } from "../../../libs/hooks/useApi";
import useMyForm from "../../../libs/hooks/useMyForm";
import SubmitButton from "../../../components/button/SubmitButton";
import FormError from "../../../components/Form/FormError";
import FormHookErrorMessage from "../../../components/Form/FormHookErrorMessage";

export function VerifyInvitationPage() {
  const [isShowPassword, setShowPassword] = useState(false);
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const email = params.get("email");
  const token = params.get("token");
  const companyId = params.get("companyId");

  const {
    exec,
    state: { errors: invitationErrors, resp: invitationResp },
  } = useApi(userApi.verifyInvitation);

  const schema = React.useMemo(() => {
    if (
      invitationResp &&
      invitationResp.userActive.user &&
      invitationResp.userActive.user.personId !== null
    ) {
      return yup.object().shape({
        firstName: yup.string(),
        lastName: yup.string(),
        password: yup.string(),
      });
    }
    return yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      password: yup.string().required(),
    });
  }, [invitationResp]);

  const {
    register,
    errors,
    onSubmit,
    formState,
    state: { isLoading, errors: serverErrors, resp },
  } = useMyForm({
    validationSchema: schema,
    api: formData => {
      console.log(formData);
      return userApi.confirmInvitation({
        ...formData,
        email,
        token,
        companyId,
      });
    },
  });

  const form = React.useMemo(() => {
    if (!invitationResp) return "";
    const {
      userActive: { user },
      invitation: { company },
    } = invitationResp;
    return (
      <>
        <p>
          Company <strong>{company.name}</strong> invited you to become as a
          member.
        </p>
        <FormError errors={serverErrors} />
        <Form onSubmit={onSubmit} noValidate>
          {user.personId === null ? (
            <>
              <FormGroup className="mt">
                <Label for="displayName">
                  Your name<span className="text-danger">*</span>
                </Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-user text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    invalid={!!errors.firstName}
                    id="firstName"
                    className="input-transparent pl-3"
                    type="text"
                    innerRef={register}
                    name="firstName"
                    placeholder="First Name"
                  />
                  <Input
                    invalid={!!errors.lastName}
                    id="lastName"
                    className="input-transparent pl-3"
                    type="text"
                    innerRef={register}
                    name="lastName"
                    placeholder="Last Name"
                  />
                  <FormHookErrorMessage error={errors.lastName} />
                  <FormHookErrorMessage error={errors.firstName} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for="password">
                  Password<span className="text-danger">*</span>
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
                    type={isShowPassword ? "text" : "password"}
                    innerRef={register}
                    required
                    name="password"
                    placeholder="Password"
                    hidden={false}
                  />
                  <FormHookErrorMessage error={errors.password} />
                  <InputGroupAddon addonType="append">
                    <Button
                      type="button"
                      color="primary"
                      onClick={() => setShowPassword(!isShowPassword)}
                    >
                      <i
                        className={classNames("la", {
                          "la-eye-slash": !isShowPassword,
                          "la-eye": isShowPassword,
                        })}
                      />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </>
          ) : (
            ""
          )}

          <div className="bg-widget auth-widget-footer">
            <SubmitButton
              type="submit"
              color="danger"
              className="auth-btn text-white mb-3"
              size="sm"
              disabled={!formState.isValid}
              isLoading={isLoading}
              style={{ color: "#fff" }}
            >
              <FormattedMessage
                {...(user.personId === null
                  ? messages.createConfirmButton
                  : messages.confirmButton)}
              />
            </SubmitButton>
          </div>
        </Form>
      </>
    );
  }, [
    isShowPassword,
    formState,
    isLoading,
    errors,
    serverErrors,
    invitationResp,
  ]);

  const ui = React.useMemo(() => {
    if (invitationErrors && invitationErrors.length) {
      return (
        <>
          <FormError errors={invitationErrors} />
          <Link className="btn btn-primary font-weight-bolder" to="/">
            Login
          </Link>
        </>
      );
    }
    if (!invitationResp) {
      return "";
    }
    console.log(invitationResp);
    if (resp) {
      return (
        <div>
          <p>Approve invitation success.</p>
          <hr />
          <Link className="btn btn-primary font-weight-bolder" to="/">
            Login
          </Link>
        </div>
      );
    }
    return form;
  }, [invitationErrors, invitationResp, resp, form]);

  useEffect(() => {
    exec(email, token, companyId);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Confirm Invitation</title>
        <meta name="description" content="Confirm invitation from Company" />
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
            {ui}
          </Widget>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export default VerifyInvitationPage;
