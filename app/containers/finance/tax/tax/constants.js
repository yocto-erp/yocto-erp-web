import { FINANCE_ROOT_PATH } from "../../constants";

export const TAX_ROOT_PATH = `${FINANCE_ROOT_PATH}/tax`;

export const TAX_TYPE = {
  PERCENT: 1,
  FIX: 2,
};

export const taxTypeStr = id => {
  switch (Number(id)) {
    case TAX_TYPE.FIX:
      return "FIX";
    case TAX_TYPE.PERCENT:
      return "PERCENT";
    default:
      return "";
  }
};

export const TAX_TYPE_LIST = [
  { id: TAX_TYPE.FIX, name: taxTypeStr(TAX_TYPE.FIX) },
  { id: TAX_TYPE.PERCENT, name: taxTypeStr(TAX_TYPE.PERCENT) },
];
