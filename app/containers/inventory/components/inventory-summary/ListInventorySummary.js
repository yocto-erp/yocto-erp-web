import React from 'react';
import PropTypes from 'prop-types';
import Widget from '../../../../components/Widget/Widget';
import CreatedBy from '../../../../components/ListWidget/CreatedBy';
import inventorySummaryApi from '../../../../libs/apis/inventory/inventory-summary.api';
import PageTitle from '../../../Layout/PageTitle';

import ListWidget from '../../../../components/ListWidget';
import FilterInventorySummary from './FilterInventorySummary';
import { PATH_GOODS_ISSUE, PATH_GOODS_RECEIPT } from '../../constants';
import CreateButton from '../../../../components/button/CreateButton';
import { newPage } from '../../../../libs/utils/crud.util';

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

  const actions = (
    <>
      <CreateButton
        className="mr-2"
        onClick={() => {
          history.push(newPage(PATH_GOODS_RECEIPT));
        }}
      >
        Goods Receipt
      </CreateButton>
      <CreateButton
        onClick={() => {
          history.push(newPage(PATH_GOODS_ISSUE));
        }}
        color="warning"
      >
        Goods Issue
      </CreateButton>
    </>
  );

  return (
    <>
      <PageTitle title="INVENTORY SUMMARY" actions={actions} />
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
