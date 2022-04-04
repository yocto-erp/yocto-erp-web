import React from "react";
import PropTypes from "prop-types";
import { Button, UncontrolledPopover } from "reactstrap";
import classNames from "classnames";
import { hasText } from "../../../../utils/util";
import { GENDER } from "../../../../libs/apis/person.api";
import "./PersonView.scss";

const PersonView = ({ item, title = "Thông tin chi tiết" }) => {
  if (!item) return null;
  return (
    <>
      <Button
        type="button"
        color="link"
        id={`contactPerson${item.id}`}
        className="contact-person text-decoration-none"
      >
        <i
          className={classNames("fa fa-fw", {
            "fa-female": item.sex === GENDER.FEMALE,
            "fa-male": item.sex === GENDER.MALE,
            "fa-user": !item.sex,
          })}
        />
        &nbsp;
        {item.fullName || `${item.firstName} ${item.lastName}`}{" "}
      </Button>
      <UncontrolledPopover
        target={`contactPerson${item.id}`}
        placement="top"
        trigger="focus"
      >
        <div className="text-left text-dark p-2 contact-person-popup">
          <p className="text-center font-weight-bold text-primary mb-0">
            {title}
          </p>
          <hr />
          <strong>
            {item.fullName || `${item.firstName} ${item.lastName}`}{" "}
          </strong>
          <br />
          {hasText(item.gsm) ? (
            <>
              <span>
                <i className="fa fa-phone fa-fw" />
                &nbsp;{item.gsm}{" "}
              </span>
              <br />
            </>
          ) : null}
          {hasText(item.email) ? (
            <>
              <span>
                <i className="fa fa-envelope fa-fw" />
                &nbsp;{item.email}{" "}
              </span>
              <br />
            </>
          ) : null}
        </div>
      </UncontrolledPopover>
    </>
  );
};

PersonView.propTypes = {
  item: PropTypes.object,
  title: PropTypes.string,
};

export default PersonView;
