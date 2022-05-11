import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
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
} from "../../libs/utils/crud.util";
import CreateButton from "../../components/button/CreateButton";
import DeleteConfirmModal from "../../components/modal/DeleteConfirmModal";
import ListWidget from "../../components/ListWidget";
import messages from "./messages";
import SubjectView from "../partner/subject/components/SubjectView";
import Tags from "../../components/Form/tagging/ViewTags";
import { providerApi } from "../../libs/apis/provider/provider.api";

const ROOT_PATH = PROVIDER_ROOT_PATH;
const ListPage = ({ history, intl }) => {
  const columns = React.useMemo(
    () => [
      {
        header: (
          <strong>
            <FormattedMessage {...messages.listPageColName} />
          </strong>
        ),
        data: "name",
        render: row => (
          <>
            <p className="mb-0">{row.name}</p>
            <Tags item={row.tagging} />{" "}
          </>
        ),
      },
      {
        header: (
          <strong>
            <FormattedMessage {...messages.listPageColSubject} />
          </strong>
        ),
        data: "subject",
        class: "min-width",
        render: row => <SubjectView item={row.subject} />,
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
