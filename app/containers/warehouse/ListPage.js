import React from 'react';
import { Progress } from 'reactstrap';
import Widget from '../../components/Widget/Widget';
import Table from '../../components/Table';
import makeData from './makeData';
import TableFilter from '../../components/Table/TableFilter';

const serverData = makeData(10000);
const ListPage = () => {
  // Let's simulate a large dataset on the server (outside of our component)
  const columns = React.useMemo(
    () => [
      {
        header: 'ID',
        data: 'id',
        sort: {
          name: 'id',
          dir: 'asc',
        },
      },
      {
        header: 'First Name',
        data: 'firstName',
      },
      {
        header: 'Last Name',
        data: 'lastName',
      },
      {
        header: 'Age',
        data: 'age',
      },
      {
        header: 'Visits',
        data: 'visits',
      },
      {
        header: 'Status',
        data: 'status',
      },
      {
        header: 'Profile Progress',
        data: 'progress',
        render: row => (
          <Progress color="danger" animated value={row.progress} />
        ),
      },
    ],
    [],
  );

  const serverApi = React.useCallback(
    ({ page, size }) =>
      new Promise(resolve => {
        console.log('Fetch Data');
        setTimeout(() => {
          const startRow = (page - 1) * size;
          const endRow = startRow + size;
          resolve({
            count: 10000,
            rows: serverData.slice(startRow, endRow),
          });
        }, 1000);
      }),
    [],
  );

  const tableFilter = React.useMemo(
    () => <TableFilter filter={{ email: '1234324' }} />,
    [],
  );
  console.log('ListPage');
  return (
    <Widget>
      <Table
        columns={columns}
        fetchData={serverApi}
        initialSize={10}
        initialPage={1}
        initialFilter={{ email: '1234324' }}
      >
        {tableFilter}
      </Table>
    </Widget>
  );
};
ListPage.propTypes = {};

export default ListPage;
