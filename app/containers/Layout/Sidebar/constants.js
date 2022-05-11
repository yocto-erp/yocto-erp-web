import { AUDIT_ROOT_PATH } from "../../Audit/constants";
import { TAGGING_ROOT_PATH } from "../../tagging/constants";
import { USER_ROOT_PATH } from "../../user/constants";
import { ADMIN_PATH, PERMISSION } from "../../../constants";
import { PURCHASE_ORDER_ROOT_PATH } from "../../order/purchase/constants";
import { COST_ROOT_PATH } from "../../cost/constants";
import { INVENTORY_ROOT_PATH } from "../../inventory/constants";
import {
  STUDENT_CONFIGURATION_ROOT_PATH,
  STUDENT_MANAGEMENT_ROOT_PATH,
} from "../../student/constants";
import { STUDENT_MONTHLY_ROOT_PATH } from "../../student/monthly-fee/constants";
import { SURVEY_MANAGEMENT_ROOT_PATH } from "../../survey/Admin/constants";
import { WAREHOUSE_ROOT_PATH } from "../../warehouse/constants";
import { PRODUCT_ROOT_PATH } from "../../product/constants";
import { PARTNER_ROOT_PATH } from "../../partner/constants";
import { LOG_EMAIL_ROOT_PATH } from "../../log/constants";
import {
  CONFIGURATION_COMPANY_ROOT_PATH,
  CONFIGURATION_EMAIL_ROOT_PATH,
} from "../../configuration/constants";
import {
  TEMPLATE_EMAIL_ROOT_PATH,
  TEMPLATE_PRINT_ROOT_PATH,
} from "../../template/constants";
import { SALE_MENU_SETTING } from "../../ecommerce/constants";
import { SHOP_ROOT_PATH } from "../../sale/shop/constants";
import { STUDENT_CLASS_ROOT_PATH } from "../../student/student-class/constants";
import { STUDENT_BUS_STOP_ROOT_PATH } from "../../student/student-bus-stop/constants";
import { POS_ROOT_PATH } from "../../sale/pos/constants";
import { TAX_ROOT_PATH } from "../../finance/tax/tax/constants";
import { TAX_SET_ROOT_PATH } from "../../finance/tax/tax-set/constants";
import { ASSET_ROOT_PATH } from "../../../components/assets/constants";
import { PAYMENT_ROOT_PATH } from "../../finance/payment/constants";
import { DEBT_ROOT_PATH } from "../../debt/constants";
import { STUDENT_TRACKING_ROOT_PATH } from "../../student/student-tracking/constants";
import { PROVIDER_ROOT_PATH } from "../../provider/constants";

export const SIDE_BAR_MENU = {
  main: [
    {
      header: "Dashboard",
      isHeader: true,
      iconName: "fi flaticon-home",
      link: `${ADMIN_PATH}/dashboard`,
      index: "dashboard",
      exact: true,
    },
    {
      header: "POS",
      isHeader: true,
      iconName: "fi flaticon-home",
      link: `${POS_ROOT_PATH}/list`,
      index: "pos-list",
      exact: true,
      permission: PERMISSION.POS.ORDER,
    },
  ],
  utils: [
    {
      header: "Mua hàng",
      isHeader: true,
      iconName: "fi flaticon-network",
      link: PURCHASE_ORDER_ROOT_PATH,
      index: "purchase",
      permission: PERMISSION.ORDER.PURCHASE.READ,
    },
    {
      header: "Thu chi",
      isHeader: true,
      iconName: "fi flaticon-network",
      link: COST_ROOT_PATH,
      index: "cost",
      exact: true,
      permission: PERMISSION.COST.READ,
    },
    {
      header: "Công nợ",
      iconName: "fi flaticon-note",
      link: DEBT_ROOT_PATH,
      index: "debt",
      permission: [PERMISSION.TAX.READ],
      isHeader: true,
    },
    {
      header: "Nhập, xuất kho",
      isHeader: true,
      exact: true,
      iconName: "fi flaticon-network",
      link: INVENTORY_ROOT_PATH,
      index: "inventory",
      permission: [
        PERMISSION.INVENTORY.GOODS_ISSUE.READ,
        PERMISSION.INVENTORY.GOODS_RECEIPT.READ,
      ],
    },
    {
      header: "Student",
      isHeader: true,
      iconName: "fi flaticon-user-2",
      index: "student",
      link: "",
      permission: PERMISSION.CUSTOMER.READ,
      children: [
        {
          header: "Student Class",
          isHeader: true,
          link: STUDENT_CLASS_ROOT_PATH,
          index: "student.class",
        },
        {
          header: "Bus Stop",
          isHeader: true,
          exact: true,
          link: STUDENT_BUS_STOP_ROOT_PATH,
          index: "student.busStop",
        },
        {
          header: "List Student",
          isHeader: true,
          link: STUDENT_MANAGEMENT_ROOT_PATH,
          exact: true,
          index: "student.list",
        },
        {
          header: "Monthly Fee",
          isHeader: true,
          exact: true,
          link: STUDENT_MONTHLY_ROOT_PATH,
          index: "student.monthly-fee",
        },
        {
          header: "Tracking",
          isHeader: true,
          exact: true,
          link: STUDENT_TRACKING_ROOT_PATH,
          index: "student.tracking",
        },
        {
          header: "Configure",
          isHeader: true,
          link: STUDENT_CONFIGURATION_ROOT_PATH,
          index: "student.configure",
        },
      ],
    },
  ],
  management: [
    {
      header: "Quản lý",
      isHeader: true,
      iconName: "fi flaticon-list",
      index: "management",
      link: "",
      children: [
        {
          header: "Shop",
          link: SHOP_ROOT_PATH,
          index: "management.shop",
          permission: PERMISSION.SHOP.READ,
          isHeader: true,
        },
        {
          header: "POS",
          link: POS_ROOT_PATH,
          index: "management.pos",
          permission: PERMISSION.POS.READ,
          isHeader: false,
          exact: true,
        },
        {
          header: "Survey",
          isHeader: true,
          link: SURVEY_MANAGEMENT_ROOT_PATH,
          permission: PERMISSION.SURVEY.READ,
          index: "management.survey-management",
        },
        {
          header: "Kho",
          isHeader: true,
          link: WAREHOUSE_ROOT_PATH,
          permission: PERMISSION.WAREHOUSE.READ,
          index: "management.warehouse",
        },
        {
          header: "Sản phẩm",
          link: PRODUCT_ROOT_PATH,
          index: "management.product",
          permission: PERMISSION.PRODUCT.READ,
          isHeader: true,
        },
        {
          header: "Nhà cung cấp",
          link: PROVIDER_ROOT_PATH,
          index: "management.provider",
          permission: [PERMISSION.PROVIDER.READ],
          isHeader: true,
        },
        {
          header: "Khách hàng - Công ty",
          link: PARTNER_ROOT_PATH,
          index: "management.partner",
          permission: [PERMISSION.CUSTOMER.READ, PERMISSION.COMPANY.READ],
          isHeader: true,
        },
        {
          header: "Labels",
          link: TAGGING_ROOT_PATH,
          index: "management.label",
          isHeader: true,
        },
        {
          header: "Asset Management",
          link: ASSET_ROOT_PATH,
          index: "management.asset",
          isHeader: true,
        },
        {
          header: "User",
          permission: PERMISSION.USER.READ,
          isHeader: true,
          iconName: "fi flaticon-user",
          link: USER_ROOT_PATH,
          index: "management.user",
        },
      ],
    },
    {
      header: "Tài chính",
      link: "",
      index: "finance",
      iconName: "fi flaticon-list",
      isHeader: true,
      permission: [PERMISSION.TAX.READ],
      children: [
        {
          header: "Danh sách thuế",
          link: TAX_ROOT_PATH,
          exact: true,
          index: "finance.tax",
          permission: [PERMISSION.TAX.READ],
          isHeader: true,
        },
        {
          header: "Danh sách nhóm thuế",
          link: TAX_SET_ROOT_PATH,
          index: "finance.taxSet",
          exact: true,
          permission: [PERMISSION.TAX.READ],
          isHeader: true,
        },
        {
          header: "Kênh thanh toán",
          link: PAYMENT_ROOT_PATH,
          exact: true,
          index: "finance.payment",
          isHeader: true,
        },
      ],
    },
    {
      ...SALE_MENU_SETTING,
    },
    {
      header: "Mẫu tài liệu",
      link: "",
      iconName: "fi flaticon-folder-2",
      isHeader: true,
      index: "template",
      permission: PERMISSION.TEMPLATE.READ,
      children: [
        {
          header: "Mẫu in",
          link: TEMPLATE_PRINT_ROOT_PATH,
          exact: true,
          index: "template.print",
        },
        {
          header: "Mẫu Email",
          link: TEMPLATE_EMAIL_ROOT_PATH,
          exact: true,
          index: "template.email",
        },
      ],
    },
    {
      header: "Cấu hình",
      permission: PERMISSION.CONFIGURATION,
      isHeader: true,
      iconName: "fi flaticon-settings-3",
      index: "configuration",
      link: "",
      children: [
        {
          header: "Email",
          link: CONFIGURATION_EMAIL_ROOT_PATH,
          index: "configuration.email",
        },
        {
          header: "Company",
          link: CONFIGURATION_COMPANY_ROOT_PATH,
          index: "configuration.company",
        },
      ],
    },
    {
      header: "Log",
      isHeader: true,
      iconName: "fi flaticon-time",
      index: "log",
      link: "",
      permission: [PERMISSION.EMAIL.READ, PERMISSION.AUDIT],
      children: [
        {
          permission: PERMISSION.EMAIL.READ,
          header: "Email",
          link: LOG_EMAIL_ROOT_PATH,
          index: "log.email",
        },
        {
          permission: PERMISSION.AUDIT,
          header: "Audit",
          link: AUDIT_ROOT_PATH,
          index: "log.audit",
        },
      ],
    },
  ],
};
