import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import TableActionColumns from "../../../components/ListWidget/TableActionColumn";
import { FORM_ROOT_PATH, FORM_STATUS } from "./constants";
import Filter from "./components/Filter";
import {
  deletePagePattern,
  editPage,
  newPage,
  onDelete,
} from "../../../libs/utils/crud.util";
import DeleteConfirmModal from "../../../components/modal/DeleteConfirmModal";
import ListWidget from "../../../components/ListWidget";
import CreateButton from "../../../components/button/CreateButton";
import PageTitle from "../../Layout/PageTitle";
import CreatedBy from "../../../components/ListWidget/CreatedBy";
import registerFormApi from "../../../libs/apis/form/register-form.api";
import { IconLink, IconView } from "../../Icon/constants";

const ROOT_PATH = FORM_ROOT_PATH;

const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        data: "name",
      },
      {
        header: "Last Register",
        data: "lastRegister",
        class: "min",
        sort: {
          name: "lastRegister",
        },
      },
      {
        header: "Status",
        data: "status",
        class: "min",
        render: row => {
          switch (row.status) {
            case FORM_STATUS.ACTIVE:
              return <span className="badge badge-primary">Hoạt động</span>;
            default:
              return <span className="badge badge-secondary">Tạm ngưng</span>;
          }
        },
      },
      {
        header: "Created By",
        data: "createdBy",
        class: "min",
        sort: {
          name: "createdDate",
        },
        render: row => {
          const { createdBy, createdDate } = row;
          return <CreatedBy user={createdBy} date={createdDate} />;
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
            buttons={[
              <a
                href={`/cpm/${row.publicId}/form`}
                className="btn btn-outline-info"
                target="_blank"
              >
                <IconLink />
              </a>,
            ]}
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
            deleteApi={registerFormApi.remove}
            readApi={registerFormApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(
                  <span>
                    Delete Register Form <strong>{item.name}</strong> Success
                  </span>,
                );
              }
            }}
            title="Delete Register Form?"
            message={row => {
              if (!row) return "";
              return (
                <span>
                  Are you sure to delete register form{" "}
                  <strong>{row.name}</strong>?
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
        pageHeader={<PageTitle title="Form Management" actions={action} />}
        deleteDialog={deleteConfirmDialog}
        columns={columns}
        fetchData={registerFormApi.search}
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
