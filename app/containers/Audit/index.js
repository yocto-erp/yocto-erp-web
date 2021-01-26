import React from 'react';
import { formatDate } from '../../libs/utils/date.util';
import ListWidget from '../../components/ListWidget';
import PageTitle from '../Layout/PageTitle';
import { auditApi } from '../../libs/apis/audit.api';
import AuditItem from './components/AuditItem';

export default function Audit() {
  const columns = React.useMemo(
    () => [
      {
        header: 'Action',
        data: 'subject',
        render: row => <AuditItem item={row} />,
      },
      {
        header: 'Action Date',
        data: 'sent_date',
        class: 'min',
        render: row => formatDate(new Date(row.createdDate)),
      },
    ],
    [],
  );

  return (
    <>
      <ListWidget
        pageHeader={<PageTitle title="Audit" />}
        columns={columns}
        fetchData={auditApi.search}
        initPage={1}
        initSize={10}
        enableSelectColumn={false}
      />
    </>
  );
}
