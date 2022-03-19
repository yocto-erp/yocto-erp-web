import React from "react";
import PropTypes from "prop-types";
import { PERMISSION_MODULE } from "../../../constants";
import PermissionForm from "./PermissionForm";

const PermissionListForm = ({ value, onChange }) => {
  const onInputChange = React.useCallback(
    (listId, isEnable) => {
      const newPermission = { ...value };
      listId.forEach(t => {
        const { id: actionId, type } = t;
        if (isEnable) {
          if (!newPermission[`action${actionId}`]) {
            newPermission[`action${actionId}`] = { id: actionId };
          }
          newPermission[`action${actionId}`].type = type;
        } else if (!isEnable && newPermission[`action${actionId}`]) {
          delete newPermission[`action${actionId}`];
        }
      });
      onChange(newPermission);
    },
    [value],
  );

  return (
    <div className="row">
      {PERMISSION_MODULE.map(t => (
        <div className="col-md-4" key={t.id}>
          <PermissionForm module={t} value={value} onChange={onInputChange} />
        </div>
      ))}
    </div>
  );
};

PermissionListForm.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default PermissionListForm;
