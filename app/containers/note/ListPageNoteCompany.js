import React, { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { PropTypes } from "prop-types"
import { API_STATE, useApi } from "../../libs/hooks/useApi"
import companyNoteApi from "../../libs/apis/note/companyNote.api"
import { useConfirmDialog } from "../../libs/hooks/useConfirmDialog"
import CreateButton from "../../components/button/CreateButton"
import PageTitle from "../Layout/PageTitle"
import Widget from "../../components/Widget/Widget"
import CreatedBy from "../../components/ListWidget/CreatedBy"
import NoteModalForm from "./components/NoteModalForm"

const ListPageNoteCompany = ({ companyId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [noteId, setNoteId] = useState(false)
  const { state, exec } = useApi(companyNoteApi.getListCompanyNote)
  const { confirmModal, openConfirm } = useConfirmDialog()

  const onClose = useCallback(
    (res) => {
      setIsOpen(false)
      console.log(res)
      exec(companyId)
    },
    [setIsOpen, exec, companyId],
  )

  const onDelete = useCallback(
    (item) => {
      openConfirm({
        title: "Are you sure to delete note ?",
        message: "This will remove note information",
        onClose: (res) => {
          if (res) {
            companyNoteApi.remove(item.id).then(
              () => {
                toast.success("Delete note success")
                exec(companyId)
              },
              () => {
                toast.error("Delete note Fail")
              },
            )
          }
        },
      })
    },
    [openConfirm, exec],
  )

  useEffect(() => {
    if (state.status === API_STATE.FAIL) {
      toast.error(state.errors.map((t) => t.message || t.code).join("\n"))
    }
  }, [state])

  const actions = (
    <>
      <CreateButton
        className="mr-2 btn-raised"
        onClick={() => {
          setIsOpen(true)
          setNoteId(null)
        }}
      >
        Tạo
      </CreateButton>
    </>
  )

  useEffect(() => {
    exec(companyId)
  }, [companyId])

  return (
    <>
      <PageTitle title="Note" actions={actions} />
      <Widget>
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th>Note</th>
              <th>Create On</th>
              <th className="min">Action</th>
            </tr>
          </thead>
          <tbody>
            {(state?.resp || []).map((t) => (
              <tr key={t.id}>
                <td>{t.note || ""}</td>
                <td>
                  <CreatedBy date={t.createdDate} user={t.createdBy} />
                </td>
                <td className="min">
                  <button
                    type="button"
                    className="btn btn-sm btn-info"
                    onClick={() => {
                      setIsOpen(true)
                      setNoteId(t.id)
                    }}
                  >
                    <i className="fa fa-edit" />
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(t)}
                  >
                    <i className="fa fa-trash" />{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isOpen && (
          <NoteModalForm isOpen companyId={companyId} closeHandle={onClose} noteId={noteId} />
        )}
        {confirmModal}
      </Widget>
    </>
  )
}

ListPageNoteCompany.propTypes = { companyId: PropTypes.any }

export default ListPageNoteCompany
