import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Widget from '../../../components/Widget/Widget';
import TableActionColumns from '../../../components/ListWidget/TableActionColumn';
import Checkbox from '../../../components/Form/Checkbox';
import studentMonthlyFeeApi from '../../../libs/apis/student/student-monthly-fee.api';
import { STUDENT_MONTHLY_ROOT_PATH } from './constants';
import Filter from './components/Filter';
import PageTitle from '../../Layout/PageTitle';
import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
} from '../../../libs/utils/crud.util';
import CreateButton from '../../../components/button/CreateButton';
import SendMailButton from '../../../components/button/SendMailButton';
import ConfigureButton from '../../../components/button/ConfigureButton';
import DeleteConfirmModal from '../../../components/modal/DeleteConfirmModal';
import ListWidget from '../../../components/ListWidget';
import { STUDENT_CONFIGURATION_ROOT_PATH } from '../constants';

const ROOT_PATH = STUDENT_MONTHLY_ROOT_PATH;
const ListPage = ({ history }) => {
  const [listUpdate, setListUpdate] = useState([]);
  const checkItem = id => {
    if (listUpdate.includes(id)) {
      const newListUpdate = listUpdate.splice(id, 1);
      setListUpdate(newListUpdate);
    } else {
      const newListUpdate = [...listUpdate, id];
      setListUpdate(newListUpdate);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        header: 'Select',
        data: 'select',
        render: row => (
          <Checkbox
            onClick={() => checkItem(row.id)}
            checked={listUpdate.includes(row.id)}
          />
        ),
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
        className="mr-2 btn-raised"
        onClick={() => {
          history.push(newPage(ROOT_PATH));
        }}
      />

      <CreateButton
        className="mr-2 btn-raised"
        text="Edit"
        icon="fi flaticon-edit"
        color="warning"
        onClick={() => {
          history.push(editPage(ROOT_PATH, 'listID'));
          // list id create
        }}
      />

      <SendMailButton
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
    <>
      <PageTitle title="Student Monthly" actions={action} />
      <Widget>
        <ListWidget
          deleteDialog={deleteConfirmDialog}
          columns={columns}
          fetchData={studentMonthlyFeeApi.search}
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
