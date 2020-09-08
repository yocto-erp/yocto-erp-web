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
import { COST_ROOT_PATH } from './constants';
import apiCost from '../../libs/apis/cost.api';
import CreateButton from '../../components/button/CreateButton';
import ListWidget from '../../components/ListWidget';
import Widget from '../../components/Widget/Widget';
import DeleteConfirmModal from '../../components/modal/DeleteConfirmModal';

const ROOT_PATH = COST_ROOT_PATH;
const ListPage = ({ history }) => {
  const columns = React.useMemo(() => [
    {
      header: <strong>Type</strong>,
      data: 'type',
      width: '12%',
    },
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
            history.push(editPage(ROOT_PATH, row.id));
          }}
          onDelete={() => {
            history.push(deletePage(ROOT_PATH, row.id));
          }}
        />
      ),
    },
  ]);
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
            deleteApi={apiCost.remove}
            readApi={apiCost.read}
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
      <PageTitle title="Cost" actions={action} />
      <Widget>
        <ListWidget
          deleteDialog={deleteConfirmDialog}
          columns={columns}
          fetchData={apiCost.search}
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
ListPage.propTypes = {
  history: PropTypes.any,
};
export default ListPage;
