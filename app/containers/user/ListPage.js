import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import PageTitle from '../Layout/PageTitle';
import ListWidget from '../../components/ListWidget';
import { formatDate } from '../../libs/utils/date.util';
import { USER_ROOT_PATH, USER_STATUS } from './constants';
import userApi from '../../libs/apis/user.api';
import TableActionColumns from '../../components/ListWidget/TableActionColumn';
import {
  deletePage,
  deletePagePattern,
  editPage,
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
            <div>Email: {row.email}</div>
            <div>Display Name: {row.displayName}</div>
          </>
        ),
      },
      {
        header: 'Permission',
        data: 'from',
        class: 'min',
        render: row => row.email,
      },
      {
        header: 'Status',
        data: 'status',
        class: 'min',
        render: row => {
          let rs = '';
          switch (row.status) {
            case USER_STATUS.BLOCKED:
              rs = (
                <span className="badge badge-danger" id={`status${row.id}`}>
                  BLOCKED
                </span>
              );
              break;
            case USER_STATUS.ACTIVE:
              rs = (
                <span className="badge badge-success" id={`status${row.id}`}>
                  ACTIVE
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
        header: 'Email Confirm',
        data: 'email_active',
        class: 'min text-center',
        render: row => (row.email_active ? 'true' : 'false'),
      },
      {
        header: 'Created Date',
        data: 'createdDate',
        class: 'min',
        render: row =>
          row.createdDate ? formatDate(new Date(row.createdDate)) : '',
      },
      {
        header: 'Action',
        data: '',
        class: 'action',
        render: row => (
          <TableActionColumns
            onView={() => {
              history.push(viewPage(USER_ROOT_PATH, row.id));
            }}
            onEdit={() => {
              history.push(editPage(USER_ROOT_PATH, row.id));
            }}
            onDelete={() => {
              history.push(deletePage(USER_ROOT_PATH, row.id));
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
          console.log('invite user');
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
                toast.success(`Delete ${item.email} Success`);
              }
            }}
            title="Delete User?"
            message={row => {
              if (!row) return '';
              return `Are you sure to delete ${row.email} ?`;
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
