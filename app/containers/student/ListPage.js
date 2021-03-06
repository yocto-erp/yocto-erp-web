import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import TableActionColumns from '../../components/ListWidget/TableActionColumn';
import studentApi from '../../libs/apis/student/student.api';
import {
  STUDENT_CONFIGURATION_ROOT_PATH,
  STUDENT_ROOT_PATH,
} from './constants';
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
import { formatDateOnly } from '../../libs/utils/date.util';
import ConfigureButton from '../../components/button/ConfigureButton';
import useStudentConfigure from '../../libs/hooks/useStudentConfigure';

const ROOT_PATH = STUDENT_ROOT_PATH;
const ListPage = ({ history }) => {
  const { getClassName, getBusRoute, configure } = useStudentConfigure();

  const columns = React.useMemo(
    () => [
      {
        key: 'status',
        header: 'Status',
        data: 'status',
        width: '5%',
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
            return <span className="badge badge-danger">LEAVE</span>;
          }
          return <></>;
        },
      },
      {
        header: <strong>Student</strong>,
        data: 'studentId',
        sort: {
          name: 'name',
        },
        class: 'min no-wrap',
        render: row => (
          <>
            <p className="mb-0">
              <strong>{row.studentId}</strong>
              <br />
              <strong>
                {row.child.name} ({row.alias})
              </strong>
              {row.child.birthday ? (
                <>
                  <br />
                  Birthday{' '}
                  <strong>
                    {formatDateOnly(new Date(row.child.birthday))}
                  </strong>
                </>
              ) : null}
              <br />
              {getClassName(row.class)}
            </p>
          </>
        ),
      },
      {
        header: 'parent',
        data: 'father',
        width: '15%',
        render: row => (
          <>
            <p className="m-0">
              {row.father ? (
                <>
                  <span>
                    Father: <strong>{row.father.name}</strong>
                  </span>
                  <br />
                </>
              ) : (
                ''
              )}
              {row.mother ? (
                <>
                  <span>
                    Mother: <strong>{row.mother.name}</strong>
                  </span>
                  <br />
                </>
              ) : (
                ''
              )}
            </p>
          </>
        ),
      },
      {
        header: 'Fee information',
        data: 'feePackage',
        width: '5%',
        render: row => {
          if (row.feePackage === 0) {
            return <span className="badge badge-success">Monthly</span>;
          }
          if (row.feePackage === 1) {
            return <span className="badge badge-success">Quarterly</span>;
          }
          if (row.feePackage === 2) {
            return <span className="badge badge-success">Yearly</span>;
          }
          return <></>;
        },
      },
      {
        header: 'Meal',
        data: 'enableMeal',
        width: '5%',
        render: row =>
          row.enableMeal ? (
            <span className="badge badge-success">YES</span>
          ) : (
            <span className="badge badge-danger">NO</span>
          ),
      },
      {
        header: 'Bus',
        data: 'bus',
        class: 'min no-wrap',
        render: row => {
          const toSchoolBus = getBusRoute(row.toSchoolBusRoute);
          const toHomeBus = getBusRoute(row.toHomeBusRoute);
          return (
            <>
              {toSchoolBus ? (
                <p className="m-0">
                  To School From: <strong>{toSchoolBus}</strong>
                </p>
              ) : null}
              {toHomeBus ? (
                <p>
                  From School To: <strong>{toHomeBus}</strong>
                </p>
              ) : null}
            </>
          );
        },
      },
      {
        header: 'Start Date',
        data: 'joinDate',
        class: 'min',
        render: row => formatDateOnly(new Date(row.joinDate)),
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
    [configure],
  );

  const search = { search: '' };

  const actions = (
    <>
      <CreateButton
        className="mr-2 btn-raised"
        onClick={() => {
          history.push(newPage(ROOT_PATH));
        }}
      />
      <ConfigureButton
        className="shadow btn-raised"
        onClick={() => {
          history.push(STUDENT_CONFIGURATION_ROOT_PATH);
        }}
      />
    </>
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
    <ListWidget
      pageHeader={<PageTitle title="Student" actions={actions} />}
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={studentApi.search}
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
