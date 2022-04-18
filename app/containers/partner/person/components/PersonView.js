import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import classNames from "classnames";
import { hasText } from "../../../../utils/util";
import { GENDER } from "../../../../libs/apis/person.api";
import "./PersonView.scss";
import SubmitButton from "../../../../components/button/SubmitButton";

const PersonView = ({ item, title = "Thông tin chi tiết" }) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!item) return null;

  return (
    <>
      <Button
        type="button"
        color="link"
        onClick={() => setIsOpen(true)}
        className="contact-person text-decoration-none text-warning"
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
      <Modal
        isOpen={isOpen}
        className="primary"
        fade={false}
        backdrop
        toggle={() => setIsOpen(false)}
      >
        <Form noValidate formNoValidate>
          <ModalHeader toggle={() => setIsOpen(false)}>{title}</ModalHeader>
          <ModalBody>
            <div className="text-left p-2 contact-person-popup">
              <strong className="h4">
                {item.fullName || `${item.firstName} ${item.lastName}`}{" "}
              </strong>
              <br />
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
          </ModalBody>
          <ModalFooter>
            <SubmitButton type="button" onClick={() => setIsOpen(false)}>
              Close
            </SubmitButton>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

PersonView.propTypes = {
  item: PropTypes.object,
  title: PropTypes.string,
};

export default PersonView;
