import React from "react";
import { Route } from "react-router-dom";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import TableActionColumns from "../../../components/ListWidget/TableActionColumn";
import {
  deletePagePattern,
  editPage,
  newPage,
  onDelete,
} from "../../../libs/utils/crud.util";
import PageTitle from "../../Layout/PageTitle";
import EcommerceProductApi from "../../../libs/apis/ecommerce/ecommerce-product.api";
import CreateButton from "../../../components/button/CreateButton";
import ListWidget from "../../../components/ListWidget";
import DeleteConfirmModal from "../../../components/modal/DeleteConfirmModal";
import Price from "../../../components/common/Price";
import {
  LastModifiedByColumn,
  SORT_DIR,
} from "../../../components/ListWidget/constants";
import { ECOMMERCE_PRODUCT_ROOT_PATH } from "../constants";
import EcommerceProductView from "../components/EcommerceProductView";
import messages from "../messages";

const ROOT_PATH = ECOMMERCE_PRODUCT_ROOT_PATH;

const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: "Sản phẩm bán",
        data: "type",
        sort: {
          name: "type",
        },
        render: row => <EcommerceProductView item={row} />,
      },
      {
        header: <span className="text-nowrap">Giá</span>,
        data: "amount",
        render: row => (
          <>
            <Price amount={row.price} />/{row.unit.name}
          </>
        ),
        sort: {
          name: "price",
        },
        class: "min",
      },
      {
        header: "Cần xuất kho",
        data: "webDisplayName",
        class: "min text-center",
        render: row =>
          row.enableWarehouse ? (
            <span className="badge badge-info">ENABLE</span>
          ) : (
            <span className="badge badge-secondary">DISABLE</span>
          ),
      },
      {
        header: <span className="text-nowrap">Thuế bán</span>,
        data: "taxSet",
        render: row => row.taxSet?.name,
        class: "min text-center",
      },
      LastModifiedByColumn,
      {
        header: "Action",
        data: "",
        class: "action",
        render: row => (
          <TableActionColumns
            onEdit={() => {
              history.push(editPage(ROOT_PATH, row.id));
            }}
            onDelete={onDelete(ROOT_PATH, row.id, history)}
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
          history.push(newPage(ROOT_PATH));
        }}
      >
        Create Product
      </CreateButton>
    </>
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
            deleteApi={EcommerceProductApi.remove}
            readApi={EcommerceProductApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(
                  `Delete Ecommerce Product ${item.webDisplayName} Success`,
                );
              }
            }}
            title="Delete Ecommerce Product?"
            message={row => {
              if (!row) return "";
              return (
                <>
                  Are you sure to delete <strong>{row.webDisplayName}</strong> ?
                </>
              );
            }}
          />
        )}
      />
    ),
    [],
  );

  const search = { search: "", startDate: null, endDate: null };

  return (
    <ListWidget
      pageHeader={
        <PageTitle
          title={<FormattedMessage {...messages.header} />}
          actions={actions}
        />
      }
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={EcommerceProductApi.search}
      initFilter={search}
      initPage={1}
      initSize={10}
      initSorts={{ lastModifiedDate: SORT_DIR.DESC }}
    />
  );
};

ListPage.propTypes = {
  history: PropTypes.any,
};
export default ListPage;
