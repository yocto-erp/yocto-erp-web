import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import TableActionColumns from "../../../components/ListWidget/TableActionColumn";
import purchaseApi from "../../../libs/apis/order/purchase.api";
import { PURCHASE_ROOT_PATH } from "./constants";
import PageTitle from "../../Layout/PageTitle";
import {
  deletePagePattern,
  editPage,
  newPage,
  onDelete,
} from "../../../libs/utils/crud.util";
import CreateButton from "../../../components/button/CreateButton";
import DeleteConfirmModal from "../../../components/modal/DeleteConfirmModal";
import ListWidget from "../../../components/ListWidget";
import Filter from "./components/Filter";
import {
  CreatedByColumn,
  dateRender,
  SORT_DIR,
} from "../../../components/ListWidget/constants";
import Price from "../../../components/common/Price";
import Tags from "../../../components/Form/tagging/ViewTags";

const ROOT_PATH = PURCHASE_ROOT_PATH;
const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        data: "name",
        width: "20%",
        render: row => (
          <>
            <p>{row.name}</p>
            <Tags item={row.tagging} />{" "}
          </>
        ),
      },
      {
        header: "Company",
        data: "partnerCompany",
        width: "12%",
        render: row => {
          const { partnerCompany } = row;
          return partnerCompany ? partnerCompany.name : "";
        },
      },
      {
        header: "Customer",
        data: "partnerPerson",
        width: "12%",
        render: row => {
          const { partnerPerson } = row;
          return partnerPerson ? partnerPerson.fullName : "";
        },
      },
      {
        header: "Total Amount",
        data: "totalAmount",
        render: row => <Price amount={row.totalAmount} />,
        sort: {
          name: "totalAmount",
        },
        class: "min text-right",
      },
      {
        header: "Remark",
        data: "remark",
        width: "40%",
      },
      {
        header: <span className="text-nowrap">Processed Date</span>,
        data: "processedDate",
        render: row => dateRender(row.processedDate),
        class: "min",
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
    [],
  );

  const search = { search: "", partnerCompanyId: null, partnerPersonId: null };
  const action = (
    <div>
      <CreateButton
        className="mr-2 btn-raised"
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
            deleteApi={purchaseApi.remove}
            readApi={purchaseApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Product ${item.name} Success`);
              }
            }}
            title="Delete Product?"
            message={row => {
              if (!row) return "";
              return `Are you sure to delete ${row.name} ?`;
            }}
          />
        )}
      />
    ),
    [],
  );
  return (
    <ListWidget
      pageHeader={<PageTitle title="Purchase" actions={action} />}
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={purchaseApi.search}
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
