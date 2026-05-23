import { API_URL } from "../../../constants"
import { createSearchApi, fetchJSON, postJSON } from "../fetch"

const API_ENDPOINT_URL = `${API_URL}/company-school-update`

export const CompanySchoolUpdateApi = {
  get: () => fetchJSON(`${API_ENDPOINT_URL}/getDetail`),
  getCompanySchoolUpdateById: (id) => fetchJSON(`${API_ENDPOINT_URL}/${id}`),
  save: (form) => postJSON(API_ENDPOINT_URL, form),
  search: createSearchApi(API_ENDPOINT_URL),
  download: (search, ids) => `${API_ENDPOINT_URL}/download?search=${search}&ids=${ids}`,
}
