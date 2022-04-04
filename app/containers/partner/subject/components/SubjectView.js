import React from "react";
import PropTypes from "prop-types";
import { Button, UncontrolledPopover } from "reactstrap";
import { mappingSubject } from "../constants";
import { hasText } from "../../../../utils/util";
import Tags from "../../../../components/Form/tagging/ViewTags";

import "./SubjectView.scss";

const SubjectView = ({ item, isShowTagging = true }) => {
  const rs = mappingSubject(item);
  return (
    <div>
      <strong>{rs.name}</strong>
      <br />
      {hasText(rs.gsm) ? (
        <>
          <span>
            <i className="fa fa-phone fa-fw" />
            &nbsp;{rs.gsm}{" "}
          </span>
          <br />
        </>
      ) : null}
      {hasText(rs.email) ? (
        <>
          <span>
            <i className="fa fa-envelope fa-fw" />
            &nbsp;{rs.email}{" "}
          </span>
          <br />
        </>
      ) : null}
      {hasText(rs.address) ? (
        <>
          <span>
            <i className="fa fa-map-marker fa-fw" />
            &nbsp;{rs.address}{" "}
          </span>
          <br />
        </>
      ) : null}
      {rs.person ? (
        <>
          <Button
            type="button"
            color="link"
            id={`contactPerson${rs.person.id}`}
            className="contact-person"
          >
            <i className="fa fa-user-o fa-fw" />
            &nbsp;
            {rs.person.fullName ||
              `${rs.person.firstName} ${rs.person.lastName}`}{" "}
          </Button>
          <UncontrolledPopover
            target={`contactPerson${rs.person.id}`}
            placement="top"
            trigger="focus"
          >
            <div className="text-left text-dark p-2 contact-person-popup">
              <p className="text-center font-weight-bold text-primary mb-0">
                Thông tin người liên hệ
              </p>
              <hr />
              <strong>
                {rs.person.fullName ||
                  `${rs.person.firstName} ${rs.person.lastName}`}{" "}
              </strong>
              <br />
              {hasText(rs.person.gsm) ? (
                <>
                  <span>
                    <i className="fa fa-phone fa-fw" />
                    &nbsp;{rs.person.gsm}{" "}
                  </span>
                  <br />
                </>
              ) : null}
              {hasText(rs.person.email) ? (
                <>
                  <span>
                    <i className="fa fa-envelope fa-fw" />
                    &nbsp;{rs.person.email}{" "}
                  </span>
                  <br />
                </>
              ) : null}
            </div>
          </UncontrolledPopover>
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
};

export default SubjectView;
