import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Widget from '../../components/Widget/Widget';
import CreatedBy from '../../components/ListWidget/CreatedBy';
import TableActionColumns from '../../components/ListWidget/TableActionColumn';
import productApi from '../../libs/apis/product/product.api';
import { PRODUCT_ROOT_PATH } from './constants';
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

const ROOT_PATH = PRODUCT_ROOT_PATH;
const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: <strong>Name</strong>,
        data: 'name',
        sort: {
          name: 'name',
        },
        width: '20%',
      },
      {
        header: 'Price',
        data: 'priceBaseUnit',
        width: '12%',
      },
      {
        header: 'Remark',
        data: 'remark',
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
            deleteApi={productApi.remove}
            readApi={productApi.read}
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
    <ListWidget
      pageHeader={<PageTitle title="Product" actions={action} />}
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={productApi.search}
      initialSize={10}
      initialPage={1}
      initialFilter={search}
    >
      <Filter data={search} />
    </ListWidget>
  );
};
ListPage.propTypes = {
  history: PropTypes.any,
};

export default ListPage;
