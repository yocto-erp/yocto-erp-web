import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import PermissionListForm from "./PermissionListForm";
import userApi from "../../../libs/apis/user.api";
import { API_STATE, useApi } from "../../../libs/hooks/useApi";
import SubmitButton from "../../../components/button/SubmitButton";
import BackButton from "../../../components/button/BackButton";

function MyForm({ id }) {
  const {
    state: { resp },
    exec,
  } = useApi(userApi.read);

  const { state, exec: exec2 } = useApi(userApi.updateUser);

  const [permissions, setPermissions] = useState({});

  React.useEffect(() => {
    if (id) {
      exec(id);
    }
  }, [id]);

  React.useEffect(() => {
    console.log(resp);
    if (resp) {
      const permissionData = {};
      resp.permissions.forEach(t => {
        permissionData[`action${t.actionId}`] = {
          type: t.type,
          actionId: t.actionId,
        };
      });
      setPermissions(permissionData);
    }
  }, [resp]);

  useEffect(() => {
    if (state.status === API_STATE.SUCCESS) {
      toast.success("Update user permission success");
    } else if (state.status === API_STATE.FAIL) {
      toast.error(state.errors.map(t => t.message || t.code).join("\n"));
    }
  }, [state]);

  return (
    <>
      <PermissionListForm value={permissions} onChange={setPermissions} />
      <BackButton className="mr-2" />
      <SubmitButton
        onClick={() => exec2(id, Object.values(permissions))}
        isLoading={state.status === API_STATE.LOADING}
      />
    </>
  );
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
