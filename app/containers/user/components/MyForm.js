import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PermissionListForm from './PermissionListForm';
import userApi from '../../../libs/apis/user.api';
import { useApi } from '../../../libs/hooks/useApi';

function MyForm({ id }) {
  const {
    state: { resp, errors, isLoading },
    exec,
  } = useApi(userApi.read);

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
        permissionData[`action${t.actionId}`] = { type: t.type };
      });
      setPermissions(permissionData);
    }
  }, [resp]);

  return <PermissionListForm value={permissions} onChange={setPermissions} />;
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
