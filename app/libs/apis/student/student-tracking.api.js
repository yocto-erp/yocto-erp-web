import { fetchJSON, postJSON } from "../fetch";
import { API_URL } from "../../../constants";

const API_ENDPOINT_URL = `${API_URL}/student-tracking`;

export const studentTrackingApi = {
  list: ({ student, fromDate, toDate }) =>
    fetchJSON(
      `${API_ENDPOINT_URL}/student?studentId=${
        student.id
      }&fromDate=${fromDate.toISOString()}&toDate=${toDate.toISOString()}`,
    ),
  update: form => postJSON(`${API_ENDPOINT_URL}/student`, form),
  summary: ({ fromDate, toDate }) =>
    fetchJSON(
      `${API_ENDPOINT_URL}/summary?fromDate=${fromDate.toISOString()}&toDate=${toDate.toISOString()}`,
    ),
};
