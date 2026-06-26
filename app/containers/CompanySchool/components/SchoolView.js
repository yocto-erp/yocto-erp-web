import React from "react"
import PropTypes from "prop-types"
import { FormattedMessage } from "react-intl"
import commonCompanyMessages from "../../../components/common/company/messages"
import { formatDate, formatDateOnlyFromStr } from "../../../libs/utils/date.util"
import { hasText } from "../../../utils/util"

export const SchoolView = ({ school }) => (
  <table className="table table-borderless report">
    <tbody>
      <tr>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.schoolOwner} />
        </td>
        <td className="value">{school.fullNameOwner}</td>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.schoolManager} />
        </td>
        <td className="value">{school.fullNameManage}</td>
      </tr>
      <tr>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.schoolRegion} />
        </td>
        <td className="value">
          <ul className="list-inline">
            {school.region.map((t) => (
              <li key={t.value} className="list-inline-item badge">
                <span className="badge badge-info">{t.name}</span>
              </li>
            ))}
          </ul>
        </td>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.schoolLevel} />
        </td>
        <td className="value">
          <ul className="list-inline">
            {school.level.map((t) => (
              <li key={t.value} className="list-inline-item badge">
                <span className="badge badge-info">{t.name}</span>
              </li>
            ))}
          </ul>
        </td>
      </tr>
      <tr>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.schoolArea} />
        </td>
        <td className="value">{school.extraData?.buildingArea}</td>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.schoolPlaygroundArea} />
        </td>
        <td className="value">{school.extraData?.playgroundArea}</td>
      </tr>
      <tr>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.schoolTotalClass} />
        </td>
        <td className="value">{school.extraData.totalClass}</td>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.schoolCurrentClass} />
        </td>
        <td className="value">{school.extraData.schoolCurrentClass}</td>
      </tr>
      <tr>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.schoolTotalStudent} />
        </td>
        <td className="value">{school.extraData.schoolTotalStudent}</td>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.schoolStudentSize} />
        </td>
        <td className="value">{school.studentSize}</td>
      </tr>
      <tr>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.schoolJoinSWAN} />
        </td>
        <td colSpan="3" className="value">
          {formatDateOnlyFromStr(school.joinedDate)}
        </td>
      </tr>
      <tr>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.staff} />
        </td>
        <td colSpan="3" className="value">
          {hasText(school.numberWorker) && (
            <div className="form-group">
              <textarea
                readOnly
                rows={4}
                value={school.numberWorker}
                className="form-control"
                style={{ resize: "none" }}
              />
            </div>
          )}
        </td>
      </tr>
      <tr>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.typeOrganization} />
        </td>
        <td colSpan="3" className="value">
          {hasText(school.typeOrganization) && (
            <div className="form-group">
              <textarea
                readOnly
                rows={4}
                value={school.typeOrganization}
                className="form-control"
                style={{ resize: "none" }}
              />
            </div>
          )}
        </td>
      </tr>
      <tr>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.structureOrganization} />
        </td>
        <td colSpan="3" className="value">
          {hasText(school.legalStructure) && (
            <div className="form-group">
              <textarea
                readOnly
                rows={4}
                className="form-control"
                style={{ resize: "none" }}
                value={school.legalStructure}
              />
            </div>
          )}
        </td>
      </tr>
      <tr>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.classesDetail} />
        </td>
        <td colSpan="3" className="value">
          {hasText(school.infoClass) && (
            <div className="form-group">
              <textarea
                readOnly
                rows={4}
                className="form-control"
                style={{ resize: "none" }}
                value={school.infoClass}
              />
            </div>
          )}
        </td>
      </tr>
      <tr>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.teachingMethod} />
        </td>
        <td colSpan="3" className="value">
          {hasText(school.organizationalStructure) && (
            <div className="form-group">
              <textarea
                readOnly
                rows={4}
                className="form-control"
                style={{ resize: "none" }}
                value={school.organizationalStructure}
              />
            </div>
          )}
        </td>
      </tr>
      <tr>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.certificate} />
        </td>
        <td colSpan="3" className="value">
          {hasText(school.methodTeacher) && (
            <div className="form-group">
              <textarea
                readOnly
                rows={4}
                className="form-control"
                style={{ resize: "none" }}
                value={school.methodTeacher}
              />
            </div>
          )}
        </td>
      </tr>
      <tr>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.mentor} />
        </td>
        <td colSpan="3" className="value">
          {hasText(school.methodSchool) && (
            <div className="form-group">
              <textarea
                readOnly
                rows={4}
                className="form-control"
                style={{ resize: "none" }}
                value={school.methodSchool}
              />
            </div>
          )}
        </td>
      </tr>
      <tr>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.lastYearSummary} />
        </td>
        <td colSpan="3">
          {hasText(school.descriptionLastYear) && (
            <div className="form-group">
              <textarea
                readOnly
                rows={4}
                className="form-control"
                style={{ resize: "none" }}
                value={school.descriptionLastYear}
              />
            </div>
          )}
        </td>
      </tr>
      <tr>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.nextYearSummary} />
        </td>
        <td colSpan="3" className="value">
          {hasText(school.demandThisYear) && (
            <div className="form-group">
              <textarea
                readOnly
                rows={4}
                className="form-control"
                style={{ resize: "none" }}
                value={school.demandThisYear}
              />
            </div>
          )}
        </td>
      </tr>
      <tr>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.suggestion} />
        </td>
        <td colSpan="3" className="value">
          {hasText(school.suggestion) && (
            <div className="form-group">
              <textarea
                readOnly
                rows={4}
                className="form-control"
                style={{ resize: "none" }}
                value={school.suggestion}
              />
            </div>
          )}
        </td>
      </tr>
      <tr>
        <td className="key">
          <FormattedMessage {...commonCompanyMessages.lastUpdated} />
        </td>
        <td colSpan="3" className="value">
          {formatDate(new Date(school.lastUpdated))}
        </td>
      </tr>
    </tbody>
  </table>
)

SchoolView.propTypes = {
  school: PropTypes.object.isRequired,
}
