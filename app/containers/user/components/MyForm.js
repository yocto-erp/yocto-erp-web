import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import PermissionListForm from './PermissionListForm';
import userApi from '../../../libs/apis/user.api';
import { useApi } from '../../../libs/hooks/useApi';
import SubmitButton from '../../../components/button/SubmitButton';

function MyForm({ id }) {
  const {
    state: { resp, errors, isLoading },
    exec,
  } = useApi(userApi.read);

  const {
    state: {
      resp: respUpdate,
      errors: errorsUpdate,
      isLoading: isLoadingUpdate,
    },
    exec: exec2,
  } = useApi(userApi.updateUser);

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

  if (respUpdate) {
    toast.success('Update permission Success!');
  }

  return (
    <>
      <PermissionListForm value={permissions} onChange={setPermissions} />
      <SubmitButton
        onClick={() => exec2(id, Object.values(permissions))}
        isLoading={isLoadingUpdate}
      />
    </>
  );
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
