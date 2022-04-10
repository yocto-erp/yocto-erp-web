import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { mappingSubject, SUBJECT_TYPE } from "../constants";
import { hasText } from "../../../../utils/util";
import Tags from "../../../../components/Form/tagging/ViewTags";
import "./SubjectView.scss";
import PersonView from "../../person/components/PersonView";

const SubjectView = ({ item, isShowTagging = true, isShowAddress = false }) => {
  if (!item) return null;
  const rs = mappingSubject(item);
  return (
    <div>
      <strong>
        <i
          className={classnames("fa fa-fw", {
            "fa-user-o": Number(item.type) === SUBJECT_TYPE.PERSONAL,
            "fa-building-o": Number(item.type) === SUBJECT_TYPE.COMPANY,
          })}
        />{" "}
        {rs.name}
      </strong>
      <br />
      {hasText(rs.gsm) ? (
        <>
          <span className="text-nowrap">
            <i className="fa fa-phone fa-fw" />
            &nbsp;{rs.gsm}{" "}
          </span>
          <br />
        </>
      ) : null}
      {hasText(rs.email) ? (
        <>
          <span className="text-nowrap">
            <i className="fa fa-envelope fa-fw" />
            &nbsp;{rs.email}{" "}
          </span>
          <br />
        </>
      ) : null}
      {hasText(rs.address) && isShowAddress ? (
        <>
          <span className="text-nowrap">
            <i className="fa fa-map-marker fa-fw" />
            &nbsp;{rs.address}{" "}
          </span>
          <br />
        </>
      ) : null}
      {rs.person ? (
        <>
          <PersonView item={rs.person} title="Thông tin người liên hệ" />
          <br />
        </>
      ) : null}
      {isShowTagging ? <Tags item={rs.tagging} /> : null}
    </div>
  );
};

SubjectView.propTypes = {
  item: PropTypes.object,
  isShowTagging: PropTypes.bool,
  isShowAddress: PropTypes.bool,
};

export default SubjectView;
