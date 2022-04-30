import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import classNames from "classnames";
import { Button, UncontrolledTooltip } from "reactstrap";
import { FormattedMessage } from "react-intl";
import TableActionColumns from "../../components/ListWidget/TableActionColumn";
import studentApi from "../../libs/apis/student/student.api";
import {
  MAIN_CONTACT_TYPE,
  STUDENT_MANAGEMENT_ROOT_PATH,
  STUDENT_STATUS,
} from "./constants";
import PageTitle from "../Layout/PageTitle";
import {
  deletePagePattern,
  editPage,
  newPage,
  onDelete,
} from "../../libs/utils/crud.util";
import CreateButton from "../../components/button/CreateButton";
import DeleteConfirmModal from "../../components/modal/DeleteConfirmModal";
import ListWidget from "../../components/ListWidget";
import Filter from "./components/Filter";
import { formatDateOnly } from "../../libs/utils/date.util";
import useStudentConfigure from "../../libs/hooks/useStudentConfigure";
import { CreatedByColumn } from "../../components/ListWidget/constants";
import PersonView from "../partner/person/components/PersonView";
import { GENDER } from "../../libs/apis/person.api";
import { listPageMessage } from "./messages";
import { commonMessage } from "../messages";

const ROOT_PATH = STUDENT_MANAGEMENT_ROOT_PATH;
const ListPage = ({ history }) => {
  const { configure } = useStudentConfigure();

  const columns = React.useMemo(
    () => [
      {
        key: "status",
        header: <FormattedMessage {...listPageMessage.tableStatus} />,
        data: "status",
        class: "min text-center",
        sort: {
          name: "status",
        },
        render: row => {
          if (row.status === STUDENT_STATUS.PENDING) {
            return (
              <span className="badge badge-warning">
                <FormattedMessage {...listPageMessage[`status${row.status}`]} />
              </span>
            );
          }
          if (row.status === STUDENT_STATUS.ACTIVE) {
            return (
              <span className="badge badge-success">
                <FormattedMessage {...listPageMessage[`status${row.status}`]} />
              </span>
            );
          }
          if (row.status === STUDENT_STATUS.LEAVE) {
            return (
              <span className="badge badge-danger">
                <FormattedMessage {...listPageMessage[`status${row.status}`]} />
              </span>
            );
          }
          return <></>;
        },
      },
      {
        header: <FormattedMessage {...listPageMessage.tableStudent} />,
        data: "studentId",
        sort: {
          name: "name",
        },
        class: "min no-wrap",
        render: row => (
          <>
            <p className="mb-0">
              <strong className="text-danger">{row.studentId}</strong>
              <br />
              <i
                className={classNames("fa fa-fw", {
                  "fa-female": row.child.sex === GENDER.FEMALE,
                  "fa-male": row.child.sex === GENDER.MALE,
                  "fa-user": !row.child.sex,
                })}
              />
              &nbsp;
              <strong>
                {row.child.name} ({row.alias})
              </strong>
              {row.child.birthday ? (
                <>
                  <br />
                  <i className="fa fa-birthday-cake fa-fw" />{" "}
                  <strong>
                    {formatDateOnly(new Date(row.child.birthday))}
                  </strong>
                </>
              ) : null}
              <br />
              <i className="fa fa-universal-access fa-fw" />
              &nbsp;
              {row.class?.name}
            </p>
          </>
        ),
      },
      {
        header: <FormattedMessage {...listPageMessage.tableParent} />,
        data: "father",
        width: "15%",
        render: row => (
          <>
            <p className="m-0 text-nowrap">
              <PersonView item={row.father} />
              {row.mainContact === MAIN_CONTACT_TYPE.FATHER ? (
                <Button color="link" id={`mainContact${row?.id}`}>
                  <i
                    className="fa fa-phone-square fa-fw"
                    title="Liên lạc chính"
                  />
                </Button>
              ) : null}
              <br />
              <PersonView item={row.mother} />
              {row.mainContact === MAIN_CONTACT_TYPE.MOTHER ? (
                <Button color="link" id={`mainContact${row?.id}`}>
                  <i
                    className="fa fa-phone-square fa-fw"
                    title="Liên lạc chính"
                  />
                </Button>
              ) : null}
              {row.mainContact ? (
                <UncontrolledTooltip target={`mainContact${row?.id}`}>
                  Liên lạc chính
                </UncontrolledTooltip>
              ) : null}
            </p>
          </>
        ),
      },
      {
        header: <FormattedMessage {...listPageMessage.tableMeal} />,
        data: "enableMeal",
        width: "min text-center",
        render: row =>
          row.enableMeal ? (
            <span className="badge badge-success">Có</span>
          ) : (
            <span className="badge badge-danger">Không</span>
          ),
      },
      {
        header: <FormattedMessage {...listPageMessage.tableBus} />,
        data: "bus",
        class: "min no-wrap",
        render: row => {
          const { toSchoolBusStop, toHomeBusStop } = row;
          return row.enableBus ? (
            <>
              {toSchoolBusStop ? (
                <p className="m-0">
                  To School From: <strong>{toSchoolBusStop.name}</strong>
                </p>
              ) : null}
              {toHomeBusStop ? (
                <p>
                  From School To: <strong>{toHomeBusStop.name}</strong>
                </p>
              ) : null}
            </>
          ) : null;
        },
      },
      CreatedByColumn,
      {
        header: <FormattedMessage {...commonMessage.action} />,
        data: "",
        class: "action",
        render: row => (
          <TableActionColumns
            onEdit={() => {
              history.push(editPage(ROOT_PATH, row.id));
            }}
            onDelete={onDelete(ROOT_PATH, row.id, history)}
          />
        ),
      },
    ],
    [configure],
  );

  const search = { search: "" };

  const actions = (
    <>
      <CreateButton
        className="mr-2 btn-raised"
        onClick={() => {
          history.push(newPage(ROOT_PATH));
        }}
      />
    </>
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
            deleteApi={studentApi.remove}
            readApi={studentApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Student ${item.child.name} Success`);
              }
            }}
            title="Delete Student?"
            message={row => {
              if (!row) return "";
              return `Are you sure to delete ${row.child.name} ?`;
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
          title={<FormattedMessage {...listPageMessage.header} />}
          actions={actions}
        />
      }
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={studentApi.search}
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
