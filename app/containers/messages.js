import { defineMessages } from "react-intl";

const scope = "app.containers.template";

export const commonMessage = defineMessages({
  searchPartnerPlaceHolder: {
    id: `${scope}.searchPartnerPlaceHolder`,
    defaultMessage: "Tìm theo tên, email, số điện thoại",
  },
  searchByName: {
    id: `${scope}.searchByName`,
    defaultMessage: "Tìm theo tên",
  },
});