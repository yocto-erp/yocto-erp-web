import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Button } from "reactstrap"
import { toast } from "react-toastify"
import { API_STATE, useApi } from "../../libs/hooks/useApi"
import { download } from "../../libs/apis/fetch"

const DownloadButton = ({ link, fileName, ...props }) => {
  const { state, exec } = useApi(() => download(link(), fileName()))

  useEffect(() => {
    const { errors } = state
    if (state.status === API_STATE.FAIL) {
      if (errors && errors.length) {
        toast.error(errors.map((t) => t.message).join("\n"))
      }
    }
  }, [state])

  return (
    <Button
      color="info"
      type="button"
      onClick={() => exec()}
      disabled={props.disabled || state.isLoading}
      {...props}
    >
      {!state.isLoading ? props.children : <i className="fa fa-spin fa-spinner" />}
    </Button>
  )
}

DownloadButton.propTypes = {
  link: PropTypes.func,
  fileName: PropTypes.func,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
}

export default DownloadButton
