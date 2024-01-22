import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import TableActionColumns from "../../../../components/ListWidget/TableActionColumn";
import { FORM_REGISTER_ROOT_PATH } from "./constants";
import Filter from "./components/Filter";
import {
  deletePagePattern,
  editPage,
  newPage,
  onDelete,
} from "../../../../libs/utils/crud.util";
import DeleteConfirmModal from "../../../../components/modal/DeleteConfirmModal";
import ListWidget from "../../../../components/ListWidget";
import CreateButton from "../../../../components/button/CreateButton";
import PageTitle from "../../../Layout/PageTitle";
import registerFormApi from "../../../../libs/apis/form/register-form.api";
import DateView from "../../../../components/common/date/DateView";
import registerFormSignupApi from "../../../../libs/apis/form/register-form-signup.api";
import ShortText from "../../../../components/ShortText";
import { IconEmail, IconPerson, IconPhone } from "../../../Icon/constants";
import FormRegisterStatusView from "./components/FormRegisterStatusView";
import Price from "../../../../components/common/Price";

const ROOT_PATH = FORM_REGISTER_ROOT_PATH;

const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: "Khách hàng",
        data: "name",
        class: "min",
        render: row => (
          <>
            <p className="mb-0 text-nowrap">
              <IconPerson /> <strong>{row.name}</strong>
            </p>
            <p className="mb-0 text-nowrap">
              <IconEmail /> {row.email}
            </p>
            <p className="mb-0 text-nowrap">
              <IconPhone /> {row.phone}
            </p>
          </>
        ),
      },
      {
        header: "Form",
        data: "form.name",
        class: "min",
        render: row => row.form.name,
      },
      {
        header: "Số tiền",
        data: "totalAmount",
        class: "min",
        render: row => <Price amount={row.totalAmount} />,
      },
      {
        header: "Client",
        data: "ip",
        class: "min",
        render: row => (
          <p className="mb-0">
            IP: {row.ip}
            <br />
            <ShortText maxWidth={320} text={`User Agent: ${row.userAgent}`} />
          </p>
        ),
      },
      {
        header: "Register Date",
        data: "createdDate",
        class: "min",
        sort: {
          name: "createdDate",
        },
        render: row => <DateView date={row.createdDate} />,
      },
      {
        header: "Status",
        data: "status",
        class: "min",
        render: row => <FormRegisterStatusView status={row.status} />,
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
            buttons={[]}
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
        pageHeader={<PageTitle title="Form sign up" actions={action} />}
        deleteDialog={deleteConfirmDialog}
        columns={columns}
        initSorts={{ createdDate: "desc" }}
        fetchData={registerFormSignupApi.search}
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
