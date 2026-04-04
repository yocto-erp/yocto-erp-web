import { createCRUDApi, fetchJSON } from "../fetch"
import { API_URL } from "../../../constants"

const API_ENDPOINT_URL = `${API_URL}/company-note`

const companyNoteApi = {
  ...createCRUDApi(API_ENDPOINT_URL),
  assets: (id) => fetchJSON(`${API_ENDPOINT_URL}/${id}/assets`),
  getListCompanyNote: (companyId) => fetchJSON(`${API_ENDPOINT_URL}?companyId=${companyId}`),
}

export default companyNoteApi
