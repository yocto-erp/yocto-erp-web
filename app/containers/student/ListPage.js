import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import classNames from "classnames";
import { Button, UncontrolledTooltip } from "reactstrap";
import TableActionColumns from "../../components/ListWidget/TableActionColumn";
import studentApi from "../../libs/apis/student/student.api";
import { MAIN_CONTACT_TYPE, STUDENT_MANAGEMENT_ROOT_PATH } from "./constants";
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

const ROOT_PATH = STUDENT_MANAGEMENT_ROOT_PATH;
const ListPage = ({ history }) => {
  const { configure } = useStudentConfigure();

  const columns = React.useMemo(
    () => [
      {
        key: "status",
        header: "Status",
        data: "status",
        width: "5%",
        sort: {
          name: "status",
        },
        render: row => {
          if (row.status === 1) {
            return <span className="badge badge-warning">PENDING</span>;
          }
          if (row.status === 2) {
            return <span className="badge badge-success">ACTIVE</span>;
          }
          if (row.status === 3) {
            return <span className="badge badge-danger">LEAVE</span>;
          }
          return <></>;
        },
      },
      {
        header: <strong>Student</strong>,
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
        header: "parent",
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
        header: "Meal",
        data: "enableMeal",
        width: "5%",
        render: row =>
          row.enableMeal ? (
            <span className="badge badge-success">YES</span>
          ) : (
            <span className="badge badge-danger">NO</span>
          ),
      },
      {
        header: "Bus",
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
        header: "Action",
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
      pageHeader={<PageTitle title="Student" actions={actions} />}
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
