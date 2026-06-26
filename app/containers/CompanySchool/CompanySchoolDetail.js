import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Widget from "../../components/Widget/Widget"
import { CompanySchoolUpdateApi } from "../../libs/apis/company-school/company-school-update.api"
import PageTitle from "../Layout/PageTitle"
import ListPageNoteCompany from "../note/ListPageNoteCompany"
import { SchoolView } from "./components/SchoolView"
import BackButton from "../../components/button/BackButton"

const CompanySchoolDetail = () => {
  const { id } = useParams()
  const [schoolUpdate, setSchoolUpdate] = useState(null)
  useEffect(() => {
    CompanySchoolUpdateApi.getCompanySchoolUpdateById(id).then((t) => {
      setSchoolUpdate(t)
    })
  }, [])

  return (
    <>
      <PageTitle
        title={<>Thông tin trường {schoolUpdate?.company?.name}</>}
        actions={<BackButton />}
      />
      <div className="row">
        <div className="col-md-7">
          <Widget>
            {schoolUpdate ? (
              <SchoolView school={schoolUpdate} />
            ) : (
              <div className="text-center">No Data</div>
            )}
          </Widget>
        </div>
        <div className="col-md-5">
          {schoolUpdate?.companyId && <ListPageNoteCompany companyId={schoolUpdate.companyId} />}
        </div>
      </div>
    </>
  )
}

CompanySchoolDetail.propTypes = {}

export default CompanySchoolDetail
