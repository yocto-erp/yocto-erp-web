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
import { SchoolRegion } from "./components/SchoolRegion"
import { SchoolLevel } from "./components/SchoolLevel"

export default function ListCompanySchoolUpdate() {
  const history = useHistory()
  const columns = React.useMemo(
    () => [
      {
        header: "Thông tin chung",
        data: "name",
        width: "150px",
        render: (row) => (
          <span>
            Name: <strong>{row.company.name}</strong>
            <br />
            English: <strong>{row.company.englishName}</strong>
            {row.company.email && (
              <>
                <br />
                Email: <strong>{row.company.email}</strong>
              </>
            )}
          </span>
        ),
      },
      {
        header: <span>Quản lý</span>,
        data: "fullNameOwner",
        class: "min",
        render: (row) => (
          <span>
            Chủ trường: <strong>{row.school.fullNameOwner}</strong>
            <br />
            Quản lý: <strong>{row.school.fullNameManage}</strong>
          </span>
        ),
      },
      {
        header: "Region",
        data: "region",
        render: (row) => <SchoolRegion region={row.school.region} />,
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
        render: (row) =>
          row.school.joinedDate ? formatDateOnly(new Date(row.school.joinedDate)) : null,
      },
      {
        header: "Size",
        data: "studentSize",
        render: (row) => row.school.studentSize,
      },
      {
        header: "Level",
        data: "level",
        render: (row) => <SchoolLevel level={row.school.level} />,
      },
      {
        header: "Last Update",
        data: "lastUpdated",
        class: "min",
        render: (row) => formatDate(new Date(row.school.lastUpdated)),
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
                onClick={() => history.push(viewPage(COMPANY_SCHOOL_UPDATE_LIST, row.school.id))}
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
        pageHeader={<PageTitle title="Danh sách các trường" />}
        columns={columns}
        fetchData={CompanySchoolUpdateApi.search}
        initPage={1}
        initSize={10}
      >
        <FilterSchool />
      </ListWidget>
    </>
  )
}
