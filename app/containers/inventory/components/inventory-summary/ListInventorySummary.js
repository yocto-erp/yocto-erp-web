import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import CreatedBy from "../../../../components/ListWidget/CreatedBy";
import inventorySummaryApi from "../../../../libs/apis/inventory/inventory-summary.api";
import PageTitle from "../../../Layout/PageTitle";

import ListWidget from "../../../../components/ListWidget";
import FilterInventorySummary from "./FilterInventorySummary";
import { PATH_GOODS_ISSUE, PATH_GOODS_RECEIPT } from "../../constants";
import CreateButton from "../../../../components/button/CreateButton";
import { newPage } from "../../../../libs/utils/crud.util";
import { SORT_DIR } from "../../../../components/ListWidget/constants";
import { inventoryMessages } from "../../messages";

const ListInventorySummary = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: <strong>Warehouse</strong>,
        data: "warehouse",
        width: "30%",
        render: row => {
          const { warehouse } = row;
          return warehouse ? warehouse.name : "";
        },
      },
      {
        header: "Product",
        data: "product",
        width: "20%",
        render: row => {
          const { product } = row;
          return product ? product.name : "";
        },
      },
      {
        header: "Unit",
        data: "unit",
        width: "15%",
        render: row => {
          const { unit } = row;
          return unit ? `${unit.name} - ${unit.rate}` : "";
        },
      },
      {
        header: "Quantity",
        data: "quantity",
        width: "10%",
      },
      {
        header: "Last Modified By",
        data: "lastModified",
        width: "1px",
        sort: {
          name: "lastModifiedDate",
        },
        render: row => {
          const { lastModifiedBy, lastModifiedDate } = row;
          return <CreatedBy user={lastModifiedBy} date={lastModifiedDate} />;
        },
      },
    ],
    [],
  );

  const actions = (
    <>
      <CreateButton
        className="mr-2 btn-raised"
        onClick={() => {
          history.push(newPage(PATH_GOODS_RECEIPT));
        }}
      >
        <FormattedMessage {...inventoryMessages.btnCreateGoodReceipt} />
      </CreateButton>
      <CreateButton
        className="shadow btn-raised"
        onClick={() => {
          history.push(newPage(PATH_GOODS_ISSUE));
        }}
        color="warning"
      >
        <FormattedMessage {...inventoryMessages.btnCreateGoodIssue} />
      </CreateButton>
    </>
  );

  return (
    <ListWidget
      isWidgetWrapper={false}
      pageHeader={<PageTitle title="" actions={actions} />}
      columns={columns}
      fetchData={inventorySummaryApi.search}
      initialSize={10}
      initialPage={1}
      initSorts={{ lastModifiedDate: SORT_DIR.DESC }}
    >
      <FilterInventorySummary />
    </ListWidget>
  );
};

ListInventorySummary.propTypes = {
  history: PropTypes.any,
};

export default ListInventorySummary;
