import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { PERMISSION_TYPE } from '../../../constants';
import Widget from '../../../components/Widget/Widget';

const PermissionForm = ({ onChange, value, module }) => {
  const { permissions } = module;

  const onInputChange = React.useCallback(
    (e, id) => {
      const isChecked = e.currentTarget.checked;
      onChange([{ id, type: PERMISSION_TYPE.FULL }], isChecked);
    },
    [onChange],
  );

  const onSelectTypeChange = React.useCallback(
    (e, id) => {
      const val = e.currentTarget.value;
      onChange([{ id, type: Number(val) }], true);
    },
    [onChange],
  );

  const onInputAllChange = React.useCallback(
    isChecked => {
      onChange(
        permissions.map(t => ({ id: t.id, type: PERMISSION_TYPE.FULL })),
        isChecked,
      );
    },
    [onChange],
  );

  return (
    <Widget title={<span>{module.name}</span>}>
      <table className="table table-sm">
        <thead>
          <tr>
            <th className="min">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => onInputAllChange(true)}
              >
                All
              </button>
              &nbsp;|&nbsp;
              <button
                type="button"
                className="btn btn-link"
                onClick={() => onInputAllChange(false)}
              >
                None
              </button>
            </th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map(t => (
            <tr key={`${t.id}-${t.type}`}>
              <td className="min align-middle">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={!!value[`action${t.id}`]}
                    value={1}
                    id={`action${t.id}`}
                    onChange={e => onInputChange(e, t.id)}
                  />{' '}
                  <label className="form-check-label" htmlFor={`action${t.id}`}>
                    {t.name}
                  </label>
                </div>
              </td>
              <td>
                {t.enableType ? (
                  <Input
                    type="select"
                    disabled={!value[`action${t.id}`]}
                    onChange={e => onSelectTypeChange(e, t.id)}
                    value={
                      value[`action${t.id}`]
                        ? value[`action${t.id}`].type
                        : PERMISSION_TYPE.FULL
                    }
                  >
                    <option value={PERMISSION_TYPE.FULL}>FULL</option>
                    <option value={PERMISSION_TYPE.PARTIAL}>PARTIAL</option>
                    <option value={PERMISSION_TYPE.OWNER}>OWNER</option>
                  </Input>
                ) : (
                  ''
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Widget>
  );
};

PermissionForm.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  module: PropTypes.object,
};

export default PermissionForm;
