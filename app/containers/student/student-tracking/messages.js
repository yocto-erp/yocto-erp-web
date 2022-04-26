import { defineMessages } from "react-intl";

const studentFormScope = "containers.student.tracking";

export const studentTrackingMessage = defineMessages({
  listHeader: {
    id: `${studentFormScope}.header`,
    defaultMessage: "Điểm danh học sinh",
  },
  formStatus1: {
    id: `${studentFormScope}.formStatus1`,
    defaultMessage: "Có mặt",
  },
  formStatus2: {
    id: `${studentFormScope}.formStatus2`,
    defaultMessage: "Vắng mặt",
  },
});
