import React from "react";
import { Route } from "react-router-dom";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import Filter from "./Filter";
import TableActionColumns from "../../../components/ListWidget/TableActionColumn";
import {
  deletePagePattern,
  editPage,
  onDelete,
} from "../../../libs/utils/crud.util";
import PageTitle from "../../Layout/PageTitle";
import { DEBT_COMMON_ROOT_PATH } from "../constants";
import ListWidget from "../../../components/ListWidget";
import DeleteConfirmModal from "../../../components/modal/DeleteConfirmModal";
import {
  CreatedByColumn,
  SORT_DIR,
} from "../../../components/ListWidget/constants";
import debtApi from "../../../libs/apis/debt/debt.api";
import messages from "../messages";
import SubjectView from "../../partner/subject/components/SubjectView";

const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: "Đối tác",
        data: "type",
        render: row => (
          <FormattedMessage {...messages[`listPageType${row.type}`]} />
        ),
      },
      {
        header: "Thông tin",
        data: "gsm",
        render: row => <SubjectView item={row} isShowTagging />,
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
              history.push(editPage(DEBT_COMMON_ROOT_PATH, row.id));
            }}
            onDelete={onDelete(DEBT_COMMON_ROOT_PATH, row.id, history)}
          />
        ),
      },
    ],
    [],
  );

  const search = { search: "" };

  const deleteConfirmDialog = React.useMemo(
    () => (
      <Route
        path={deletePagePattern(DEBT_COMMON_ROOT_PATH)}
        render={({
          match: {
            params: { id },
          },
        }) => (
          <DeleteConfirmModal
            id={id}
            deleteApi={debtApi.remove}
            readApi={debtApi.read}
            routePattern={DEBT_COMMON_ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Partner Success`);
              }
            }}
            title="Delete Partner?"
            message={row => {
              if (!row) return "";
              return `Are you sure to delete partner`;
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
          title={<FormattedMessage {...messages.listPageCommonHeader} />}
        />
      }
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
