import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import CreatedBy from "../../../components/ListWidget/CreatedBy";
import TableActionColumns from "../../../components/ListWidget/TableActionColumn";
import taxSetApi from "../../../libs/apis/tax/tax-set.api";
import { TAX_SET_ROOT_PATH } from "./constants";

import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
} from "../../../libs/utils/crud.util";
import CreateButton from "../../../components/button/CreateButton";
import DeleteConfirmModal from "../../../components/modal/DeleteConfirmModal";
import ListWidget from "../../../components/ListWidget";
import PageTitle from "../../Layout/PageTitle";
import messages from "./messages";
import Filter from "./components/Filter";

const ROOT_PATH = TAX_SET_ROOT_PATH;

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
        header: "Num of taxes",
        data: "numOfTax",
      },
      {
        header: "Remark",
        data: "remark",
      },
      {
        header: "Last Modified",
        data: "lastModifiedById",
        class: "min-width",
        render: row => {
          const { lastModifiedBy, lastModifiedDate } = row;
          return <CreatedBy user={lastModifiedBy} date={lastModifiedDate} />;
        },
      },
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

  const search = { search: "" };

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
            deleteApi={taxSetApi.remove}
            readApi={taxSetApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Tax Set ${item.name} Success`);
              }
            }}
            title="Delete Tax?"
            message={row => {
              if (!row) return "";
              return `Are you sure to delete Tax Set ${row.name} ?`;
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
          title={<FormattedMessage {...messages.header} />}
          actions={action}
        />
      }
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={taxSetApi.search}
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
