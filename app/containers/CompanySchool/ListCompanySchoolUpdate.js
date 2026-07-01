import React from "react"
import { useHistory } from "react-router-dom"
import { Button } from "reactstrap"
import { formatDate, formatDateOnly } from "../../libs/utils/date.util"
import ListWidget from "../../components/ListWidget"
import PageTitle from "../Layout/PageTitle"
import { CompanySchoolUpdateApi } from "../../libs/apis/company-school/company-school-update.api"
import FilterSchool from "./components/FilterSchool"
import TableActionColumns from "../../components/ListWidget/TableActionColumn"
import { IconPrint } from "../Icon/constants"
import { viewPage } from "../../libs/utils/crud.util"
import { COMPANY_SCHOOL_UPDATE_LIST } from "./constants"
import { SchoolRegion } from "./components/SchoolRegion"
import { SchoolLevel } from "./components/SchoolLevel"
import ModalSchoolPrint from "./components/ModalSchoolPrint"
import { SelectTemplate } from "../template/SelectTemplate"

export default function ListCompanySchoolUpdate() {
  const history = useHistory()
  const [printId, setPrintId] = React.useState(null)
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
        header: "Vùng",
        data: "region",
        render: (row) => <SchoolRegion region={row.school.region} />,
      },
      {
        header: "Ngày thành lập",
        data: "establishedDate",
        class: "min",
        render: (row) =>
          row.company.establishedDate
            ? formatDateOnly(new Date(row.company.establishedDate))
            : null,
      },
      {
        header: "Ngày tham gia SWAN",
        data: "joinedDate",
        class: "min",
        render: (row) =>
          row.school.joinedDate ? formatDateOnly(new Date(row.school.joinedDate)) : null,
      },
      {
        header: "Số học sinh",
        data: "studentSize",
        render: (row) => row.school.studentSize,
      },
      {
        header: "Khối lớp",
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
          <TableActionColumns
            onView={() => history.push(viewPage(COMPANY_SCHOOL_UPDATE_LIST, row.school.id))}
            buttons={[
              <Button
                key="school-print"
                type="button"
                color="success"
                onClick={() => setPrintId(row)}
              >
                <IconPrint />
              </Button>,
            ]}
          />
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
        enableSelectColumn
      >
        <FilterSchool />
      </ListWidget>
      <ModalSchoolPrint
        schoolUpdate={printId}
        isOpen={printId != null}
        onClose={() => setPrintId(null)}
      />
      <SelectTemplate />
    </>
  )
}
