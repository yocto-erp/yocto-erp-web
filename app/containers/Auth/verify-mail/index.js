import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { Alert, Container } from "reactstrap";
import { Link } from "react-router-dom";
import messages from "./messages";
import Widget from "../../../components/Widget/Widget";
import Footer from "../../Layout/Footer";
import { verifyEmail } from "../../../libs/apis/auth.api";

export function VerifyMailPage() {
  const [isCheck, check] = useState(false);
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const email = params.get("email");
  const token = params.get("token");
  useEffect(() => {
    verifyEmail({ email, token }).then(() => {
      check(true);
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
                <>
                  <h4>Email has been activated successful!.</h4>
                  <br />
                  <Link
                    className="text-center mb-4 font-weight-bolder"
                    to="/admin"
                  >
                    <h4>Login</h4>
                  </Link>
                </>
              ) : (
                <Alert color="danger">
                  <h4>Invalid email or activate token!</h4>
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

export default VerifyMailPage;
