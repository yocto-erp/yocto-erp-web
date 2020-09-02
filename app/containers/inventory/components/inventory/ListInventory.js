import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Widget from '../../../../components/Widget/Widget';
import CreatedBy from '../../../../components/ListWidget/CreatedBy';
import TableActionColumns from '../../../../components/ListWidget/TableActionColumn';
import inventoryApi from '../../../../libs/apis/inventory/inventory.api';
import goodsIssuesApi from '../../../../libs/apis/inventory/goods-issue.api';
import goodsReceiptApi from '../../../../libs/apis/inventory/goods-receipt.api';
import {
  INVENTORY_ROOT_PATH,
  INVENTORY_TYPE,
  PATH_GOODS_RECEIPT,
  PATH_GOODS_ISSUE,
} from '../../constants';
import PageTitle from '../../../Layout/PageTitle';
import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
} from '../../../../libs/utils/crud.util';
import CreateButton from '../../../../components/button/CreateButton';
import DeleteConfirmModal from '../../../../components/modal/DeleteConfirmModal';
import ListWidget from '../../../../components/ListWidget';
import FilterInventory from './FilterInventory';

const ROOT_PATH = INVENTORY_ROOT_PATH;
const ListInventory = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        key: 'type',
        header: 'Type',
        data: 'type',
        width: '5%',
        render: row => (row.type === 1 ? 'OUT' : 'IN'),
      },
      {
        header: <strong>Warehouse</strong>,
        data: 'warehouse',
        width: '20%',
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
        width: '20%',
      },
      {
        header: 'Processed Date',
        data: 'processedDate',
        width: '15%',
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
        data: 'action',
        class: 'action',
        render: row => (
          <TableActionColumns
            onEdit={() => {
              if (INVENTORY_TYPE.OUT === row.type) {
                history.push(editPage(PATH_GOODS_ISSUE, row.id));
              } else {
                history.push(editPage(PATH_GOODS_RECEIPT, row.id));
              }
              console.log(`Edit Item ${JSON.stringify(row)}`);
            }}
            onDelete={() => {
              if (INVENTORY_TYPE.OUT === row.type) {
                history.push(deletePage(PATH_GOODS_ISSUE, row.id));
              } else {
                history.push(deletePage(PATH_GOODS_RECEIPT, row.id));
              }
            }}
          />
        ),
      },
    ],
    [],
  );

  console.log('ListPage');
  const search = { warehouseId: null, search: '' };
  const actions = (
    <>
      <CreateButton
        className="mr-2"
        onClick={() => {
          console.log('Create Goods Receipt');
          history.push(newPage(PATH_GOODS_RECEIPT));
        }}
      >
        Goods Receipt
      </CreateButton>
      <CreateButton
        onClick={() => {
          console.log('Create  Goods Issue');
          history.push(newPage(PATH_GOODS_ISSUE));
        }}
        color="warning"
      >
        Goods Issue
      </CreateButton>
    </>
  );

  const deleteConfirmDialog = React.useMemo(
    () => (
      <>
        <Route
          path={deletePagePattern(PATH_GOODS_ISSUE)}
          render={({
            match: {
              params: { id },
            },
          }) => (
            // match === null
            <DeleteConfirmModal
              id={id}
              deleteApi={goodsIssuesApi.remove}
              readApi={goodsIssuesApi.read}
              routePattern={ROOT_PATH}
              onClose={item => {
                history.goBack();
                if (item) {
                  toast.success(`Delete Goods Issue ${item.name} Success`);
                }
              }}
              title="Delete Goods Issue?"
              message={row => {
                if (!row) return '';
                return `Are you sure to delete ${row.name} ?`;
              }}
            />
          )}
        />

        <Route
          path={deletePagePattern(PATH_GOODS_RECEIPT)}
          render={({
            match: {
              params: { id },
            },
          }) => (
            // match === null
            <DeleteConfirmModal
              id={id}
              deleteApi={goodsReceiptApi.remove}
              readApi={goodsReceiptApi.read}
              routePattern={ROOT_PATH}
              onClose={item => {
                history.goBack();
                if (item) {
                  toast.success(`Delete Goods Receipt ${item.name} Success`);
                }
              }}
              title="Delete goods receipt?"
              message={row => {
                if (!row) return '';
                return `Are you sure to delete ${row.name} ?`;
              }}
            />
          )}
        />
      </>
    ),
    [],
  );
  return (
    <>
      <PageTitle title="GOODS RECEIPT / ISSUE" actions={actions} />
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
