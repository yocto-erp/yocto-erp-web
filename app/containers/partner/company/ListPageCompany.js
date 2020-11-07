import React from 'react';
import { Route } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import Filter from './components/Filter';
import TableActionColumns from '../../../components/ListWidget/TableActionColumn';
import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
} from '../../../libs/utils/crud.util';
import PageTitle from '../../Layout/PageTitle';
import { COMPANY_ROOT_PATH } from '../constants';
import companyApi from '../../../libs/apis/company.api';
import CreateButton from '../../../components/button/CreateButton';
import ListWidget from '../../../components/ListWidget';
import DeleteConfirmModal from '../../../components/modal/DeleteConfirmModal';

import {
  CreatedByColumn,
  SORT_DIR,
} from '../../../components/ListWidget/constants';

const ListPageCompany = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: 'Name',
        data: 'name',
        width: '20%',
      },
      {
        header: 'Phone',
        data: 'gsm',
      },
      {
        header: 'Address',
        data: 'address',
      },
      {
        header: 'Remark',
        data: 'remark',
      },
      CreatedByColumn,
      {
        header: 'Action',
        data: '',
        class: 'action',
        render: row => (
          <TableActionColumns
            onEdit={() => {
              history.push(editPage(COMPANY_ROOT_PATH, row.id));
            }}
            onDelete={() => {
              history.push(deletePage(COMPANY_ROOT_PATH, row.id));
            }}
          />
        ),
      },
    ],
    [],
  );

  const search = { search: '' };

  const actions = (
    <>
      <CreateButton
        className="mr-2 btn-raised"
        onClick={() => {
          history.push(newPage(COMPANY_ROOT_PATH));
        }}
      >
        Create
      </CreateButton>
    </>
  );

  const deleteConfirmDialog = React.useMemo(
    () => (
      <Route
        path={deletePagePattern(COMPANY_ROOT_PATH)}
        render={({
          match: {
            params: { id },
          },
        }) => (
          // match === null
          <DeleteConfirmModal
            id={id}
            deleteApi={companyApi.remove}
            readApi={companyApi.read}
            routePattern={COMPANY_ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Company ${item.name} Success`);
              }
            }}
            title="Delete Company?"
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
      pageHeader={<PageTitle title="Company Management" actions={actions} />}
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={companyApi.search}
      initFilter={search}
      initPage={1}
      initSize={10}
      initSorts={{ createdDate: SORT_DIR.DESC }}
    >
      <Filter data={search} />
    </ListWidget>
  );
};

ListPageCompany.propTypes = {
  history: PropTypes.any,
};
export default ListPageCompany;
