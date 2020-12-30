import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import TableActionColumns from '../../../components/ListWidget/TableActionColumn';
import { TEMPLATE_EMAIL_ROOT_PATH } from '../constants';
import Filter from './components/Filter';
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
import messages from './messages';
import { templateEmailApi } from '../../../libs/apis/template/template.api';
import {
  CreatedByColumn,
  SORT_DIR,
} from '../../../components/ListWidget/constants';
import CreatedBy from '../../../components/ListWidget/CreatedBy';

const ROOT_PATH = TEMPLATE_EMAIL_ROOT_PATH;

const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: <strong>Name</strong>,
        data: 'name',
        sort: {
          name: 'name',
        },
        render: row => {
          const { template } = row;
          return template.name;
        },
      },
      {
        header: <strong>Subject</strong>,
        data: 'subject',
      },
      {
        header: <strong>Send/Receive</strong>,
        data: 'detail',
        render: row => (
          <>
            {row.from ? (
              <p>
                From: <strong>{row.from}</strong>
              </p>
            ) : null}
            {row.cc ? (
              <p>
                CC: <strong>{row.cc.join(', ')}</strong>
              </p>
            ) : null}
            {row.bcc ? (
              <p>
                BCC: <strong>{row.bcc.join(', ')}</strong>
              </p>
            ) : null}
          </>
        ),
      },
      {
        header: 'Type',
        data: 'type',
        render: row => {
          const { templateType } = row.template;
          return templateType?.name;
        },
      },
      {
        header: 'Remark',
        data: 'remark',
        width: '40%',
        render: row => {
          const { template } = row;
          return template.remark;
        },
      },
      {
        ...CreatedByColumn,
        render: row => {
          const { createdBy, createdDate } = row.template;
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
              history.push(editPage(ROOT_PATH, row.templateId));
            }}
            onDelete={() => {
              history.push(deletePage(ROOT_PATH, row.templateId));
            }}
          />
        ),
      },
    ],
    [],
  );

  const search = { search: '', type: null };

  const action = (
    <div>
      <CreateButton
        className="box"
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
            deleteApi={() => templateEmailApi.remove(id)}
            readApi={templateEmailApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Template ${item.template.name} Success`);
              }
            }}
            title="Delete Template?"
            message={row => {
              if (!row) return '';
              return (
                <p>
                  Are you sure to delete template{' '}
                  <strong>{row.template.name}</strong> ?
                </p>
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
      pageHeader={
        <PageTitle
          title={<FormattedMessage {...messages.title} />}
          actions={action}
        />
      }
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={templateEmailApi.search}
      initialFilter={search}
      initSorts={{ createdDate: SORT_DIR.DESC }}
    >
      <Filter data={search} />
    </ListWidget>
  );
};
ListPage.propTypes = {
  history: PropTypes.any,
};

export default ListPage;
