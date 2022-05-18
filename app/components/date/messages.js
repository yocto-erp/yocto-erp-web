import { defineMessages } from "react-intl";

const scope = "app.containers.component.date.dateRangePicker";

export const messages = defineMessages({
  today: {
    id: `${scope}.today`,
    defaultMessage: "Hôm nay",
  },
  yesterday: {
    id: `${scope}.yesterday`,
    defaultMessage: "Hôm qua",
  },
  thisWeek: {
    id: `${scope}.thisWeek`,
    defaultMessage: "Tuần này",
  },
  lastWeek: {
    id: `${scope}.lastWeek`,
    defaultMessage: "Tuần trước",
  },
  thisMonth: {
    id: `${scope}.thisMonth`,
    defaultMessage: "Tháng này",
  },
  lastMonth: {
    id: `${scope}.lastMonth`,
    defaultMessage: "Tháng trước",
  },
});
