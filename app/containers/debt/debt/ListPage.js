import React from "react";
import { Route } from "react-router-dom";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
import Filter from "./Filter";
import TableActionColumns from "../../../components/ListWidget/TableActionColumn";
import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
} from "../../../libs/utils/crud.util";
import PageTitle from "../../Layout/PageTitle";
import debtApi from "../../../libs/apis/debt/debt.api";
import CreateButton from "../../../components/button/CreateButton";
import ListWidget from "../../../components/ListWidget";
import DeleteConfirmModal from "../../../components/modal/DeleteConfirmModal";
import {
  CreatedByColumn,
  SORT_DIR,
} from "../../../components/ListWidget/constants";
import {
  DEBT_DEBIT_ROOT_PATH,
  DEBT_LIST_ROOT_PATH,
  DEBT_PAY_ROOT_PATH,
} from "../constants";

const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: "Đối Tác",
        data: "name",
        class: "min",
        render: row => row.fullName || `${row.firstName} ${row.lastName}`,
      },
      {
        header: "Số tiền",
        data: "gsm",
        class: "min",
      },
      {
        header: "Loại",
        data: "email",
        class: "min",
      },
      {
        header: "Cập Nhật",
        data: "remark",
      },
      CreatedByColumn,
      {
        header: "Action",
        data: "",
        class: "action",
        render: row => (
          <TableActionColumns
            onEdit={() => {
              history.push(editPage(DEBT_LIST_ROOT_PATH, row.id));
            }}
            onDelete={() => {
              history.push(deletePage(DEBT_LIST_ROOT_PATH, row.id));
            }}
          />
        ),
      },
    ],
    [],
  );

  const search = { search: "" };

  const actions = (
    <>
      <CreateButton
        className="mr-2 btn-raised"
        onClick={() => {
          history.push(newPage(DEBT_DEBIT_ROOT_PATH));
        }}
      >
        Ghi Nợ
      </CreateButton>
      <CreateButton
        className="mr-2 btn-raised"
        color="warning"
        onClick={() => {
          history.push(newPage(DEBT_PAY_ROOT_PATH));
        }}
      >
        Trả Nợ
      </CreateButton>
    </>
  );

  const deleteConfirmDialog = React.useMemo(
    () => (
      <Route
        path={deletePagePattern(DEBT_LIST_ROOT_PATH)}
        render={({
          match: {
            params: { id },
          },
        }) => (
          <DeleteConfirmModal
            id={id}
            deleteApi={debtApi.remove}
            readApi={debtApi.read}
            routePattern={DEBT_LIST_ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(
                  `Delete Customer ${item.firstName} ${item.lastName} Success`,
                );
              }
            }}
            title="Delete Customer?"
            message={row => {
              if (!row) return "";
              return `Are you sure to delete ${row.firstName} ${
                row.lastName
              } ?`;
            }}
          />
        )}
      />
    ),
    [],
  );
  return (
    <ListWidget
      pageHeader={<PageTitle title="List Debt" actions={actions} />}
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={debtApi.search}
      initFilter={search}
      initPage={1}
      initSize={10}
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
