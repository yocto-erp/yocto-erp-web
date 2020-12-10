import React from 'react';
import PageTitle from '../Layout/PageTitle';
import logApi from '../../libs/apis/log.api';
import ListWidget from '../../components/ListWidget';
import { SORT_DIR } from '../../components/ListWidget/constants';
import FilterEmail from './components/FilterEmail';
import { formatDate } from '../../libs/utils/date.util';
import { EMAIL_STATUS } from './constants';

const ListLogEmailPage = () => {
  const columns = React.useMemo(
    () => [
      {
        header: 'Status',
        data: 'status',
        width: '1px',
        render: row => {
          let rs = '';
          if (row.email && row.email.status) {
            switch (row.email.status) {
              case EMAIL_STATUS.PENDING:
                rs = <span className="badge badge-warning">PENDING</span>;
                break;
              case EMAIL_STATUS.SUCCESS:
                rs = <span className="badge badge-success">SUCCESS</span>;
                break;
              case EMAIL_STATUS.FAIL:
                rs = <span className="badge badge-danger">FAIL</span>;
                break;
              default:
                break;
            }
          }
          return rs;
        },
      },
      {
        header: 'Email subject',
        data: 'subject',
        width: '20%',
        render: row => row.email?.subject,
      },
      {
        header: 'From',
        data: 'from',
        render: row => row.email?.from,
      },
      {
        header: 'To',
        data: 'tod',
        render: row => row.email?.to,
      },
      {
        header: 'Number attachment',
        data: 'totalAttach',
        render: row => row.email?.totalAttach,
      },
      {
        header: 'Sent Date',
        data: 'sent_date',
        render: row =>
          row.email && row.email.sent_date
            ? formatDate(new Date(row.email.sent_date))
            : '',
      },
    ],
    [],
  );

  const search = { search: '', fromDate: null, toDate: null };

  return (
    <ListWidget
      pageHeader={<PageTitle title="List Log Email" />}
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
  );
};

ListLogEmailPage.propTypes = {};
export default ListLogEmailPage;
