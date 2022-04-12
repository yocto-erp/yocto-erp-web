import React from "react";
import { Route } from "react-router-dom";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import Filter from "./components/Filter";
import TableActionColumns from "../../../components/ListWidget/TableActionColumn";
import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
} from "../../../libs/utils/crud.util";
import PageTitle from "../../Layout/PageTitle";
import { PERSON_ROOT_PATH } from "../constants";
import personApi from "../../../libs/apis/person.api";
import CreateButton from "../../../components/button/CreateButton";
import ListWidget from "../../../components/ListWidget";
import DeleteConfirmModal from "../../../components/modal/DeleteConfirmModal";
import {
  CreatedByColumn,
  SORT_DIR,
} from "../../../components/ListWidget/constants";
import messages from "./messages";

const ListPagePerson = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: <FormattedMessage {...messages.listPageColFullname} />,
        data: "name",
        class: "min",
        render: row => row.fullName || `${row.firstName} ${row.lastName}`,
      },
      {
        header: <FormattedMessage {...messages.listPageColGsm} />,
        data: "gsm",
        class: "min",
      },
      {
        header: <FormattedMessage {...messages.listPageColEmail} />,
        data: "email",
        class: "min",
      },
      {
        header: <FormattedMessage {...messages.listPageColRemark} />,
        data: "remark",
      },
      {
        ...CreatedByColumn,
        header: <FormattedMessage {...messages.listPageColCreatedBy} />,
      },
      {
        header: <FormattedMessage {...messages.listPageColAction} />,
        data: "",
        class: "action",
        render: row => (
          <TableActionColumns
            onEdit={() => {
              history.push(editPage(PERSON_ROOT_PATH, row.id));
            }}
            onDelete={() => {
              history.push(deletePage(PERSON_ROOT_PATH, row.id));
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
          history.push(newPage(PERSON_ROOT_PATH));
        }}
      >
        Create
      </CreateButton>
    </>
  );

  const deleteConfirmDialog = React.useMemo(
    () => (
      <Route
        path={deletePagePattern(PERSON_ROOT_PATH)}
        render={({
          match: {
            params: { id },
          },
        }) => (
          <DeleteConfirmModal
            id={id}
            deleteApi={personApi.remove}
            readApi={personApi.read}
            routePattern={PERSON_ROOT_PATH}
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
      pageHeader={
        <PageTitle
          title={<FormattedMessage {...messages.listPageHeader} />}
          actions={actions}
        />
      }
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={personApi.search}
      initFilter={search}
      initPage={1}
      initSize={10}
      initSorts={{ createdDate: SORT_DIR.DESC }}
    >
      <Filter />
    </ListWidget>
  );
};

ListPagePerson.propTypes = {
  history: PropTypes.any,
};
export default ListPagePerson;
