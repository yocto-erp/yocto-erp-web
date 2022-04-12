import React from "react";
import { Route } from "react-router-dom";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
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
  DEBT_PAID_ROOT_PATH,
  DEBT_TYPE,
} from "../constants";
import messages from "../messages";
import SubjectView from "../../partner/subject/components/SubjectView";
import Price from "../../../components/common/Price";
import DebtTypeView from "../components/DebtTypeView";

const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        data: "name",
      },
      {
        header: "Đối tác",
        data: "partner",
        render: row => (
          <FormattedMessage
            {...messages[`listPageType${row?.subject?.type}`]}
          />
        ),
      },
      {
        header: "Thông tin",
        data: "info",
        render: row => <SubjectView item={row?.subject} isShowTagging />,
      },
      {
        header: "Số tiền",
        data: "amount",
        class: "min",
        render: row => <Price amount={row?.amount} />,
      },
      {
        header: "Loại",
        data: "type",
        class: "min",
        render: row => <DebtTypeView type={row?.type} />,
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
        render: row => (
          <TableActionColumns
            onEdit={() => {
              history.push(
                editPage(
                  row.type === DEBT_TYPE.RECEIVABLES ||
                    row.type === DEBT_TYPE.TO_PAY_DEBT
                    ? DEBT_DEBIT_ROOT_PATH
                    : DEBT_PAID_ROOT_PATH,
                  row.id,
                ),
              );
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
          history.push(newPage(DEBT_PAID_ROOT_PATH));
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
                toast.success(`Delete Debt ${item.name} Success`);
              }
            }}
            title="Delete Debt?"
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
