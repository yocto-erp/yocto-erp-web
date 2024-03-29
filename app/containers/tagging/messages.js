import { defineMessages } from "react-intl";

const scope = "app.containers.tagging";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Create Company",
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: "Name",
  },
  remark: {
    id: `${scope}.remark`,
    defaultMessage: "Remark",
  },
  gsm: {
    id: `${scope}.gsm`,
    defaultMessage: "gsm",
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: "Address",
  },
  createCompanyButton: {
    id: `${scope}.button.createCompany`,
    defaultMessage: "Create Company",
  },
});
