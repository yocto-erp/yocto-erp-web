import React, { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { PropTypes } from "prop-types"
import { API_STATE, useApi } from "../../libs/hooks/useApi"
import companyNoteApi from "../../libs/apis/note/companyNote.api"
import { useConfirmDialog } from "../../libs/hooks/useConfirmDialog"
import CreateButton from "../../components/button/CreateButton"
import PageTitle from "../Layout/PageTitle"
import "./NoteCompany.scss"
import NoteModalForm from "./components/NoteModalForm"
import TextIconButton from "../../components/button/TextIconButton"
import AssetListView from "../../components/assets/AssetListView/AssetListView"
import { formatDate } from "../../libs/utils/date.util"

const ListPageNoteCompany = ({ companyId }) => {
  const [visibleCount, setVisibleCount] = useState(3)
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

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3)
  }

  return (
    <>
      <PageTitle title="" actions={actions} />
      {(state?.resp || []).slice(0, visibleCount).map((t) => (
        <div className="card mt-2" key={t.id}>
          <div className="card-header display-flex justify-content-between">
            <div>{t.title}</div>
            <div>
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
              <button type="button" className="btn btn-sm btn-danger" onClick={() => onDelete(t)}>
                <i className="fa fa-trash" />{" "}
              </button>
            </div>
          </div>
          <div className="card-body">{t.note || ""}</div>
          <div className="card-footer display-flex justify-content-between">
            <div>
              <div className="size-10">{t.createdBy.displayName || t.createdBy.email}</div>
              <div className="size-10">{formatDate(new Date(t.createdDate))}</div>
            </div>
            <div className="display-flex justify-content-between">
              <AssetListView list={t?.assets} type="normal" />
            </div>
          </div>
        </div>
      ))}
      <div className="mt-2">
        <div className="text-center mt-4">
          {visibleCount < (state?.resp || []).length && (
            <div className="text-center mt-4">
              <TextIconButton onClick={loadMore}>Load More</TextIconButton>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <NoteModalForm isOpen companyId={companyId} closeHandle={onClose} noteId={noteId} />
      )}
      {confirmModal}
    </>
  )
}

ListPageNoteCompany.propTypes = { companyId: PropTypes.any }

export default ListPageNoteCompany
