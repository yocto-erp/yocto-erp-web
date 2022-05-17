import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import TableActionColumns from "../../components/ListWidget/TableActionColumn";
import productApi from "../../libs/apis/product/product.api";
import { PRODUCT_ROOT_PATH } from "./constants";
import PageTitle from "../Layout/PageTitle";
import {
  deletePagePattern,
  editPage,
  newPage,
  onDelete,
} from "../../libs/utils/crud.util";
import CreateButton from "../../components/button/CreateButton";
import DeleteConfirmModal from "../../components/modal/DeleteConfirmModal";
import ListWidget from "../../components/ListWidget";
import Filter from "./components/Filter";
import {
  CreatedByColumn,
  SORT_DIR,
} from "../../components/ListWidget/constants";
import Tags from "../../components/Form/tagging/ViewTags";
import ProductView from "../../components/common/product/ProductView";
import useUser from "../../libs/hooks/useUser";
import Permission from "../../components/Acl/Permission";
import { PERMISSION } from "../../components/Acl/constants";

const ROOT_PATH = PRODUCT_ROOT_PATH;
const ListPage = ({ history }) => {
  const { isHasAnyPermission } = useUser();
  const columns = React.useMemo(
    () => [
      {
        header: <strong>Name</strong>,
        data: "name",
        sort: {
          name: "name",
        },
        width: "20%",
        render: row => <ProductView item={row} />,
      },
      {
        header: "Label",
        data: "tagging",
        render: row => <Tags item={row.tagging} />,
      },
      {
        header: "Remark",
        data: "remark",
      },
      CreatedByColumn,
      {
        header: "Action",
        data: "",
        class: "action",
        permissions: [PERMISSION.PRODUCT.UPDATE, PERMISSION.PROVIDER.DELETE],
        render: row => (
          <TableActionColumns
            onEdit={
              isHasAnyPermission({ permission: PERMISSION.PRODUCT.UPDATE })
                ? () => history.push(editPage(ROOT_PATH, row.id))
                : null
            }
            onDelete={
              isHasAnyPermission({ permission: PERMISSION.PROVIDER.DELETE })
                ? onDelete(ROOT_PATH, row.id, history)
                : null
            }
          />
        ),
      },
    ],
    [],
  );

  const search = { search: "" };
  const action = (
    <Permission permissions={[PERMISSION.PRODUCT.CREATE]}>
      <CreateButton
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
            deleteApi={productApi.remove}
            readApi={productApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Product ${item.name} Success`);
              }
            }}
            title="Delete Product?"
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
      pageHeader={<PageTitle title="Product" actions={action} />}
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={productApi.search}
      initialSize={10}
      initialPage={1}
      initialFilter={search}
      initSorts={{ createdDate: SORT_DIR.DESC }}
    >
      <Filter />
    </ListWidget>
  );
};
ListPage.propTypes = {
  history: PropTypes.any,
};

export default ListPage;
