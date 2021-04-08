import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import CreatedBy from '../../components/ListWidget/CreatedBy';
import TableActionColumns from '../../components/ListWidget/TableActionColumn';
import employeeApi from '../../libs/apis/employee.api';
import { EMPLOYEE_ROOT_PATH } from './constants';
import PageTitle from '../Layout/PageTitle';
import Filter from './components/Filter';

import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
} from '../../libs/utils/crud.util';
import CreateButton from '../../components/button/CreateButton';
import DeleteConfirmModal from '../../components/modal/DeleteConfirmModal';
import ListWidget from '../../components/ListWidget';
import { formatDateOnly } from '../../libs/utils/date.util';
import Price from '../../components/common/Price';

const ROOT_PATH = EMPLOYEE_ROOT_PATH;

const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: <strong>Employee</strong>,
        data: 'personId',
        width: '30%',
        sort: {
          name: 'personId',
        },
        render: row => {
          const { person } = row;
          return person?.name;
        },
      },
      {
        header: 'Salary Per Month',
        data: 'salary',
        render: row => <Price amount={row.salary} />,
        width: '20%',
      },
      {
        header: 'bio',
        data: 'bio',
        width: '20%',
      },
      {
        header: 'Status',
        data: 'status',
        width: '10%',
        sort: {
          name: 'status',
        },
        render: row => {
          if (row.status === 1) {
            return <span className="badge badge-warning">PENDING</span>;
          }
          if (row.status === 2) {
            return <span className="badge badge-success">ACTIVE</span>;
          }
          if (row.status === 3) {
            return <span className="badge badge-danger">RESIGNED</span>;
          }
          return <></>;
        },
      },
      {
        header: 'Start Date',
        data: 'startedDate',
        class: 'min',
        render: row => formatDateOnly(new Date(row.startedDate)),
        // render: row => {
        //   // eslint-disable-next-line no-unused-vars
        //   const { startedDate } = row;
        //   return formatDateOnly(new Date(row.startedDate))
        // },
      },
      {
        header: 'Created By',
        data: 'createdBy',
        class: 'min-width',
        render: row => {
          const { createdDate, createdBy } = row;
          return <CreatedBy user={createdBy} date={createdDate} />;
        },
      },
      {
        header: 'Action',
        data: 'action',
        class: 'action',
        render: row => (
          <TableActionColumns
            onEdit={() => {
              history.push(editPage(ROOT_PATH, row.id));
            }}
            onDelete={() => {
              history.push(deletePage(ROOT_PATH, row.id));
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
        className="box"
        onClick={() => {
          history.push(newPage(ROOT_PATH));
        }}
      />
    </div>
  );

  const deleteConfirmDialog = React.useMemo(
    () => (
      <Route
        path={deletePagePattern(ROOT_PATH)}
        render={({
          match: {
            params: { id },
          },
        }) => (
          // match === null
          <DeleteConfirmModal
            id={id}
            deleteApi={employeeApi.remove}
            readApi={employeeApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Employee ${item.person.name} Success`);
              }
            }}
            title="Delete Employee?"
            message={row => {
              if (!row) return '';
              return `Are you sure to delete ${row.person.name} ?`;
            }}
          />
        )}
      />
    ),
    [],
  );
  return (
    <ListWidget
      pageHeader={<PageTitle title="Employee" actions={action} />}
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={employeeApi.search}
      initialSize={10}
      initialPage={1}
      initialFilter={search}
    >
      <Filter />
    </ListWidget>
  );
};

ListPage.propTypes = {
  history: PropTypes.any,
};

export default ListPage;
