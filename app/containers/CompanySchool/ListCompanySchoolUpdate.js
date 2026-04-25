import React from "react"
import { useHistory } from "react-router-dom"
import { Button } from "reactstrap"
import { formatDate, formatDateOnly } from "../../libs/utils/date.util"
import ListWidget from "../../components/ListWidget"
import PageTitle from "../Layout/PageTitle"
import { CompanySchoolUpdateApi } from "../../libs/apis/company-school/company-school-update.api"
import FilterSchool from "./components/FilterSchool"
import TableActionColumns from "../../components/ListWidget/TableActionColumn"
import { IconView } from "../Icon/constants"
import { viewPage } from "../../libs/utils/crud.util"
import { PERMISSION } from "../../components/Acl/constants"
import Permission from "../../components/Acl/Permission"
import { COMPANY_SCHOOL_UPDATE_LIST } from "./constants"

export default function ListCompanySchoolUpdate() {
  const history = useHistory()
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        data: "name",
        render: (row) => <div>{row.company.name}</div>,
      },
      {
        header: "Name English",
        data: "englishName",
        render: (row) => <div>{row.company.englishName}</div>,
      },
      {
        header: "email",
        data: "email",
        render: (row) => <div>{row.company.email}</div>,
      },
      {
        header: "Name Owner",
        data: "fullNameOwner",
      },
      {
        header: "Name Manager",
        data: "fullNameManage",
      },
      {
        header: "Region",
        data: "region",
        render: (row) => <div>{row.region}</div>,
      },
      {
        header: "Established Date",
        data: "establishedDate",
        class: "min",
        render: (row) =>
          row.company.establishedDate
            ? formatDateOnly(new Date(row.company.establishedDate))
            : null,
      },
      {
        header: "Joined Date",
        data: "joinedDate",
        class: "min",
        render: (row) => (row.joinedDate ? formatDateOnly(new Date(row.joinedDate)) : null),
      },
      {
        header: "Size",
        data: "studentSize",
      },
      {
        header: "Level",
        data: "level",
      },
      {
        header: "Worker",
        data: "numberWorker",
      },
      {
        header: "Last Update",
        data: "lastUpdated",
        class: "min",
        render: (row) => formatDate(new Date(row.lastUpdated)),
      },
      {
        header: "Action",
        data: "",
        class: "action",
        render: (row) => (
          <TableActionColumns>
            <Permission permissions={[PERMISSION.COMPANY_SCHOOL.READ]}>
              <Button
                type="button"
                color="success"
                onClick={() => history.push(viewPage(COMPANY_SCHOOL_UPDATE_LIST, row.id))}
              >
                <IconView />
              </Button>
            </Permission>
          </TableActionColumns>
        ),
      },
    ],
    [],
  )

  return (
    <>
      <ListWidget
        pageHeader={<PageTitle title="List Info School" />}
        columns={columns}
        fetchData={CompanySchoolUpdateApi.search}
        initPage={1}
        initSize={10}
        enableSelectColumn={false}
      >
        <FilterSchool />
      </ListWidget>
    </>
  )
}
