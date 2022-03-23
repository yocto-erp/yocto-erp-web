import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import TableActionColumns from "../../../../components/ListWidget/TableActionColumn";
import inventoryApi from "../../../../libs/apis/inventory/inventory.api";
import goodsIssuesApi from "../../../../libs/apis/inventory/goods-issue.api";
import goodsReceiptApi from "../../../../libs/apis/inventory/goods-receipt.api";
import {
  INVENTORY_ROOT_PATH,
  INVENTORY_TYPE,
  PATH_GOODS_RECEIPT,
  PATH_GOODS_ISSUE,
} from "../../constants";
import PageTitle from "../../../Layout/PageTitle";
import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
} from "../../../../libs/utils/crud.util";
import CreateButton from "../../../../components/button/CreateButton";
import DeleteConfirmModal from "../../../../components/modal/DeleteConfirmModal";
import ListWidget from "../../../../components/ListWidget";
import FilterInventory from "./FilterInventory";

import {
  CreatedByColumn,
  SORT_DIR,
} from "../../../../components/ListWidget/constants";
import { convertQueryWithDate } from "../../../../libs/utils/query.util";
import Tags from "../../../../components/Form/tagging/ViewTags";
import { inventoryMessages } from "../../messages";

const ROOT_PATH = INVENTORY_ROOT_PATH;
const ListInventory = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        key: "type",
        header: "Type",
        data: "type",
        width: "5%",
        sort: {
          name: "type",
        },
        render: row =>
          row.type === 1 ? (
            <span className="badge badge-danger">OUT</span>
          ) : (
            <span className="badge badge-primary">IN</span>
          ),
      },
      {
        header: <strong>Warehouse</strong>,
        data: "warehouse",
        width: "20%",
        render: row => {
          const { warehouse } = row;
          return warehouse ? warehouse.name : "";
        },
      },
      {
        header: "Name",
        data: "name",
        width: "20%",
        render: row => (
          <>
            <p>{row.name}</p>
            <Tags item={row.tagging} />{" "}
          </>
        ),
      },
      {
        header: "Total Product",
        data: "totalProduct",
        width: "12%",
      },
      {
        header: "Remark",
        data: "remark",
        width: "20%",
      },
      CreatedByColumn,
      {
        header: "Action",
        data: "action",
        class: "action",
        render: row => (
          <TableActionColumns
            onEdit={() => {
              if (INVENTORY_TYPE.OUT === row.type) {
                history.push(editPage(PATH_GOODS_ISSUE, row.id));
              } else {
                history.push(editPage(PATH_GOODS_RECEIPT, row.id));
              }
            }}
            onDelete={() => {
              if (INVENTORY_TYPE.OUT === row.type) {
                history.push(deletePage(PATH_GOODS_ISSUE, row.id));
              } else {
                history.push(deletePage(PATH_GOODS_RECEIPT, row.id));
              }
            }}
          />
        ),
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

  const deleteConfirmDialog = React.useMemo(
    () => (
      <>
        <Route
          path={deletePagePattern(PATH_GOODS_ISSUE)}
          render={({
            match: {
              params: { id },
            },
          }) => (
            // match === null
            <DeleteConfirmModal
              id={id}
              deleteApi={goodsIssuesApi.remove}
              readApi={goodsIssuesApi.read}
              routePattern={ROOT_PATH}
              onClose={item => {
                history.goBack();
                if (item) {
                  toast.success(`Delete Goods Issue ${item.name} Success`);
                }
              }}
              title="Delete Goods Issue?"
              message={row => {
                if (!row) return "";
                return `Are you sure to delete ${row.name} ?`;
              }}
            />
          )}
        />

        <Route
          path={deletePagePattern(PATH_GOODS_RECEIPT)}
          render={({
            match: {
              params: { id },
            },
          }) => (
            <DeleteConfirmModal
              id={id}
              deleteApi={goodsReceiptApi.remove}
              readApi={goodsReceiptApi.read}
              routePattern={ROOT_PATH}
              onClose={item => {
                history.goBack();
                if (item) {
                  toast.success(`Delete Goods Receipt ${item.name} Success`);
                }
              }}
              title="Delete goods receipt?"
              message={row => {
                if (!row) return "";
                return `Are you sure to delete ${row.name} ?`;
              }}
            />
          )}
        />
      </>
    ),
    [],
  );

  const search = {
    warehouseId: null,
    search: "",
    startDate: null,
    endDate: null,
  };

  return (
    <ListWidget
      pageHeader={
        <PageTitle
          title={<FormattedMessage {...inventoryMessages.title} />}
          actions={actions}
        />
      }
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={inventoryApi.search}
      initialSize={10}
      initialPage={1}
      initialFilter={search}
      initSorts={{ createdDate: SORT_DIR.DESC }}
      mappingUrlData={convertQueryWithDate()}
    >
      <FilterInventory />
    </ListWidget>
  );
};
ListInventory.propTypes = {
  history: PropTypes.any,
};

export default ListInventory;
