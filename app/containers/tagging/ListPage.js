import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import CreatedBy from '../../components/ListWidget/CreatedBy';
import TableActionColumns from '../../components/ListWidget/TableActionColumn';
import { TAGGING_ROOT_PATH } from './constants';
import Filter from './components/Filter';
import PageTitle from '../Layout/PageTitle';
import {
  deletePage,
  deletePagePattern,
  editPage,
} from '../../libs/utils/crud.util';
import DeleteConfirmModal from '../../components/modal/DeleteConfirmModal';
import ListWidget from '../../components/ListWidget';
import taggingApi from '../../libs/apis/tagging.api';
import TagItem from '../../components/Form/tagging/TagItem';

const ROOT_PATH = TAGGING_ROOT_PATH;
const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: <strong>Label</strong>,
        data: 'label',
        sort: {
          name: 'label',
        },
        render: row => <TagItem item={row} />,
      },
      {
        header: 'Total',
        data: 'total',
        class: 'min',
      },
      {
        header: 'Created By',
        data: 'createdBy',
        class: 'min-width',
        render: row => {
          const { createdBy, lastUpdatedDate } = row;
          return <CreatedBy user={createdBy} date={lastUpdatedDate} />;
        },
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
            deleteApi={taggingApi.remove}
            readApi={taggingApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Label ${item.label} Success`);
              }
            }}
            title="Delete Label ?"
            message={row => {
              if (!row) return '';
              return (
                <span>
                  Delete label <strong>{row.label}</strong> will delete all item
                  label ?
                </span>
              );
            }}
          />
        )}
      />
    ),
    [],
  );
  return (
    <ListWidget
      pageHeader={<PageTitle title="Labels" />}
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={taggingApi.search}
      initialSize={10}
      initialPage={1}
    >
      <Filter />
    </ListWidget>
  );
};
ListPage.propTypes = {
  history: PropTypes.any,
};

export default ListPage;
