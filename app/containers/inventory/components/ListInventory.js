import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Widget from '../../../components/Widget/Widget';
import CreatedBy from '../../../components/ListWidget/CreatedBy';
import TableActionColumns from '../../../components/ListWidget/TableActionColumn';
import inventoryApi from '../../../libs/apis/inventory.api';
import { INVENTORY_ROOT_PATH } from '../constants';
import PageTitle from '../../Layout/PageTitle';
import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
} from '../../../libs/utils/crud.util';
import CreateButton from '../../../components/button/CreateButton';
import DeleteConfirmModal from '../../../components/modal/DeleteConfirmModal';
import ListWidget from '../../../components/ListWidget';
import FilterInventory from './FilterInventory';

const ROOT_PATH = INVENTORY_ROOT_PATH;
const ListInventory = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: 'Type',
        data: 'type',
        width: '12%',
        render: row => (row.type === 1 ? 'OUT' : 'IN'),
      },
      {
        header: <strong>Warehouse</strong>,
        data: 'warehouse',
        width: '30%',
        render: row => {
          const { warehouse } = row;
          return warehouse ? warehouse.name : '';
        },
      },
      {
        header: <strong>Name</strong>,
        data: 'name',
        sort: {
          name: 'name',
        },
        width: '20%',
      },
      {
        header: 'Total Product',
        data: 'totalProduct',
        width: '12%',
      },
      {
        header: 'Remark',
        data: 'remark',
        width: '40%',
      },
      {
        header: 'Date',
        data: 'processedDate',
        width: '40%',
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
        header: 'Last Modified By',
        data: 'lastModified',
        width: '1px',
        render: row => {
          const { lastModifiedBy, lastModifiedDate } = row;
          return <CreatedBy user={lastModifiedBy} date={lastModifiedDate} />;
        },
      },
      {
        header: 'Action',
        data: '',
        class: 'action',
        render: row => (
          <TableActionColumns
            onEdit={() => {
              history.push(editPage(ROOT_PATH, row.id));
              console.log(`Edit Item ${JSON.stringify(row)}`);
            }}
            onDelete={() => {
              console.log(`Delete Item ${JSON.stringify(row)}`);
              history.push(deletePage(ROOT_PATH, row.id));
            }}
          />
        ),
      },
    ],
    [],
  );

  console.log('ListPage');
  const search = { warehouseId: null, search: '' };
  const action = (
    <div>
      <CreateButton
        onClick={() => {
          console.log('Create');
          history.push(newPage(ROOT_PATH));
        }}
      >
        Goods Receipt
      </CreateButton>
    </div>
  );

  const action1 = (
    <div>
      <CreateButton
        onClick={() => {
          console.log('Create');
          history.push(newPage(ROOT_PATH));
        }}
        color="warning"
      >
        Goods Issue
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
            deleteApi={inventoryApi.remove}
            readApi={inventoryApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Product ${item.name} Success`);
              }
            }}
            title="Delete Product?"
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
      <PageTitle title="GOODS RECEIPT / ISSUE" actions={[action, action1]} />
      <Widget>
        <ListWidget
          deleteDialog={deleteConfirmDialog}
          columns={columns}
          fetchData={inventoryApi.search}
          initialSize={10}
          initialPage={1}
          initialFilter={search}
        >
          <FilterInventory data={search} />
        </ListWidget>
      </Widget>
    </>
  );
};
ListInventory.propTypes = {
  history: PropTypes.any,
};

export default ListInventory;
