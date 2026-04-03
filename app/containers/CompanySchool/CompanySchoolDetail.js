import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Widget from "../../components/Widget/Widget"
import BackButton from "../../components/button/BackButton"
import { CompanySchoolUpdateApi } from "../../libs/apis/company-school/company-school-update.api"
import PageTitle from "../Layout/PageTitle"
import DateView from "../../components/common/date/DateView"
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
        className=""
        colLeft={9}
        colRight={3}
        actions={
          <>
            <BackButton className="mr-2" />
          </>
        }
        title="Info School"
      />
      {schoolUpdate ? (
        <Widget>
          <div className="row">
            <div className="col-md-6">
              <strong>LastUpdated:</strong> <DateView date={schoolUpdate.lastUpdated} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <strong>Name Owner:</strong> {schoolUpdate.fullNameOwner}
            </div>
            <div className="col-md-6">
              <strong>Name Manage:</strong> {schoolUpdate.fullNameManage}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <strong>Region:</strong> {schoolUpdate.region}
            </div>
            <div className="col-md-6">
              <strong>Level:</strong> {schoolUpdate.level}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <strong>Student Size:</strong> {schoolUpdate.studentSize}
            </div>
            <div className="col-md-6">
              <strong>Joined Date:</strong> <DateView date={schoolUpdate.joinedDate} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <strong>Staff:</strong> {schoolUpdate.numberWorker}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <strong>Type Organization:</strong> {schoolUpdate.typeOrganization}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <strong>Legal Structure:</strong> {schoolUpdate.legalStructure}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <strong>Info Class:</strong> {schoolUpdate.infoClass}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <strong>Organizational Structure:</strong> {schoolUpdate.organizationalStructure}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <strong>Courses/Training:</strong> {schoolUpdate.methodTeacher}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <strong>Mentoring:</strong> {schoolUpdate.methodSchool}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <strong>Demand This Year:</strong> {schoolUpdate.demandThisYear}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <strong>Description Last Year:</strong> {schoolUpdate.descriptionLastYear}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">Suggestion: {schoolUpdate.suggestion}</div>
          </div>
        </Widget>
      ) : (
        <Widget>
          <div className="text-center">No Data</div>{" "}
        </Widget>
      )}
    </>
  )
}

CompanySchoolDetail.propTypes = {}

export default CompanySchoolDetail
