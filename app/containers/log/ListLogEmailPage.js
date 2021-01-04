import React from 'react';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  UncontrolledTooltip,
} from 'reactstrap';
import PageTitle from '../Layout/PageTitle';
import logApi from '../../libs/apis/log.api';
import ListWidget from '../../components/ListWidget';
import { SORT_DIR } from '../../components/ListWidget/constants';
import FilterEmail from './components/FilterEmail';
import { formatDate } from '../../libs/utils/date.util';
import { EMAIL_STATUS } from './constants';
import ModalViewContentEmail from './components/ModalViewContentEmail';

const ListLogEmailPage = () => {
  const [isOpen, open] = React.useState(false);
  const [content, setContent] = React.useState();
  const columns = React.useMemo(
    () => [
      {
        header: 'Subject',
        data: 'subject',
        render: row => (
          <>
            <span>{row.email.subject}</span>
            {row.email.totalAttach ? (
              <i
                className="las la-paperclip ml-2"
                style={{ fontSize: '1.2em' }}
                title="Attachment"
              />
            ) : null}
          </>
        ),
      },
      // {
      //   header: 'Content',
      //   data: 'content',
      //   render: row => (
      //     <RawHTML
      //       style={{
      //         maxWidth: '200px',
      //         overflow: 'hidden',
      //         textOverflow: 'ellipsis',
      //       }}
      //       html={row.email.content}
      //     />
      //   ),
      // },
      {
        header: 'From',
        data: 'from',
        class: 'min',
        render: row => row.email.from,
      },
      {
        header: 'To',
        data: 'to',
        render: row => (
          <p className="p-0 m-0">
            {row.email.to}
            {row.email.cc ? (
              <>
                <br />
                <span className="small text-muted">CC: {row.email.cc}</span>
              </>
            ) : null}
            {row.email.bcc ? (
              <>
                <br />
                <span className="small text-muted">BCC: {row.email.bcc}</span>
              </>
            ) : null}
          </p>
        ),
      },
      {
        header: 'Status',
        data: 'status',
        class: 'min',
        render: row => {
          let rs = '';
          switch (row.email.status) {
            case EMAIL_STATUS.PENDING:
              rs = (
                <span className="badge badge-warning" id={`status${row.id}`}>
                  PENDING
                </span>
              );
              break;
            case EMAIL_STATUS.SUCCESS:
              rs = (
                <span className="badge badge-success" id={`status${row.id}`}>
                  SUCCESS
                </span>
              );
              break;
            case EMAIL_STATUS.FAIL:
              rs = (
                <span className="badge badge-danger" id={`status${row.id}`}>
                  FAIL
                </span>
              );
              break;
            default:
              break;
          }
          return (
            <>
              {rs}
              <UncontrolledTooltip target={`status${row.id}`}>
                {row.email.api_response}
              </UncontrolledTooltip>
            </>
          );
        },
      },
      {
        header: 'Sent Date',
        data: 'sent_date',
        class: 'min',
        render: row =>
          row.email && row.email.sent_date
            ? formatDate(new Date(row.email.sent_date))
            : '',
      },
      {
        header: 'Action',
        data: '',
        class: 'action',
        render: row => (
          <ButtonToolbar className="">
            <ButtonGroup size="sm">
              <Button
                key="view"
                onClick={() => {
                  setContent(row.email.content);
                  open(true);
                }}
                color="info"
              >
                <i className="fi flaticon-view" />
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        ),
      },
    ],
    [],
  );

  const search = { search: '', fromDate: null, toDate: null };

  return (
    <>
      <ListWidget
        pageHeader={<PageTitle title="Email Log" />}
        columns={columns}
        fetchData={logApi.searchEmail}
        initFilter={search}
        initPage={1}
        initSize={10}
        initSorts={{ createdDate: SORT_DIR.DESC }}
        enableSelectColumn={false}
      >
        <FilterEmail data={search} />
      </ListWidget>
      {isOpen ? (
        <ModalViewContentEmail
          content={content}
          closeHandle={val => {
            console.log(val);
            open(false);
          }}
          isOpen={isOpen}
        />
      ) : (
        ''
      )}
    </>
  );
};

ListLogEmailPage.propTypes = {};
export default ListLogEmailPage;
