import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import TableActionColumns from "../../../components/ListWidget/TableActionColumn";
import { STUDENT_CLASS_ROOT_PATH } from "./constants";
import Filter from "./components/Filter";
import {
  deletePagePattern,
  editPage,
  newPage,
  onDelete,
} from "../../../libs/utils/crud.util";
import DeleteConfirmModal from "../../../components/modal/DeleteConfirmModal";
import ListWidget from "../../../components/ListWidget";
import Price from "../../../components/common/Price";
import studentClassApi from "../../../libs/apis/student/student-class.api";
import CreateButton from "../../../components/button/CreateButton";
import PageTitle from "../../Layout/PageTitle";
import CreatedBy from "../../../components/ListWidget/CreatedBy";

const ROOT_PATH = STUDENT_CLASS_ROOT_PATH;
const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        data: "name",
      },
      {
        header: "Monthly Tuition Fee",
        data: "tuitionFee",
        render: row => <Price amount={row.tuitionFeePerMonth} />,
      },
      {
        header: "Absent Return Fee Per Day",
        data: "absentReturnFeePerDay",
        render: row => <Price amount={row.absentFeeReturnPerDay} />,
      },
      {
        header: "Monthly Meal Fee",
        data: "mealFeePerMonth",
        render: row => <Price amount={row.mealFeePerMonth} />,
      },
      {
        header: "Absent Return Meal Fee Per Day",
        data: "mealFeeReturnPerDay",
        render: row => <Price amount={row.mealFeeReturnPerDay} />,
      },
      {
        header: "Trial Fee Per Day",
        data: "feePerTrialDay",
        render: row => <Price amount={row.feePerTrialDay} />,
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
                    Delete Student Class <strong>{item.name}</strong> Success
                  </span>,
                );
              }
            }}
            title="Delete Student Class?"
            message={row => {
              if (!row) return "";
              return (
                <span>
                  Are you sure to delete Class <strong>{row.name}</strong>?
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
        fetchData={studentClassApi.search}
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
