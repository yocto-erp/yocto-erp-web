import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Widget from "../../components/Widget/Widget"
import { CompanySchoolUpdateApi } from "../../libs/apis/company-school/company-school-update.api"
import PageTitle from "../Layout/PageTitle"
import { formatDate, formatDateOnlyFromStr } from "../../libs/utils/date.util"
import ListPageNoteCompany from "../note/ListPageNoteCompany"
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
      <div className="row">
        <div className="col-md-7">
          <PageTitle title={<>School {schoolUpdate?.company?.name}</>} />
          {schoolUpdate ? (
            <Widget>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>
                      <strong>Name</strong>
                    </td>
                    <td>{schoolUpdate?.company?.name}</td>
                    <td>
                      <strong>Name English</strong>
                    </td>
                    <td>{schoolUpdate?.company?.englishName}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Name Owner</strong>
                    </td>
                    <td>{schoolUpdate.fullNameOwner}</td>
                    <td>
                      {" "}
                      <strong>Name Manage</strong>{" "}
                    </td>
                    <td>{schoolUpdate.fullNameManage}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Region</strong>
                    </td>
                    <td>{schoolUpdate.region}</td>
                    <td>
                      {" "}
                      <strong>Level</strong>
                    </td>
                    <td>{schoolUpdate.level}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Student Size</strong>
                    </td>
                    <td>{schoolUpdate.studentSize}</td>
                    <td>
                      {" "}
                      <strong>Joined Date</strong>
                    </td>
                    <td>{formatDateOnlyFromStr(schoolUpdate.joinedDate)}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Staff</strong>
                    </td>
                    <td colSpan="3">{schoolUpdate.numberWorker}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Organization:</strong>
                    </td>
                    <td colSpan="3">{schoolUpdate.typeOrganization}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Legal</strong>
                    </td>
                    <td colSpan="3">{schoolUpdate.legalStructure}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Class Information</strong>
                    </td>
                    <td colSpan="3">{schoolUpdate.infoClass}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Structure</strong>
                    </td>
                    <td colSpan="3">{schoolUpdate.organizationalStructure}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Courses/Training</strong>
                    </td>
                    <td colSpan="3">{schoolUpdate.methodTeacher}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Mentoring</strong>
                    </td>
                    <td colSpan="3">{schoolUpdate.methodSchool}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Demand This Year</strong>
                    </td>
                    <td colSpan="3">{schoolUpdate.demandThisYear}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Description Last Year</strong>
                    </td>
                    <td colSpan="3">{schoolUpdate.descriptionLastYear}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Suggestion</strong>
                    </td>
                    <td colSpan="3">{schoolUpdate.suggestion}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Last Updated</strong>
                    </td>
                    <td colSpan="3">{formatDate(new Date(schoolUpdate.lastUpdated))}</td>
                  </tr>
                </tbody>
              </table>
            </Widget>
          ) : (
            <Widget>
              <div className="text-center">No Data</div>{" "}
            </Widget>
          )}
        </div>
        <div className="col-md-5">
          <ListPageNoteCompany companyId={schoolUpdate?.companyId} />
        </div>
      </div>
    </>
  )
}

CompanySchoolDetail.propTypes = {}

export default CompanySchoolDetail
