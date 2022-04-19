import produce from "immer";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  calculateProductTax,
  initProduct,
} from "../../../sale/pos/pos-order/order.util";
import { multiply, plus, subtract } from "../../../../libs/utils/math.util";
import { isArrayHasItem } from "../../../../utils/util";

export const SHOP_ACTION = {
  ADD_PRODUCT: "ADD_PRODUCT",
  REMOVE_PRODUCT: "REMOVE_PRODUCT",
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
  SET_SHIPPING: "SET_SHIPPING",
  SET_ADDRESS: "SET_ADDRESS",
  CHANGE_QTY: "CHANGE_QTY",
};

export const initUserOrder = () => ({
  id: uuidv4(),
  products: [],
  total: 0,
  totalWithTax: 0,
  tax: 0,
  email: "",
  phone: "",
  address: "",
  taxes: [],
  isShipping: false,
});

const initialState = initUserOrder();

/**
 * Return: {
 *   total,
 *   tax,
 *   totalTax
 * }
 * @param order
 */
export function calculateUserOrder(order) {
  const rs = {
    total: 0,
    taxes: [],
    totalWithTax: 0,
    tax: 0,
  };
  if (order) {
    const { products } = order;
    for (let i = 0; i < products.length; i += 1) {
      const product = products[i];
      const price = multiply(product.qty, product.product.price);
      const productTax = calculateProductTax(product.product.taxes, price);
      product.tax = productTax.tax;
      product.taxes = productTax.taxes;
      product.total = productTax.total;
      product.totalWithTax = productTax.totalWithTax;
      rs.total = plus(rs.total, price);
      rs.tax = plus(rs.tax, product.tax);
      rs.totalWithTax = plus(rs.totalWithTax, productTax.totalWithTax);
      if (isArrayHasItem(product.taxes)) {
        for (let j = 0; j < product.taxes.length; j += 1) {
          const tax = product.taxes[j];
          let taxExisted = rs.taxes.find(t => t.id === tax.id);
          if (!taxExisted) {
            taxExisted = { ...tax };
            rs.taxes.push(taxExisted);
          } else {
            taxExisted.taxAmount = plus(taxExisted.taxAmount, tax.taxAmount);
          }
        }
      }
    }
    rs.return = rs.total;
  }
  return { ...order, ...rs };
}

export function userAddProduct(product) {
  return {
    type: SHOP_ACTION.ADD_PRODUCT,
    payload: product,
  };
}

export function userRemoveProduct(index) {
  return {
    type: SHOP_ACTION.REMOVE_PRODUCT,
    payload: { index },
  };
}

export function userOnSetShipping(isShipping) {
  return {
    type: SHOP_ACTION.SET_SHIPPING,
    payload: isShipping,
  };
}

export function userChangeAddress(address) {
  return {
    type: SHOP_ACTION.SET_ADDRESS,
    payload: address,
  };
}

export function userChangeProductQty(index, qty) {
  return {
    type: SHOP_ACTION.CHANGE_QTY,
    payload: { index, qty },
  };
}

/* eslint-disable default-case, no-param-reassign */
export const shopReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHOP_ACTION.ADD_PRODUCT: {
        const { payload: product } = action;
        let existedProd = draft.products.find(
          t => t.product.id === action.payload.id,
        );

        if (!existedProd) {
          existedProd = initProduct(product);
          draft.products.push(existedProd);
        }
        existedProd.qty += 1;
        const calOrder = calculateUserOrder(draft);
        draft.total = calOrder.total;
        draft.tax = calOrder.tax;
        draft.taxes = calOrder.taxes;
        draft.totalWithTax = calOrder.totalWithTax;
        toast.success(`Add Product ${action.payload.webDisplayName} success`);
        break;
      }
      case SHOP_ACTION.CHANGE_QTY: {
        const {
          payload: { index, qty },
        } = action;
        if (qty === -1) {
          draft.products.splice(index, 1);
        } else {
          draft.products[index].qty = qty;
        }
        const calOrder = calculateUserOrder(draft);
        draft.total = calOrder.total;
        draft.tax = calOrder.tax;
        draft.taxes = calOrder.taxes;
        draft.totalWithTax = calOrder.totalWithTax;
        break;
      }
      case SHOP_ACTION.REMOVE_PRODUCT: {
        const {
          payload: { index },
        } = action;
        const existedProduct = draft.products[index];
        draft.products.splice(index, 1);
        /**
         * Remove tax, taxes, total, totalWithTax
         */
        draft.total = subtract(draft.total, existedProduct.total);
        draft.totalWithTax = subtract(
          draft.totalWithTax,
          existedProduct.totalWithTax,
        );
        draft.tax = subtract(draft.tax, existedProduct.tax);
        for (let i = 0; i < existedProduct.taxes.length; i += 1) {
          const taxItem = existedProduct.taxes[i];
          const existedTax = draft.taxes.find(t => t.id === taxItem.id);
          if (!existedTax) {
            console.error("Not existed tax in order", taxItem);
          } else {
            existedTax.taxAmount = subtract(
              existedTax.taxAmount,
              taxItem.taxAmount,
            );
          }
        }
        break;
      }
      case SHOP_ACTION.SET_SHIPPING: {
        const { payload: isShipping } = action;
        draft.isShipping = isShipping;
        break;
      }
      case SHOP_ACTION.SET_ADDRESS: {
        const { payload: address } = action;
        draft.address = address;
      }
    }
  });
