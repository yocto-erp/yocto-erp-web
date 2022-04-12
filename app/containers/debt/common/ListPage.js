import React from "react";
import { PropTypes } from "prop-types";
import { FormattedMessage } from "react-intl";
import Filter from "./Filter";
import TableActionColumns from "../../../components/ListWidget/TableActionColumn";
import PageTitle from "../../Layout/PageTitle";
import { DEBT_LIST_ROOT_PATH } from "../constants";
import ListWidget from "../../../components/ListWidget";
import { SORT_DIR } from "../../../components/ListWidget/constants";
import messages from "../messages";
import SubjectView from "../../partner/subject/components/SubjectView";
import debtCommonApi from "../../../libs/apis/debt/debt-common.api";
import Price from "../../../components/common/Price";

const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: "Đối tác",
        data: "type",
        render: row => (
          <FormattedMessage {...messages[`listPageType${row.subject.type}`]} />
        ),
      },
      {
        header: "Đối tác",
        data: "info",
        render: row => <SubjectView item={row.subject} isShowTagging />,
      },
      {
        header: "Số tiền phải thu",
        data: "debit",
        class: "min",
        render: row => <Price amount={row?.debit} />,
      },
      {
        header: "Số tiền phải trả",
        data: "credit",
        class: "min",
        render: row => <Price amount={row?.credit} />,
      },
      {
        header: "Action",
        data: "",
        class: "action",
        render: () => (
          <TableActionColumns
            onView={() => {
              history.push(DEBT_LIST_ROOT_PATH);
            }}
          />
        ),
      },
    ],
    [],
  );

  const search = { search: "" };

  return (
    <ListWidget
      pageHeader={
        <PageTitle
          title={<FormattedMessage {...messages.listPageCommonHeader} />}
        />
      }
      columns={columns}
      fetchData={debtCommonApi.search}
      initFilter={search}
      initPage={1}
      initSize={10}
      initSorts={{ subjectId: SORT_DIR.DESC }}
    >
      <Filter />
    </ListWidget>
  );
};

ListPage.propTypes = {
  history: PropTypes.any,
};
export default ListPage;
