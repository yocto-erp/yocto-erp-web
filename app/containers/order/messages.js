import { defineMessages } from "react-intl";

const scope = "app.containers.order";

export const orderMessage = defineMessages({
  status1: {
    id: `${scope}.status1`,
    defaultMessage: "Đang Chờ",
  },
  status2: {
    id: `${scope}.status2`,
    defaultMessage: "Đang Xử Lý",
  },
  status3: {
    id: `${scope}.status3`,
    defaultMessage: "Đang Giao Hàng",
  },
  status4: {
    id: `${scope}.status4`,
    defaultMessage: "Hoàn Tất",
  },
  status5: {
    id: `${scope}.status5`,
    defaultMessage: "Huỷ",
  },
});
