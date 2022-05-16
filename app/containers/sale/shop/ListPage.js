import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import TableActionColumns from "../../../components/ListWidget/TableActionColumn";
import shopApi from "../../../libs/apis/shop.api";
import { SHOP_ROOT_PATH } from "./constants";
import Filter from "./components/Filter";
import PageTitle from "../../Layout/PageTitle";
import {
  deletePagePattern,
  editPage,
  newPage,
  onDelete,
} from "../../../libs/utils/crud.util";
import CreateButton from "../../../components/button/CreateButton";
import DeleteConfirmModal from "../../../components/modal/DeleteConfirmModal";
import ListWidget from "../../../components/ListWidget";
import messages from "./messages";
import { CreatedByColumn } from "../../../components/ListWidget/constants";
import { commonMessage } from "../../messages";
import { PERMISSION } from "../../../components/Acl/constants";
import Permission from "../../../components/Acl/Permission";

const ROOT_PATH = SHOP_ROOT_PATH;
const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: <FormattedMessage {...messages.listPageTableColShop} />,
        data: "name",
        sort: {
          name: "name",
        },
      },
      {
        header: <FormattedMessage {...messages.listPageTableColAddress} />,
        data: "address",
        width: "40%",
      },
      {
        header: <FormattedMessage {...messages.listPageTableColTotalUser} />,
        data: "totalUser",
        class: "min-width",
      },
      CreatedByColumn,
      {
        header: <FormattedMessage {...commonMessage.action} />,
        data: "",
        class: "action",
        render: row => (
          <TableActionColumns
            onEdit={() => {
              history.push(editPage(ROOT_PATH, row.id));
            }}
            editPermission={PERMISSION.SHOP.UPDATE}
            deletePermission={PERMISSION.SHOP.DELETE}
            onDelete={onDelete(ROOT_PATH, row.id, history)}
          />
        ),
      },
    ],
    [],
  );

  const search = { search: "" };
  const action = (
    <Permission permissions={[PERMISSION.SHOP.CREATE]}>
      <CreateButton
        className="box"
        onClick={() => {
          history.push(newPage(ROOT_PATH));
        }}
      />
    </Permission>
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
            deleteApi={shopApi.remove}
            readApi={shopApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete shop ${item.name} Success`);
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
      pageHeader={
        <PageTitle
          title={<FormattedMessage {...messages.listPageTitle} />}
          actions={action}
        />
      }
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={shopApi.search}
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
