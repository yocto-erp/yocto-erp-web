import React from 'react';
import PropTypes from 'prop-types';
import Widget from '../../../../components/Widget/Widget';
import CreatedBy from '../../../../components/ListWidget/CreatedBy';
import inventorySummaryApi from '../../../../libs/apis/inventory-summary.api';
import PageTitle from '../../../Layout/PageTitle';

import ListWidget from '../../../../components/ListWidget';
import FilterInventorySummary from './FilterInventorySummary';
import CreateButton from '../../../../components/button/CreateButton';
import { newPage } from '../../../../libs/utils/crud.util';
import { INVENTORY_ROOT_PATH } from '../../constants';

const ROOT_PATH = INVENTORY_ROOT_PATH;
const ListInventorySummary = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: <strong>Warehouse</strong>,
        data: 'warehouse',
        width: '30%',
        render: row => {
          const { warehouse } = row;
          return warehouse ? warehouse.name : '';
        },
      },
      {
        header: 'Product',
        data: 'product',
        width: '20%',
        render: row => {
          const { product } = row;
          return product ? product.name : '';
        },
      },
      {
        header: 'Unit',
        data: 'unit',
        width: '15%',
        render: row => {
          const { unit } = row;
          return unit ? `${unit.name} - ${unit.rate}` : '';
        },
      },
      {
        header: 'Quantity',
        data: 'quantity',
        width: '10%',
      },
      {
        header: 'Last Modified By',
        data: 'lastModified',
        width: '1px',
        render: row => {
          const { lastModifiedBy, lastModifiedDate } = row;
          return <CreatedBy user={lastModifiedBy} date={lastModifiedDate} />;
        },
      },
    ],
    [],
  );

  const search = { warehouseId: null, productId: null };
  const action = (
    <div>
      <CreateButton
        onClick={() => {
          console.log('Create');
          history.push(newPage(ROOT_PATH));
        }}
      >
        Goods Receipt
      </CreateButton>
    </div>
  );

  const action1 = (
    <div>
      <CreateButton
        onClick={() => {
          console.log('Create');
          history.push(newPage(ROOT_PATH));
        }}
        color="warning"
      >
        Goods Issue
      </CreateButton>
    </div>
  );

  return (
    <>
      <PageTitle title="Inventory Summary" actions={[action, action1]} />
      <Widget>
        <ListWidget
          columns={columns}
          fetchData={inventorySummaryApi.search}
          initialSize={10}
          initialPage={1}
          initialFilter={search}
        >
          <FilterInventorySummary data={search} />
        </ListWidget>
      </Widget>
    </>
  );
};

ListInventorySummary.propTypes = {
  history: PropTypes.any,
};

export default ListInventorySummary;
