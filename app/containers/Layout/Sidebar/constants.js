import React from "react";
import { AUDIT_ROOT_PATH } from "../../Audit/constants";
import { TAGGING_ROOT_PATH } from "../../tagging/constants";
import { USER_ROOT_PATH } from "../../user/constants";
import { ADMIN_PATH } from "../../../constants";
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
import { PERMISSION } from "../../../components/Acl/constants";
import {
  IconSystemAudit,
  IconBus,
  IconClassRoom,
  IconClient,
  IconCompanySetting,
  IconCost,
  IconDebt,
  IconEmailLog,
  IconTax,
  IconEmailSetting,
  IconFinance,
  IconHardDriver,
  IconInventory,
  IconLabel,
  IconList,
  IconMoney,
  IconPos,
  IconProduct,
  IconProvider,
  IconPurchase,
  IconSetting,
  IconStudent,
  IconStudentAttendant,
  IconSurvey,
  IconSystem,
  IconUserLog,
  IconUsers,
  IconWarehouse,
  IconTemplate,
  IconShop,
  IconPrint,
  IconEmail,
} from "../../Icon/constants";
import { FORM_ROOT_PATH } from "../../pages/form-register/constants";
import { FORM_REGISTER_ROOT_PATH } from "../../pages/form/form-register-signup/constants";

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
      icon: <IconPos />,
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
      icon: <IconPurchase />,
      link: PURCHASE_ORDER_ROOT_PATH,
      index: "purchase",
      permission: PERMISSION.ORDER.PURCHASE.READ,
    },
    {
      header: "Thu chi",
      isHeader: true,
      icon: <IconCost />,
      link: COST_ROOT_PATH,
      index: "cost",
      exact: true,
      permission: PERMISSION.COST.READ,
    },
    {
      header: "Công nợ",
      icon: <IconDebt />,
      link: DEBT_ROOT_PATH,
      index: "debt",
      permission: [PERMISSION.TAX.READ],
      isHeader: true,
    },
    {
      header: "Nhập, xuất kho",
      isHeader: true,
      icon: <IconInventory />,
      link: INVENTORY_ROOT_PATH,
      index: "inventory",
      permission: [
        PERMISSION.INVENTORY.GOODS_ISSUE.READ,
        PERMISSION.INVENTORY.GOODS_RECEIPT.READ,
      ],
    },
    {
      header: "Form đăng ký",
      isHeader: true,
      icon: <i className="fa fa-form" />,
      index: "form",
      link: "",
      permission: [PERMISSION.FORM.READ],
      children: [
        {
          header: "Quản lý form",
          isHeader: true,
          link: FORM_ROOT_PATH,
          index: "form.register",
          icon: <IconClassRoom />,
          permission: [PERMISSION.FORM.READ],
        },
        {
          header: "Danh sách đăng ký",
          isHeader: true,
          link: FORM_REGISTER_ROOT_PATH,
          index: "form.signup",
          icon: <IconClassRoom />,
          permission: [PERMISSION.FORM.READ],
        },
      ],
    },
    {
      header: "Student",
      isHeader: true,
      icon: <IconStudent />,
      index: "student",
      link: "",
      permission: [
        PERMISSION.STUDENT.READ,
        PERMISSION.STUDENT.BUS.READ,
        PERMISSION.STUDENT.CLASS.READ,
        PERMISSION.STUDENT.CONFIGURE,
        PERMISSION.STUDENT.DAILY_TRACKING.READ,
        PERMISSION.STUDENT.MONTHLY_FEE.READ,
      ],
      children: [
        {
          header: "Student Class",
          isHeader: true,
          link: STUDENT_CLASS_ROOT_PATH,
          index: "student.class",
          icon: <IconClassRoom />,
          permission: [PERMISSION.STUDENT.CLASS.READ],
        },
        {
          header: "Bus Stop",
          isHeader: true,
          exact: true,
          icon: <IconBus />,
          link: STUDENT_BUS_STOP_ROOT_PATH,
          index: "student.busStop",
          permission: [PERMISSION.STUDENT.BUS.READ],
        },
        {
          header: "List Student",
          isHeader: true,
          icon: <IconList />,
          link: STUDENT_MANAGEMENT_ROOT_PATH,
          permission: [PERMISSION.STUDENT.READ],
          exact: true,
          index: "student.list",
        },
        {
          header: "Monthly Fee",
          isHeader: true,
          exact: true,
          icon: <IconMoney />,
          link: STUDENT_MONTHLY_ROOT_PATH,
          permission: [PERMISSION.STUDENT.MONTHLY_FEE.READ],
          index: "student.monthly-fee",
        },
        {
          header: "Tracking",
          isHeader: true,
          exact: true,
          icon: <IconStudentAttendant />,
          link: STUDENT_TRACKING_ROOT_PATH,
          permission: [PERMISSION.STUDENT.DAILY_TRACKING.READ],
          index: "student.tracking",
        },
        {
          header: "Configure",
          isHeader: true,
          link: STUDENT_CONFIGURATION_ROOT_PATH,
          icon: <IconSetting />,
          permission: [PERMISSION.STUDENT.CONFIGURE],
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
          icon: <IconShop />,
          permission: PERMISSION.SHOP.READ,
          isHeader: true,
        },
        {
          header: "Quản lý POS",
          link: POS_ROOT_PATH,
          icon: <IconPos />,
          index: "management.pos",
          permission: PERMISSION.POS.READ,
          isHeader: false,
          exact: true,
        },
        {
          header: "Survey",
          isHeader: true,
          icon: <IconSurvey />,
          link: SURVEY_MANAGEMENT_ROOT_PATH,
          permission: PERMISSION.SURVEY.READ,
          index: "management.survey-management",
        },
        {
          header: "Kho",
          isHeader: true,
          icon: <IconWarehouse />,
          link: WAREHOUSE_ROOT_PATH,
          permission: PERMISSION.WAREHOUSE.READ,
          index: "management.warehouse",
        },
        {
          header: "Sản phẩm",
          icon: <IconProduct />,
          link: PRODUCT_ROOT_PATH,
          index: "management.product",
          permission: PERMISSION.PRODUCT.READ,
          isHeader: true,
        },
        {
          header: "Nhà cung cấp",
          icon: <IconProvider />,
          link: PROVIDER_ROOT_PATH,
          index: "management.provider",
          permission: [PERMISSION.PROVIDER.READ],
          isHeader: true,
        },
        {
          header: "Khách hàng - Công ty",
          link: PARTNER_ROOT_PATH,
          icon: <IconClient />,
          index: "management.partner",
          permission: [PERMISSION.CUSTOMER.READ, PERMISSION.COMPANY.READ],
          isHeader: true,
        },
        {
          header: "Labels",
          link: TAGGING_ROOT_PATH,
          icon: <IconLabel />,
          index: "management.label",
          isHeader: true,
        },
        {
          header: "Quản lý dữ liệu",
          link: ASSET_ROOT_PATH,
          icon: <IconHardDriver />,
          index: "management.asset",
          isHeader: true,
        },
        {
          header: "User",
          permission: PERMISSION.USER.READ,
          isHeader: true,
          icon: <IconUsers />,
          link: USER_ROOT_PATH,
          index: "management.user",
        },
      ],
    },
    {
      header: "Tài chính",
      link: "",
      index: "finance",
      icon: <IconFinance />,
      isHeader: true,
      permission: [PERMISSION.TAX.READ],
      children: [
        {
          header: "Danh sách thuế",
          link: TAX_ROOT_PATH,
          exact: true,
          icon: <IconTax />,
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
      icon: <IconTemplate />,
      isHeader: true,
      index: "template",
      permission: PERMISSION.TEMPLATE.READ,
      children: [
        {
          header: "Mẫu in",
          link: TEMPLATE_PRINT_ROOT_PATH,
          icon: <IconPrint />,
          exact: true,
          index: "template.print",
        },
        {
          header: "Mẫu Email",
          icon: <IconEmail />,
          link: TEMPLATE_EMAIL_ROOT_PATH,
          exact: true,
          index: "template.email",
        },
      ],
    },
    {
      header: "Hệ thống",
      permission: PERMISSION.CONFIGURATION,
      isHeader: true,
      icon: <IconSystem />,
      index: "configuration",
      link: "",
      children: [
        {
          header: "Email",
          icon: <IconEmailSetting />,
          link: CONFIGURATION_EMAIL_ROOT_PATH,
          index: "configuration.email",
        },
        {
          header: "Company",
          icon: <IconCompanySetting />,
          link: CONFIGURATION_COMPANY_ROOT_PATH,
          index: "configuration.company",
        },
      ],
    },
    {
      header: "Log",
      isHeader: true,
      icon: <IconSystemAudit />,
      index: "log",
      link: "",
      permission: [PERMISSION.EMAIL.READ, PERMISSION.AUDIT],
      children: [
        {
          permission: PERMISSION.EMAIL.READ,
          header: "Email",
          icon: <IconEmailLog />,
          link: LOG_EMAIL_ROOT_PATH,
          index: "log.email",
        },
        {
          permission: PERMISSION.AUDIT,
          header: "Audit",
          icon: <IconUserLog />,
          link: AUDIT_ROOT_PATH,
          index: "log.audit",
        },
      ],
    },
  ],
};
