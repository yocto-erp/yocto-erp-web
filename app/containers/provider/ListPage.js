import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import { FaEye, FaSignature } from "react-icons/fa";
import { Button } from "reactstrap";
import CreatedBy from "../../components/ListWidget/CreatedBy";
import TableActionColumns from "../../components/ListWidget/TableActionColumn";
import { PROVIDER_ROOT_PATH } from "./constants";
import Filter from "./components/Filter";
import PageTitle from "../Layout/PageTitle";
import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
  viewPage,
} from "../../libs/utils/crud.util";
import CreateButton from "../../components/button/CreateButton";
import DeleteConfirmModal from "../../components/modal/DeleteConfirmModal";
import ListWidget from "../../components/ListWidget";
import messages from "./messages";
import SubjectView from "../partner/subject/components/SubjectView";
import { providerApi } from "../../libs/apis/provider/provider.api";
import UserView from "../../components/ListWidget/UserView";
import { formatDate, formatDateOnlyFromStr } from "../../libs/utils/date.util";
import ProviderStatus from "./components/ProviderStatus";
import { hasText } from "../../utils/util";
import Permission from "../../components/Acl/Permission";
import { PERMISSION } from "../../constants";

const ROOT_PATH = PROVIDER_ROOT_PATH;
const ListPage = ({ history, intl }) => {
  const columns = React.useMemo(
    () => [
      {
        header: (
          <strong>
            <FormattedMessage {...messages.listPageColSubject} />
          </strong>
        ),
        data: "subject",
        class: "min-width",
        render: row => (
          <SubjectView item={row.subject} isShowTagging isShowAddress />
        ),
      },
      {
        header: (
          <strong>
            <FormattedMessage {...messages.listPageColStatus} />
          </strong>
        ),
        data: "status",
        class: "min-width text-center",
        render: row => <ProviderStatus status={row.status} />,
      },
      {
        header: (
          <strong>
            <FormattedMessage {...messages.listPageColTerm} />
          </strong>
        ),
        data: "term",
        class: "min-width text-center",
        render: row => (
          <>
            {formatDateOnlyFromStr(row.contractStartDate)}
            {hasText(row.contractEndDate)
              ? ` - ${formatDateOnlyFromStr(row.contractEndDate)}`
              : ""}
          </>
        ),
      },
      {
        header: (
          <strong>
            <FormattedMessage {...messages.listPageColRemark} />
          </strong>
        ),
        data: "remark",
      },
      {
        header: (
          <strong>
            <FormattedMessage {...messages.listPageColApprove} />
          </strong>
        ),
        data: "approve",
        class: "min-width",
        render: row =>
          row.isApproved && (
            <>
              <UserView user={row.approvedBy} />
              <span className="text-nowrap">
                <i className="fi flaticon-time" />{" "}
                {formatDate(new Date(row.approvedDate))}
              </span>
            </>
          ),
      },
      {
        header: "Created By",
        data: "createdBy",
        class: "min-width",
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
              history.push(editPage(ROOT_PATH, row.id));
            }}
            onDelete={() => {
              history.push(deletePage(ROOT_PATH, row.id));
            }}
          >
            <Permission permissions={[PERMISSION.PROVIDER.APPROVE]}>
              <Button
                type="button"
                color="primary"
                onClick={() => console.log("Press")}
              >
                <FaSignature />
              </Button>
              <Button
                type="button"
                color="success"
                onClick={() => history.push(viewPage(ROOT_PATH, row.id))}
              >
                <FaEye />
              </Button>
            </Permission>
          </TableActionColumns>
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
            deleteApi={providerApi.remove}
            readApi={providerApi.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(
                  intl.formatMessage(messages.deleteSuccessMessage, {
                    name: item.name,
                  }),
                );
              }
            }}
            title={<FormattedMessage {...messages.deleteConfirmTitle} />}
            message={row => {
              if (!row) return "";
              return intl.formatMessage(messages.deleteConfirmMessage, {
                name: row.name,
              });
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
          title={<FormattedMessage {...messages.listPageTitle} />}
          actions={action}
        />
      }
      deleteDialog={deleteConfirmDialog}
      columns={columns}
      fetchData={providerApi.search}
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
  intl: intlShape.isRequired,
};

export default injectIntl(ListPage);
