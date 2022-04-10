import { defineMessages } from "react-intl";

export const scope = "app.containers.sale.pos.order";

export default defineMessages({
  formCustomer: {
    id: `${scope}.formCustomer`,
    defaultMessage: "Chọn khách hàng",
  },
  formShipping: {
    id: `${scope}.formShipping`,
    defaultMessage: "Giao hàng",
  },
  formReturn: {
    id: `${scope}.formReturn`,
    defaultMessage: "Trả lại",
  },
  formShippingPlaceholder: {
    id: `${scope}.formShippingPlaceholder`,
    defaultMessage: "Địa chỉ giao hàng",
  },
  tableHeaderProduct: {
    id: `${scope}.tableHeaderProduct`,
    defaultMessage: "Sản phẩm",
  },
  tableHeaderPrice: {
    id: `${scope}.tableHeaderPrice`,
    defaultMessage: "Giá",
  },
  tableHeaderQty: {
    id: `${scope}.tableHeaderPrice`,
    defaultMessage: "SL",
  },
  tableHeaderAction: {
    id: `${scope}.tableHeaderPrice`,
    defaultMessage: "Thao tác",
  },
  formBtnCheckOut: {
    id: `${scope}.formBtnCheckOut`,
    defaultMessage: "Thanh toán",
  },
  formBtnDelete: {
    id: `${scope}.formBtnDelete`,
    defaultMessage: "Xoá đơn hàng",
  },
  order: {
    id: `${scope}.order`,
    defaultMessage: "Đơn hàng",
  },
  orderEmpty: {
    id: `${scope}.orderEmpty`,
    defaultMessage: "Không có đơn hàng nào.",
  },
  orderTitle: {
    id: `${scope}.orderTitle`,
    defaultMessage:
      "{count, plural, =0 {Tạo đơn hàng} one {# đơn hàng} other {# đơn hàng}}",
  },
  debt: {
    id: `${scope}.debt`,
    defaultMessage: "Nợ",
  },
  return: {
    id: `${scope}.return`,
    defaultMessage: "Trả lại",
  },
  checkoutModalCustomer: {
    id: `${scope}.checkoutModalCustomer`,
    defaultMessage: "Khách hàng",
  },
  checkoutModalCustomerPay: {
    id: `${scope}.checkoutModalCustomer`,
    defaultMessage: "Khách hàng trả",
  },
  checkoutModalTotal: {
    id: `${scope}.checkoutModalTotal`,
    defaultMessage: "Số tiền",
  },
  checkoutModalTax: {
    id: `${scope}.checkoutModalTax`,
    defaultMessage: "Thuế",
  },
  checkoutModalTabTitle: {
    id: `${scope}.checkoutModalTabTitle`,
    defaultMessage: "Thanh toán",
  },
  checkoutModalTabVoucher: {
    id: `${scope}.checkoutModalTabVoucher`,
    defaultMessage: "Tạo phiếu",
  },
});
