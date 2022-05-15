import React from "react";
import { Route, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import TableActionColumns from "../../../components/ListWidget/TableActionColumn";
import purchaseApi from "../../../libs/apis/order/purchase.api";
import { PURCHASE_ORDER_ROOT_PATH } from "./constants";
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
import Filter from "./components/Filter";
import {
  CreatedByColumn,
  SORT_DIR,
} from "../../../components/ListWidget/constants";
import Price from "../../../components/common/Price";
import Tags from "../../../components/Form/tagging/ViewTags";
import SubjectView from "../../partner/subject/components/SubjectView";
import messages from "./messages";
import { PERMISSION } from "../../../components/Acl/constants";
import Permission from "../../../components/Acl/Permission";

const ROOT_PATH = PURCHASE_ORDER_ROOT_PATH;
const ListPage = () => {
  const history = useHistory();
  const columns = React.useMemo(
    () => [
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
        header: "Đối tác",
        data: "subject",
        class: "min",
        render: row => <SubjectView item={row.subject} />,
      },
      {
        header: "Total Amount",
        data: "totalAmount",
        render: row => <Price amount={row.totalAmount} />,
        sort: {
          name: "totalAmount",
        },
        class: "min text-right",
      },
      {
        header: "Remark",
        data: "remark",
        width: "40%",
      },
      CreatedByColumn,
      {
        header: "Action",
        data: "",
        class: "action",
        render: row => (
          <TableActionColumns
            editPermission={PERMISSION.ORDER.PURCHASE.UPDATE}
            onEdit={() => {
              history.push(editPage(ROOT_PATH, row.id));
            }}
            onDelete={onDelete(ROOT_PATH, row.id, history)}
            deletePermission={PERMISSION.ORDER.PURCHASE.DELETE}
          />
        ),
      },
    ],
    [],
  );

  const search = { search: "", partnerCompanyId: null, partnerPersonId: null };
  const action = (
    <Permission permissions={[PERMISSION.ORDER.PURCHASE.CREATE]}>
      <CreateButton
        className="mr-2 btn-raised"
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
            deleteApi={purchaseApi.remove}
            readApi={purchaseApi.read}
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
      pageHeader={
        <PageTitle
          title={<FormattedMessage {...messages.listPageTitle} />}
          actions={action}
        />
      }
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={purchaseApi.search}
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
