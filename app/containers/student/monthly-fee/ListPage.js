import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import TableActionColumns from '../../../components/ListWidget/TableActionColumn';
import studentMonthlyFeeApi from '../../../libs/apis/student/student-monthly-fee.api';
import { STUDENT_MONTHLY_ROOT_PATH } from './constants';
import Filter from './components/Filter';
import { deletePage, deletePagePattern } from '../../../libs/utils/crud.util';
import DeleteConfirmModal from '../../../components/modal/DeleteConfirmModal';
import ListWidget from '../../../components/ListWidget';
import { SORT_DIR } from '../../../components/ListWidget/constants';
import Header from './components/Header';

const ROOT_PATH = STUDENT_MONTHLY_ROOT_PATH;
const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: 'Month',
        data: 'month',
      },
      {
        header: 'Tuition Fee',
        data: 'tuitionFee',
      },
      {
        header: 'Scholar Ship',
        data: 'scholarShip',
      },
      {
        header: 'Absent Date',
        data: 'absentDate',
      },
      {
        header: 'Trial Date',
        data: 'trialDate',
      },
      {
        header: 'Bus Fee',
        data: 'busFee',
      },
      {
        header: 'Meal Fee',
        data: 'mealFee',
      },
      {
        header: 'Other Extra Fee',
        data: 'otherExtraFee',
      },
      {
        header: 'Orther Deduct Fee',
        data: 'artherDeductFee',
      },
      {
        header: 'Remark',
        data: 'remark',
      },
      {
        header: 'Total',
        data: 'total',
      },
      {
        header: 'Paid',
        data: 'paid',
      },

      {
        header: 'Action',
        data: '',
        class: 'action',
        render: row => (
          <TableActionColumns
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
            deleteApi={studentMonthlyFeeApi.remove}
            readApi={studentMonthlyFeeApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Warehouse ${item.name} Success`);
              }
            }}
            title="Delete Warehouse?"
            message={row => {
              if (!row) return '';
              return `Are you sure to delete ${row.name} ?`;
            }}
          />
        )}
      />
    ),
    [],
  );
  return (
    <ListWidget
      pageHeader={<Header history={history} />}
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={studentMonthlyFeeApi.search}
      initFilter={search}
      initPage={1}
      initSize={10}
      initSorts={{ id: SORT_DIR.DESC }}
      enableSelectColumn
    >
      <Filter data={search} />
    </ListWidget>
  );
};
ListPage.propTypes = {
  history: PropTypes.any,
};

export default ListPage;
