import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap';
import CreatedBy from '../../../components/ListWidget/CreatedBy';
import surveyAdminApi from '../../../libs/apis/survey/survey-admin.api';
import { SURVEY_MANAGEMENT_ROOT_PATH, SURVEY_TYPE } from './constants';
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
import Filter from './components/Filter';

const ROOT_PATH = SURVEY_MANAGEMENT_ROOT_PATH;
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
        header: 'Type',
        data: 'type',
        width: '10%',
        render: row => {
          switch (row.type) {
            case SURVEY_TYPE.PUBLIC:
              return <span className="badge badge-info">PUBLIC</span>;

            case SURVEY_TYPE.EMAIL_VERIFY:
              return <span className="badge badge-primary">EMAIL VERIFY</span>;
            case SURVEY_TYPE.SMS_VERIFY:
              return <span className="badge badge-danger">SMS VERIFY</span>;
            default:
              return '';
          }
        },
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
        render: row => {
          const buttonEls = [];
          buttonEls.push(
            <Button
              key="edit"
              onClick={() => history.push(editPage(ROOT_PATH, row.id))}
              color="warning"
            >
              <i className="fi flaticon-edit" />
            </Button>,
          );
          buttonEls.push(
            <Button
              key="question"
              onClick={() => history.push(`${ROOT_PATH}/${row.id}/questions`)}
              color="info"
            >
              <i className="fa fa-question" />
            </Button>,
          );
          buttonEls.push(
            <Button
              key="delete"
              onClick={() => history.push(deletePage(ROOT_PATH, row.id))}
              color="danger"
            >
              <i className="fi flaticon-trash" />
            </Button>,
          );
          return (
            <ButtonToolbar className="">
              <ButtonGroup size="sm">{buttonEls}</ButtonGroup>
            </ButtonToolbar>
          );
        },
      },
    ],
    [],
  );

  const search = { search: '', type: '' };
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
            deleteApi={surveyAdminApi.remove}
            readApi={surveyAdminApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Survey ${item.name} Success`);
              }
            }}
            title="Delete Survey?"
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
      pageHeader={<PageTitle title="Survey" actions={action} />}
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={surveyAdminApi.search}
      initialFilter={search}
    >
      <Filter />
    </ListWidget>
  );
};
ListPage.propTypes = {
  history: PropTypes.any,
};

export default ListPage;
