import React from 'react';
import { Route } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import TableActionColumns from '../../../components/ListWidget/TableActionColumn';
import {
  deletePagePattern,
  editPage,
  newPage,
  onDelete,
} from '../../../libs/utils/crud.util';
import PageTitle from '../../Layout/PageTitle';
import EcommerceProductApi from '../../../libs/apis/ecommerce/ecommerce-product.api';
import CreateButton from '../../../components/button/CreateButton';
import ListWidget from '../../../components/ListWidget';
import DeleteConfirmModal from '../../../components/modal/DeleteConfirmModal';
import Price from '../../../components/common/Price';
import {
  LastUpdatedByColumn,
  SORT_DIR,
} from '../../../components/ListWidget/constants';
import { ECOMMERCE_PRODUCT_ROOT_PATH } from '../constants';
import ProductView from '../../../components/common/product/ProductView';

const ROOT_PATH = ECOMMERCE_PRODUCT_ROOT_PATH;

const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: 'Product',
        data: 'type',
        sort: {
          name: 'type',
        },
        render: row => <ProductView item={row.product} />,
      },
      {
        header: 'Web Name',
        data: 'webDisplayName',
        width: '20%',
      },
      {
        header: 'Short Name',
        data: 'shortName',
        width: '20%',
      },
      {
        header: <span className="text-nowrap">Price</span>,
        data: 'amount',
        render: row => <Price amount={row.price} />,
        sort: {
          name: 'price',
        },
        class: 'min text-right',
      },
      {
        header: 'Remark',
        data: 'description',
      },
      LastUpdatedByColumn,
      {
        header: 'Action',
        data: '',
        class: 'action',
        render: row => (
          <TableActionColumns
            onEdit={() => {
              history.push(editPage(ROOT_PATH, row.id));
            }}
            onDelete={onDelete(ROOT_PATH, row.id, history)}
          />
        ),
      },
    ],
    [],
  );

  const actions = (
    <>
      <CreateButton
        className="mr-2 btn-raised"
        onClick={() => {
          history.push(newPage(ROOT_PATH));
        }}
      >
        Create Product
      </CreateButton>
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
            deleteApi={EcommerceProductApi.remove}
            readApi={EcommerceProductApi.read}
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

  const search = { search: '', startDate: null, endDate: null };

  return (
    <ListWidget
      pageHeader={<PageTitle title="Ecommerce Product" actions={actions} />}
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={EcommerceProductApi.search}
      initFilter={search}
      initPage={1}
      initSize={10}
      initSorts={{ createdDate: SORT_DIR.DESC }}
      enableSelectColumn
    />
  );
};

ListPage.propTypes = {
  history: PropTypes.any,
};
export default ListPage;
