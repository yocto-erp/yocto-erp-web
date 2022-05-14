import React, { useState } from "react";
import { Form } from "reactstrap";
import PageTitle from "../Layout/PageTitle";
import PermissionListForm from "./components/PermissionListForm";
import MultipleEmailInput from "../../components/Form/MultipleEmailInput";
import SubmitButton from "../../components/button/SubmitButton";
import BackButton from "../../components/button/BackButton";
import { useApi } from "../../libs/hooks/useApi";
import userApi from "../../libs/apis/user.api";
import FormError from "../../components/Form/FormError";

const InvitePage = () => {
  const [permissions, setPermissions] = useState({});
  const [emails, setEmails] = useState([]);

  const {
    exec,
    state: { isLoading, resp, errors },
  } = useApi(() => userApi.create({ permissions, emails }));

  return (
    <>
      <PageTitle title="Invite User" />
      <FormError errors={errors} />
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          {resp == null ? (
            <Form>
              <div className="form-group">
                <label htmlFor="emailTemplate" className="">
                  Emails
                </label>
                <MultipleEmailInput value={emails} onChange={setEmails} />
              </div>
              <div className="form-group">
                <label className="" htmlFor="permission">
                  Permission
                </label>
                <PermissionListForm
                  value={permissions}
                  onChange={setPermissions}
                  id="permission"
                />
              </div>
              <BackButton />
              &nbsp;
              <SubmitButton
                disabled={
                  !(emails.length > 0 && Object.keys(permissions).length > 0)
                }
                isLoading={isLoading}
                type="button"
                onClick={exec}
              />
            </Form>
          ) : (
            <div className="alert alert-primary" role="alert">
              <h4 className="alert-heading">Success !</h4>
              <p style={{ fontSize: "14px" }}>Sent invitation to these email</p>
              <ul className="">
                {resp.map((t, i) => (
                  <li key={t}>
                    {i} - {t}
                  </li>
                ))}
              </ul>
              <hr />
              <BackButton /> &nbsp;
              <button type="button" className="btn btn-primary">
                Invite New
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

InvitePage.propTypes = {};

export default InvitePage;
