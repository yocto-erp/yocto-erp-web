import React from "react";
import { PropTypes } from "prop-types";
import Filter from "./Filter";
import TableActionColumns from "../../../components/ListWidget/TableActionColumn";
import { DEBT_LIST_ROOT_PATH } from "../constants";
import ListWidget from "../../../components/ListWidget";
import { SORT_DIR } from "../../../components/ListWidget/constants";
import SubjectView from "../../partner/subject/components/SubjectView";
import debtCommonApi from "../../../libs/apis/debt/debt-common.api";
import Price from "../../../components/common/Price";
import { objectToQueryString } from "../../../libs/utils/query.util";
import { mappingOptionSubject } from "../../partner/subject/constants";
import { distanceFromNow } from "../../../libs/utils/date.util";

const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
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
        header: "Cập nhập vào",
        data: "lastModifiedDate",
        class: "min",
        sort: {
          name: "lastModifiedDate",
        },
        render: row => (
          <>
            <i className="fi flaticon-time" />{" "}
            {distanceFromNow(new Date(row.lastModifiedDate))}
          </>
        ),
      },
      {
        header: "Action",
        data: "",
        class: "action",
        render: row => (
          <TableActionColumns
            onView={() => {
              history.push(
                `${DEBT_LIST_ROOT_PATH}?${objectToQueryString({
                  subject: mappingOptionSubject(row.subject),
                })}`,
              );
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
      widgetClassname="mb-0"
      columns={columns}
      fetchData={debtCommonApi.search}
      initFilter={search}
      initPage={1}
      initSize={10}
      isWidgetWrapper={false}
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
