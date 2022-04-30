import React from "react";
import { Route } from "react-router-dom";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import Filter from "./components/Filter";
import TableActionColumns from "../../components/ListWidget/TableActionColumn";
import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
} from "../../libs/utils/crud.util";
import PageTitle from "../Layout/PageTitle";
import {
  COST_PAYMENT_PATH,
  COST_RECEIPT_PATH,
  COST_ROOT_PATH,
  COST_TYPE,
} from "./constants";
import apiCost from "../../libs/apis/cost.api";
import CreateButton from "../../components/button/CreateButton";
import ListWidget from "../../components/ListWidget";
import DeleteConfirmModal from "../../components/modal/DeleteConfirmModal";
import Price from "../../components/common/Price";
import {
  CreatedByColumn,
  SORT_DIR,
} from "../../components/ListWidget/constants";
import { convertQueryWithDate } from "../../libs/utils/query.util";
import Tags from "../../components/Form/tagging/ViewTags";
import SubjectView from "../partner/subject/components/SubjectView";
import messages from "./messages";
import { commonMessage } from "../messages";

const ROOT_PATH = COST_ROOT_PATH;

const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: <FormattedMessage {...messages.listPageName} />,
        data: "name",
        width: "20%",
        render: row => (
          <>
            <p className="mb-0">{row.name}</p>
            <Tags item={row.tagging} />{" "}
          </>
        ),
      },
      {
        header: <FormattedMessage {...messages.listPageType} />,
        data: "type",
        sort: {
          name: "type",
        },
        class: "min no-wrap",
        render: row => (
          <span
            className={classNames("badge", {
              "badge-success": row.type === COST_TYPE.RECEIPT,
              "badge-danger": row.type === COST_TYPE.PAYMENT,
            })}
          >
            <FormattedMessage {...messages[`costType${row.type}`]} />
          </span>
        ),
      },
      {
        header: <FormattedMessage {...messages.listPagePartner} />,
        data: "subject",
        class: "min no-wrap",
        render: row => <SubjectView item={row.subject} isShowTagging={false} />,
      },
      {
        header: <FormattedMessage {...messages.listPageAmount} />,
        data: "amount",
        render: row => <Price amount={row.amount} />,
        sort: {
          name: "amount",
        },
        class: "min text-right",
      },
      {
        header: <FormattedMessage {...messages.listPagePaymentMethod} />,
        data: "paymentMethod",
        render: row => row.paymentMethod?.name,
        class: "min text-center",
      },
      {
        header: <FormattedMessage {...messages.listPageRemark} />,
        data: "remark",
      },
      CreatedByColumn,
      {
        header: <FormattedMessage {...commonMessage.action} />,
        data: "",
        class: "action",
        render: row => (
          <TableActionColumns
            onEdit={() => {
              history.push(
                editPage(
                  row.type === 1 ? COST_RECEIPT_PATH : COST_PAYMENT_PATH,
                  row.id,
                ),
              );
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

  const actions = (
    <>
      <CreateButton
        className="btn-raised"
        onClick={() => {
          history.push(newPage(COST_RECEIPT_PATH));
        }}
        color="success"
      >
        <FormattedMessage {...messages.listPageBtnCreateReceipt} />
      </CreateButton>
      <CreateButton
        className="ml-2 btn-raised"
        color="danger"
        onClick={() => {
          history.push(newPage(COST_PAYMENT_PATH));
        }}
      >
        <FormattedMessage {...messages.listPageBtnCreatePayment} />
      </CreateButton>
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
            deleteApi={apiCost.remove}
            readApi={apiCost.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Cost ${item.name} Success`);
              }
            }}
            title="Delete Cost?"
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

  const search = { search: "", startDate: null, endDate: null };

  return (
    <ListWidget
      pageHeader={
        <PageTitle
          title={<FormattedMessage {...messages.header} />}
          actions={actions}
        />
      }
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={apiCost.search}
      initFilter={search}
      initPage={1}
      initSize={10}
      initSorts={{ createdDate: SORT_DIR.DESC }}
      mappingUrlData={convertQueryWithDate()}
    >
      <Filter />
    </ListWidget>
  );
};

ListPage.propTypes = {
  history: PropTypes.any,
};
export default ListPage;
