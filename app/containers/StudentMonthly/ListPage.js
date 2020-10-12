import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Widget from '../../components/Widget/Widget';
import CreatedBy from '../../components/ListWidget/CreatedBy';
import TableActionColumns from '../../components/ListWidget/TableActionColumn';
import warehouseApi from '../../libs/apis/warehouse.api';
import { STUDENT_MONTHLY_ROOT_PATH } from './constants';
import Filter from './components/Filter';
import PageTitle from '../Layout/PageTitle';
import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
} from '../../libs/utils/crud.util';
import CreateButton from '../../components/button/CreateButton';
import SendMailButton from '../../components/button/SendMailButton';
import ConfigureButton from '../../components/button/ConfigureButton';
import DeleteConfirmModal from '../../components/modal/DeleteConfirmModal';
import ListWidget from '../../components/ListWidget';

const ROOT_PATH = STUDENT_MONTHLY_ROOT_PATH;
const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      // {
      //   header: <strong>Student Monthly</strong>,
      //   data: 'name',
      //   sort: {
      //     name: 'name',
      //   },
      // },
      {
        header: 'Select',
        data: 'select',
      },
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

      <SendMailButton
        className="box ml-2"
        onClick={() => {
          history.push(newPage(ROOT_PATH));
        }}
      />

      <ConfigureButton
        className="box ml-2"
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
            deleteApi={warehouseApi.remove}
            readApi={warehouseApi.read}
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
    <>
      <PageTitle title="Student Monthly" actions={action} />
      <Widget>
        <ListWidget
          deleteDialog={deleteConfirmDialog}
          columns={columns}
          fetchData={warehouseApi.search}
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
