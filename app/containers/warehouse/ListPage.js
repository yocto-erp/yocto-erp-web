import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import TableActionColumns from "../../components/ListWidget/TableActionColumn";
import warehouseApi from "../../libs/apis/warehouse.api";
import { WAREHOUSE_ROOT_PATH } from "./constants";
import Filter from "./components/Filter";
import PageTitle from "../Layout/PageTitle";
import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
} from "../../libs/utils/crud.util";
import CreateButton from "../../components/button/CreateButton";
import DeleteConfirmModal from "../../components/modal/DeleteConfirmModal";
import ListWidget from "../../components/ListWidget";
import { CreatedByColumn } from "../../components/ListWidget/constants";
import { commonMessage } from "../messages";
import messages from "./messages";

const ROOT_PATH = WAREHOUSE_ROOT_PATH;
const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: <FormattedMessage {...messages.listPageTableColWarehouse} />,
        data: "name",
        sort: {
          name: "name",
        },
      },
      {
        header: <FormattedMessage {...commonMessage.tableColHeaderAddress} />,
        data: "address",
        width: "40%",
      },
      CreatedByColumn,
      {
        header: <FormattedMessage {...commonMessage.tableColHeaderAction} />,
        data: "",
        class: "action",
        render: row => (
          <TableActionColumns
            onEdit={() => {
              history.push(editPage(ROOT_PATH, row.id));
            }}
            onDelete={() => {
              history.push(deletePage(ROOT_PATH, row.id));
            }}
          />
        ),
      },
    ],
    [],
  );

  const search = { search: "" };
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
            deleteApi={warehouseApi.remove}
            readApi={warehouseApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Warehouse ${item.name} Success`);
              }
            }}
            title="Delete Warehouse?"
            message={row => {
              if (!row) return "";
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
      pageHeader={<PageTitle title="Warehouse" actions={action} />}
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={warehouseApi.search}
      initialSize={10}
      initialPage={1}
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
