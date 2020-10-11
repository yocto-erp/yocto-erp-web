import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Widget from '../../components/Widget/Widget';
import TableActionColumns from '../../components/ListWidget/TableActionColumn';
import studentApi from '../../libs/apis/student.api';
import { STUDENT_ROOT_PATH } from './constants';
import PageTitle from '../Layout/PageTitle';
import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
} from '../../libs/utils/crud.util';
import CreateButton from '../../components/button/CreateButton';
import DeleteConfirmModal from '../../components/modal/DeleteConfirmModal';
import ListWidget from '../../components/ListWidget';
import Filter from './components/Filter';

const ROOT_PATH = STUDENT_ROOT_PATH;
const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: <strong>Student ID</strong>,
        data: 'studentId',
        sort: {
          name: 'name',
        },
        width: '12%',
      },
      {
        header: 'Name (Alias)',
        data: 'alias',
        width: '16%',
        render: row => {
          const { alias } = row;
          return `${row.child.name} (${alias})`;
        },
      },
      {
        header: 'parent',
        data: 'father',
        width: '20%',
        render: row => (
          <>
            <p>
              Father: {row.father.name} <br />
              Mother: {row.mother.name}
            </p>
          </>
        ),
      },
      {
        header: 'Free information',
        data: 'freePackage',
      },
      {
        header: 'Meal',
        data: 'enableMeal',
        width: '10%',
        render: row =>
          row.enableMeal === 1 ? (
            <span className="badge badge-success">TRUE</span>
          ) : (
            <span className="badge badge-danger">FALSE</span>
          ),
      },
      {
        header: 'Bus',
        data: 'bus',
        width: '20%',
        render: row => (
          <>
            <p>
              Father: {row.father.firstName} {row.father.lastName} <br />
              Mother: {row.mother.firstName} {row.mother.lastName}
            </p>
          </>
        ),
      },
      {
        header: 'Start Date',
        data: 'joinDate',
      },
      {
        header: 'Action',
        data: '',
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
            deleteApi={studentApi.remove}
            readApi={studentApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Student ${item.child.name} Success`);
              }
            }}
            title="Delete Student?"
            message={row => {
              if (!row) return '';
              return `Are you sure to delete ${row.child.name} ?`;
            }}
          />
        )}
      />
    ),
    [],
  );
  return (
    <>
      <PageTitle title="Student" actions={action} />
      <Widget>
        <ListWidget
          deleteDialog={deleteConfirmDialog}
          columns={columns}
          fetchData={studentApi.search}
          initialSize={10}
          initialPage={1}
          initialFilter={search}
        >
          <Filter data={search} />
        </ListWidget>
      </Widget>
    </>
  );
};
ListPage.propTypes = {
  history: PropTypes.any,
};

export default ListPage;
