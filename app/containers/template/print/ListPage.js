import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import TableActionColumns from "../../../components/ListWidget/TableActionColumn";
import { TEMPLATE_PRINT_ROOT_PATH } from "../constants";
import Filter from "./components/Filter";
import PageTitle from "../../Layout/PageTitle";
import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
} from "../../../libs/utils/crud.util";
import CreateButton from "../../../components/button/CreateButton";
import DeleteConfirmModal from "../../../components/modal/DeleteConfirmModal";
import ListWidget from "../../../components/ListWidget";
import messages from "../messages";
import { templateApi } from "../../../libs/apis/template/template.api";
import {
  CreatedByColumn,
  SORT_DIR,
} from "../../../components/ListWidget/constants";

const ROOT_PATH = TEMPLATE_PRINT_ROOT_PATH;

const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: <strong>Name</strong>,
        data: "name",
        sort: {
          name: "name",
        },
      },
      {
        header: "Type",
        data: "type",
        render: row => {
          const { templateType } = row;
          return templateType.name;
        },
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

  const search = { search: "", type: null };

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
            deleteApi={templateApi.remove}
            readApi={templateApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Template ${item.name} Success`);
              }
            }}
            title="Delete Template?"
            message={row => {
              if (!row) return "";
              return (
                <p>
                  Are you sure to delete template <strong>{row.name}</strong> ?
                </p>
              );
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
          title={<FormattedMessage {...messages.title} />}
          actions={action}
        />
      }
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={templateApi.search}
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
