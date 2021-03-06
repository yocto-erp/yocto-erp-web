import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import PageTitle from '../Layout/PageTitle';
import ListWidget from '../../components/ListWidget';
import { formatDate } from '../../libs/utils/date.util';
import { USER_ROOT_PATH } from './constants';
import userApi, { USER_INVITE_STATUS } from '../../libs/apis/user.api';
import TableActionColumns from '../../components/ListWidget/TableActionColumn';
import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
  viewPage,
} from '../../libs/utils/crud.util';
import DeleteConfirmModal from '../../components/modal/DeleteConfirmModal';
import CreateButton from '../../components/button/CreateButton';
import FilterUser from './components/FilterUser';
import { SORT_DIR } from '../../components/ListWidget/constants';

const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: 'User',
        data: 'user',
        render: row => (
          <>
            <div>Email: {row.user.email}</div>
            {row.user.displayName && row.user.displayName.length ? (
              <div>Display Name: {row.user.displayName}</div>
            ) : (
              ''
            )}
          </>
        ),
      },
      {
        header: 'Permission',
        data: 'from',
        class: 'min',
        render: row => row.group.totalPermission,
      },
      {
        header: 'Invitation',
        data: 'inviteStatus',
        class: 'min',
        render: row => {
          let rs = '';
          switch (row.inviteStatus) {
            case USER_INVITE_STATUS.INVITED:
              rs = (
                <span className="badge badge-danger" id={`status${row.id}`}>
                  SENT
                </span>
              );
              break;
            case USER_INVITE_STATUS.CONFIRMED:
              rs = (
                <span className="badge badge-success" id={`status${row.id}`}>
                  CONFIRMED
                </span>
              );
              break;
            default:
              break;
          }
          return rs;
        },
      },
      {
        header: 'Sent Date',
        data: 'invitedDate',
        class: 'min',
        render: row =>
          row.invitedDate ? formatDate(new Date(row.invitedDate)) : '',
      },
      {
        header: 'Action',
        data: '',
        class: 'action',
        render: row => (
          <TableActionColumns
            onView={() => {
              history.push(viewPage(USER_ROOT_PATH, row.user.id));
            }}
            onEdit={() => {
              history.push(editPage(USER_ROOT_PATH, row.user.id));
            }}
            onDelete={() => {
              history.push(deletePage(USER_ROOT_PATH, row.user.id));
            }}
          />
        ),
      },
    ],
    [],
  );

  const search = { search: '' };
  const action = (
    <div>
      <CreateButton
        onClick={() => {
          history.push(newPage(USER_ROOT_PATH));
        }}
      >
        Invite User
      </CreateButton>
    </div>
  );

  const deleteConfirmDialog = React.useMemo(
    () => (
      <Route
        path={deletePagePattern(USER_ROOT_PATH)}
        render={({
          match: {
            params: { id },
          },
        }) => (
          <DeleteConfirmModal
            id={id}
            deleteApi={userApi.remove}
            readApi={userApi.read}
            routePattern={USER_ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete ${item.user.email} Success`);
              }
            }}
            title="Delete User?"
            message={row => {
              if (!row) return '';
              return `Are you sure to delete ${row.user.email} ?`;
            }}
          />
        )}
      />
    ),
    [],
  );

  return (
    <ListWidget
      pageHeader={<PageTitle title="User" actions={action} />}
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={userApi.search}
      initFilter={search}
      initPage={1}
      initSize={10}
      initSorts={{ createdDate: SORT_DIR.DESC }}
    >
      <FilterUser />
    </ListWidget>
  );
};

ListPage.propTypes = {
  history: PropTypes.any,
};
export default ListPage;
