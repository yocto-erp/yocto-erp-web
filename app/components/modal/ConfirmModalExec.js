import React from "react"
import PropTypes from "prop-types"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import ModalOKButton from "../button/ModalOKButton"
import ModalCancelButton from "../button/ModalCancelButton"
import { API_STATE, useApi } from "../../libs/hooks/useApi"

const ConfirmModalExec = ({
  children,
  title,
  onClose,
  isOpen = false,
  type = "warning",
  onConfirm,
}) => {
  const { state, exec } = useApi(onConfirm)
  return (
    <Modal className={type} isOpen={isOpen} fade={false}>
      <ModalHeader toggle={() => onClose(false)}>{title || "Confirmation ?"}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <ModalCancelButton onClick={() => onClose(false)} />
        <ModalOKButton
          color={type}
          onClick={() => exec()}
          isLoading={state.status === API_STATE.LOADING}
        >
          <i className="fa fa-check fa-fw mr-2" /> Confirm
        </ModalOKButton>
      </ModalFooter>
    </Modal>
  )
}

ConfirmModalExec.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.node,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  isOpen: PropTypes.bool,
  type: PropTypes.oneOf(["warning", "danger"]),
}

export default ConfirmModalExec
