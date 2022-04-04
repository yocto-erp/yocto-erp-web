import React from "react";
import { Route } from "react-router-dom";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import Filter from "./components/Filter";
import TableActionColumns from "../../../components/ListWidget/TableActionColumn";
import {
  deletePagePattern,
  editPage,
  newPage,
  onDelete,
} from "../../../libs/utils/crud.util";
import PageTitle from "../../Layout/PageTitle";
import { SUBJECT_ROOT_PATH } from "../constants";
import CreateButton from "../../../components/button/CreateButton";
import ListWidget from "../../../components/ListWidget";
import DeleteConfirmModal from "../../../components/modal/DeleteConfirmModal";
import {
  CreatedByColumn,
  SORT_DIR,
} from "../../../components/ListWidget/constants";
import subjectApi from "../../../libs/apis/partner/subject.api";
import messages from "./messages";
import SubjectView from "./components/SubjectView";
import { mappingSubject } from "./constants";

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
              history.push(editPage(SUBJECT_ROOT_PATH, row.id));
            }}
            onDelete={onDelete(SUBJECT_ROOT_PATH, row.id, history)}
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
          history.push(newPage(SUBJECT_ROOT_PATH));
        }}
      >
        Create
      </CreateButton>
    </>
  );

  const deleteConfirmDialog = React.useMemo(
    () => (
      <Route
        path={deletePagePattern(SUBJECT_ROOT_PATH)}
        render={({
          match: {
            params: { id },
          },
        }) => (
          <DeleteConfirmModal
            id={id}
            deleteApi={subjectApi.remove}
            readApi={subjectApi.read}
            routePattern={SUBJECT_ROOT_PATH}
            onClose={item => {
              history.goBack();
              const rs = mappingSubject(item);
              if (item) {
                toast.success(`Delete Partner ${rs?.name} Success`);
              }
            }}
            title="Delete Partner?"
            message={row => {
              const rs = mappingSubject(row);
              if (!row) return "";
              return `Are you sure to delete partner ${rs.name} ?`;
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
          title={<FormattedMessage {...messages.listPageHeader} />}
          actions={actions}
        />
      }
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={subjectApi.search}
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
