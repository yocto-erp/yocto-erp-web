import React, { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { PropTypes } from "prop-types"
import { API_STATE, useApi } from "../../libs/hooks/useApi"
import companyNoteApi from "../../libs/apis/note/companyNote.api"
import { useConfirmDialog } from "../../libs/hooks/useConfirmDialog"
import CreateButton from "../../components/button/CreateButton"
import "./ListPageNoteCompany.scss"
import NoteModalForm from "./components/NoteModalForm"
import TextIconButton from "../../components/button/TextIconButton"
import AssetListView from "../../components/assets/AssetListView/AssetListView"
import { formatDate } from "../../libs/utils/date.util"
import RawHtml from "../../components/RawHtml"

const ListPageNoteCompany = ({ companyId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [noteId, setNoteId] = useState(false)
  const [notes, setNotes] = useState([])
  const [filter, setFilter] = useState({
    page: 1,
    size: 2,
    filter: {
      companyId,
    },
  })
  const { state, exec } = useApi(companyNoteApi.search)
  const { confirmModal, openConfirm } = useConfirmDialog()

  const onClose = useCallback(
    (res) => {
      setIsOpen(false)
      console.log(res)
      initLoad(companyId)
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
    if (state.status === API_STATE.SUCCESS) {
      setNotes((prev) => [...prev, ...state.resp.rows])
    }
  }, [state])

  const loadMore = () => {
    const nextPageFilter = {
      ...filter,
      page: filter.page + 1,
    }
    setFilter(nextPageFilter)
    exec(nextPageFilter)
  }

  const initLoad = (_companyId) => {
    if (_companyId) {
      setNotes([])
      const initFilter = {
        page: 1,
        size: 2,
        filter: {
          companyId: _companyId,
        },
      }
      setFilter(initFilter)
      exec(initFilter)
    }
  }

  useEffect(() => {
    initLoad(companyId)
  }, [companyId])

  return (
    <div className="note-company-list card my-card">
      <div className="card-header display-flex justify-content-between">
        <div className="card-header-title">Ghi chú</div>
        <div className="header-buttons">
          <CreateButton
            className="btn-sm btn-raised"
            onClick={() => {
              setIsOpen(true)
              setNoteId(null)
            }}
          >
            Tạo
          </CreateButton>
        </div>
      </div>
      <div className="card-body d-flex flex-column" style={{ gap: "8px" }}>
        {(notes || []).map((t) => (
          <div className="card my-note my-card" key={t.id}>
            <div className="card-header display-flex justify-content-between">
              <div className="card-header-title" title={t.title}>
                {t.title}
              </div>
              <div className="card-header-button">
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
            <div className="card-body">
              <RawHtml className="introduction" html={t.note} />
            </div>
            <div className="card-footer display-flex justify-content-between align-items-center">
              <div className="card-footer-title">
                <div>{t.createdBy.displayName || t.createdBy.email}</div>
                <div>{formatDate(new Date(t.createdDate))}</div>
              </div>
              <div className="display-flex justify-content-between">
                <AssetListView list={t.assets} type="thumbnail" />
              </div>
            </div>
          </div>
        ))}
        {state.resp?.rows?.length === filter.size && (
          <div className="load-more">
            <TextIconButton className="btn-sm" type="button" onClick={loadMore}>
              Load More
            </TextIconButton>
          </div>
        )}
      </div>
      {isOpen && (
        <NoteModalForm isOpen companyId={companyId} closeHandle={onClose} noteId={noteId} />
      )}
      {confirmModal}
    </div>
  )
}

ListPageNoteCompany.propTypes = { companyId: PropTypes.any }

export default ListPageNoteCompany
