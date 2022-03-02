import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import TableActionColumns from "../../../components/ListWidget/TableActionColumn";
import { STUDENT_BUS_STOP_ROOT_PATH } from "./constants";
import Filter from "./components/Filter";
import {
  deletePagePattern,
  editPage,
  newPage,
  onDelete,
} from "../../../libs/utils/crud.util";
import DeleteConfirmModal from "../../../components/modal/DeleteConfirmModal";
import ListWidget from "../../../components/ListWidget";
import studentClassApi from "../../../libs/apis/student/student-class.api";
import CreateButton from "../../../components/button/CreateButton";
import PageTitle from "../../Layout/PageTitle";
import CreatedBy from "../../../components/ListWidget/CreatedBy";
import studentBusStopApi from "../../../libs/apis/student/student-bus-stop.api";

const ROOT_PATH = STUDENT_BUS_STOP_ROOT_PATH;
const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        data: "name",
      },
      {
        header: "Last Modified By",
        data: "lastModified",
        class: "min",
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
              history.push(editPage(ROOT_PATH, [row.id]));
            }}
            onDelete={onDelete(ROOT_PATH, row.id, history)}
          />
        ),
      },
    ],
    [],
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
          <DeleteConfirmModal
            id={id}
            deleteApi={studentClassApi.remove}
            readApi={studentClassApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(
                  <span>
                    Delete Bus Stop <strong>{item.name}</strong> Success
                  </span>,
                );
              }
            }}
            title="Delete Student Class?"
            message={row => {
              if (!row) return "";
              return (
                <span>
                  Are you sure to delete Bus Stop <strong>{row.name}</strong>?
                </span>
              );
            }}
          />
        )}
      />
    ),
    [],
  );

  const action = (
    <div>
      <CreateButton
        onClick={() => {
          history.push(newPage(ROOT_PATH));
        }}
      />
    </div>
  );

  return (
    <>
      <ListWidget
        pageHeader={<PageTitle title="Class Management" actions={action} />}
        deleteDialog={deleteConfirmDialog}
        columns={columns}
        fetchData={studentBusStopApi.search}
      >
        <Filter />
      </ListWidget>
    </>
  );
};
ListPage.propTypes = {
  history: PropTypes.any,
};

export default ListPage;
