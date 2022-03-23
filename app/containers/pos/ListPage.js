import React, { useState } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import CreatedBy from "../../components/ListWidget/CreatedBy";
import TableActionColumns from "../../components/ListWidget/TableActionColumn";
import { POS_ROOT_PATH } from "./constants";
import Filter from "./components/Filter";
import PageTitle from "../Layout/PageTitle";
import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
} from "../../libs/utils/crud.util";
import CreateButton from "../../components/button/CreateButton";
import DeleteConfirmModal from "../../components/modal/DeleteConfirmModal";
import ListWidget from "../../components/ListWidget";
import posApi from "../../libs/apis/pos.api";
import POSAssignUserModal from "./components/POSAssignUserModal";

const ROOT_PATH = POS_ROOT_PATH;
const ListPage = ({ history }) => {
  const [assignPos, setAssignPos] = useState(null);

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
        header: "Warehouse",
        data: "warehouse",
        width: "40%",
        render: row => row.warehouse.name,
      },
      {
        header: "Shop",
        data: "shop",
        render: row => row.shop.name,
      },
      {
        header: "Users",
        data: "totalUser",
      },
      {
        header: "Remark",
        data: "remark",
      },
      {
        header: "Last Modified By",
        data: "lastModified",
        width: "1px",
        sort: {
          name: "lastModifiedDate",
        },
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
            buttons={[
              <Button key="view" onClick={() => setAssignPos(row)} color="info">
                <i className="fi flaticon-users" />
              </Button>,
            ]}
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
            deleteApi={posApi.remove}
            readApi={posApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete POS ${item.name} Success`);
              }
            }}
            title="Delete Warehouse?"
            message={row => {
              if (!row) return "";
              return `Are you sure to delete POS ${row.name} ?`;
            }}
          />
        )}
      />
    ),
    [],
  );
  return (
    <ListWidget
      pageHeader={<PageTitle title="POS Management" actions={action} />}
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={posApi.search}
      initialSize={10}
      initialPage={1}
      initialFilter={search}
    >
      <>
        <Filter />
        <POSAssignUserModal
          pos={assignPos}
          closeHandle={() => setAssignPos(null)}
        />
      </>
    </ListWidget>
  );
};
ListPage.propTypes = {
  history: PropTypes.any,
};

export default ListPage;
