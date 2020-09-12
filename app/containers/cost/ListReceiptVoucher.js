import React from 'react';
import { Route } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import Filter from './components/Filter';
import CreatedBy from '../../components/ListWidget/CreatedBy';
import TableActionColumns from '../../components/ListWidget/TableActionColumn';
import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
} from '../../libs/utils/crud.util';
import PageTitle from '../Layout/PageTitle';
import { COST_ROOT_PATH, COST_RECEIPT_PATH } from './constants';
import costApi from '../../libs/apis/cost.api';
import CreateButton from '../../components/button/CreateButton';
import ListWidget from '../../components/ListWidget';
import Widget from '../../components/Widget/Widget';
import DeleteConfirmModal from '../../components/modal/DeleteConfirmModal';

const ROOT_PATH = COST_ROOT_PATH;
const RECEIPT_PATH = COST_RECEIPT_PATH;

const ListReceiptVoucher = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: 'Name',
        data: 'name',
        sort: {
          name: 'name',
        },
        width: '20%',
      },
      {
        header: 'Total Amount',
        data: 'amount',
        sort: {
          name: 'amount',
        },
        width: '20%',
      },
      {
        header: 'Remark',
        data: 'remark',
        width: '20%',
      },
      {
        header: 'Created By',
        data: 'createdBy',
        width: '1px',
        render: row => {
          const { createdBy, createdDate } = row;
          return <CreatedBy user={createdBy} date={createdDate} />;
        },
      },
      {
        header: 'Action',
        data: '',
        class: 'action',
        render: row => (
          <TableActionColumns
            onEdit={() => {
              history.push(editPage(RECEIPT_PATH, row.id));
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
  const search = { search: '', type: 0 };
  const action = (
    <div>
      <CreateButton
        onClick={() => {
          history.push(newPage(RECEIPT_PATH));
        }}
      >
        Create Receipt Voucher
      </CreateButton>
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
            deleteApi={costApi.remove}
            readApi={costApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Cost ${item.name} Success`);
              }
            }}
            title="Delete Cost?"
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
      <PageTitle title="Receipt voucher" actions={action} />
      <Widget>
        <ListWidget
          deleteDialog={deleteConfirmDialog}
          columns={columns}
          fetchData={costApi.search}
          initFilter={search}
          initPage={1}
          initSize={10}
        >
          <Filter data={search} />
        </ListWidget>
      </Widget>
    </>
  );
};

ListReceiptVoucher.propTypes = {
  history: PropTypes.any,
};
export default ListReceiptVoucher;
