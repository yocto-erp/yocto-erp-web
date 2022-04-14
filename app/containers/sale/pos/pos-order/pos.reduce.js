import { v4 as uuidv4 } from "uuid";
import { subtract } from "../../../../libs/utils/math.util";
import { calculateOrder, initOrder, initProduct } from "./order.util";
import { SUBJECT_TYPE } from "../../../partner/subject/constants";

const POS_ACTION = {
  ADD_ORDER: "ADD_ORDER",
  UPDATE_ORDER: "UPDATE_ORDER",
  REMOVE_ORDER: "REMOVE_ORDER",
  REMOVE_CURRENT_ORDER: "REMOVE_CURRENT_ORDER",
  SELECT_ORDER: "SELECT_ORDER",
  ADD_PRODUCT: "ADD_PRODUCT",
  REMOVE_PRODUCT: "REMOVE_PRODUCT",
  CHANGE_QTY: "CHANGE_QTY",
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
  SELECT_CUSTOMER: "SELECT_CUSTOMER",
  SET_ORDER_SHIP: "SET_ORDER_SHIP",
  CHANGE_ORDER_PAYMENT_AMOUNT: "CHANGE_PAYMENT_AMOUNT",
  SET_SHIPPING: "SET_SHIPPING",
  SET_ADDRESS: "SET_ADDRESS",
  CHECKOUT: "CHECKOUT",
};

export const posInitialState = {
  orders: [],
  currentOrder: -1,
};

export function onCheckout() {
  return {
    type: POS_ACTION.CHECKOUT,
  };
}

export function checkOut(state) {
  const { orders, currentOrder } = state;
  orders.splice(currentOrder, 1);
  return {
    ...state,
    orders: [...orders],
    currentOrder: orders.length ? 0 : -1,
  };
}

export function onUpdateOrder(index, form) {
  return {
    type: POS_ACTION.UPDATE_ORDER,
    data: {
      index,
      form,
    },
  };
}

function updateOrder(state, action) {
  const {
    data: {
      index,
      form: { name },
    },
  } = action;
  const { orders } = state;
  const order = orders[index];
  order.name = name;
  return { ...state, orders: [...state.orders] };
}

export function onChangeOrderPaymentAmount(amount) {
  return {
    type: POS_ACTION.CHANGE_ORDER_PAYMENT_AMOUNT,
    amount,
  };
}

export function onChangeOrderShipping(isShipping) {
  return {
    type: POS_ACTION.SET_ORDER_SHIP,
    isShipping,
  };
}

export function addOrder() {
  return {
    type: POS_ACTION.ADD_ORDER,
  };
}

export function removeOrder(index) {
  return {
    type: POS_ACTION.REMOVE_ORDER,
    data: index,
  };
}

export function removeCurrentOrder() {
  return {
    type: POS_ACTION.REMOVE_CURRENT_ORDER,
  };
}

export function selectOrder(index) {
  return {
    type: POS_ACTION.SELECT_ORDER,
    data: index,
  };
}

export function addProduct(product) {
  return {
    type: POS_ACTION.ADD_PRODUCT,
    data: product,
  };
}

export function removeProduct(index) {
  return {
    type: POS_ACTION.REMOVE_PRODUCT,
    data: index,
  };
}

export function changeProduct(index) {
  return {
    type: POS_ACTION.REMOVE_PRODUCT,
    data: index,
  };
}

export function onSelectCustomer(customer) {
  return {
    type: POS_ACTION.SELECT_CUSTOMER,
    data: customer,
  };
}

export function decreaseProduct(index) {
  return {
    type: POS_ACTION.DECREASE,
    data: index,
  };
}

export function changeProductQty(index, qty) {
  return {
    type: POS_ACTION.CHANGE_QTY,
    data: { index, qty },
  };
}

export function onSetShipping(isShipping) {
  return {
    type: POS_ACTION.SET_SHIPPING,
    data: isShipping,
  };
}

export function onChangeAddress(address) {
  return {
    type: POS_ACTION.SET_ADDRESS,
    data: address,
  };
}

function setShipping(state, action) {
  const { data: isShipping } = action;
  const { currentOrder, orders } = state;
  const order = orders[currentOrder];
  order.isShipping = isShipping;
  return { ...state, orders: [...state.orders] };
}

function changeAddress(state, action) {
  const { data: address } = action;
  const { currentOrder, orders } = state;
  const order = orders[currentOrder];
  order.address = address;
  return { ...state, orders: [...state.orders] };
}

function changeOrderPaymentAmount(state, action) {
  const { amount } = action;
  const { currentOrder, orders } = state;
  const order = orders[currentOrder];
  order.paymentAmountInput = amount;
  order.paymentAmount = amount || 0;
  orders[currentOrder] = calculateOrder(order);
  return { ...state, orders: [...state.orders] };
}

function removeProductAction(state, action) {
  const { data: index } = action;
  const { currentOrder, orders } = state;
  const order = orders[currentOrder];
  const existedProduct = order.products[index];
  order.products.splice(index, 1);
  /**
   * Remove tax, taxes, total, totalWithTax
   */
  order.total = subtract(order.total, existedProduct.total);
  order.totalWithTax = subtract(
    order.totalWithTax,
    existedProduct.totalWithTax,
  );
  order.tax = subtract(order.tax, existedProduct.tax);
  for (let i = 0; i < existedProduct.taxes.length; i += 1) {
    const taxItem = existedProduct.taxes[i];
    const existedTax = order.taxes.find(t => t.id === taxItem.id);
    if (!existedTax) {
      console.error("Not existed tax in order", taxItem);
    } else {
      existedTax.taxAmount = subtract(existedTax.taxAmount, taxItem.taxAmount);
    }
  }

  return { ...state, orders: [...state.orders] };
}

export function posReducer(state, action) {
  switch (action.type) {
    case POS_ACTION.ADD_ORDER: {
      return {
        id: uuidv4(),
        orders: [...state.orders, initOrder()],
        currentOrder: state.orders.length,
      };
    }
    case POS_ACTION.REMOVE_ORDER: {
      const index = state.orders.findIndex(t => t.id === action.data.id);
      state.orders.splice(index, 1);
      return { orders: state.orders, currentOrder: -1 };
    }
    case POS_ACTION.REMOVE_CURRENT_ORDER: {
      state.orders.splice(state.currentOrder, 1);
      let orderIndex = state.currentOrder;
      if (state.currentOrder === state.orders.length) {
        orderIndex = state.currentOrder - 1;
      }
      return {
        orders: [...state.orders],
        currentOrder: orderIndex,
      };
    }
    case POS_ACTION.SELECT_ORDER: {
      return { orders: state.orders, currentOrder: action.data };
    }
    case POS_ACTION.ADD_PRODUCT: {
      const { data: product } = action;
      let { currentOrder, orders } = state;
      if (currentOrder === -1) {
        orders = [initOrder()];
        currentOrder = 0;
      }
      const order = orders[currentOrder];
      let existedProd = order.products.find(t => t.product.id === product.id);
      if (!existedProd) {
        existedProd = initProduct(product);
        order.products.push(existedProd);
      }
      existedProd.qty += 1;
      orders[currentOrder] = calculateOrder(order);
      return { orders: [...orders], currentOrder };
    }
    case POS_ACTION.REMOVE_PRODUCT: {
      return removeProductAction(state, action);
    }
    case POS_ACTION.INCREASE: {
      const { data } = action;
      const { currentOrder, orders } = state;
      const order = orders[currentOrder];
      order.products[data].qty += 1;
      orders[state.currentOrder] = calculateOrder(order);
      return { ...state, orders: [...state.orders] };
    }
    case POS_ACTION.DECREASE: {
      const { data } = action;
      const { currentOrder, orders } = state;
      const order = orders[currentOrder];
      order.products[data].qty -= 1;
      orders[currentOrder] = calculateOrder(order);
      return { ...state, orders: [...state.orders] };
    }
    case POS_ACTION.CHANGE_QTY: {
      const {
        data: { index, qty },
      } = action;
      const { currentOrder, orders } = state;
      const order = orders[currentOrder];
      if (qty === -1) {
        order.products.splice(index, 1);
      } else {
        order.products[index].qty = qty;
      }
      orders[currentOrder] = calculateOrder(order);
      return { ...state, orders: [...state.orders] };
    }
    case POS_ACTION.SELECT_CUSTOMER: {
      const { orders } = state;
      const { data: customer } = action;
      const order = orders[state.currentOrder];
      order.customer = customer;
      order.email = customer?.email;
      order.phone = customer?.gsm;
      if (customer.type === SUBJECT_TYPE.COMPANY) {
        order.address = customer?.company.address;
      } else {
        order.address = customer?.person?.address;
      }

      orders[state.currentOrder] = { ...order };
      return {
        orders: [...state.orders],
        currentOrder: state.currentOrder,
      };
    }
    case POS_ACTION.CHANGE_ORDER_PAYMENT_AMOUNT: {
      return changeOrderPaymentAmount(state, action);
    }
    case POS_ACTION.SET_SHIPPING: {
      return setShipping(state, action);
    }
    case POS_ACTION.SET_ADDRESS: {
      return changeAddress(state, action);
    }
    case POS_ACTION.UPDATE_ORDER: {
      return updateOrder(state, action);
    }
    case POS_ACTION.CHECKOUT: {
      return checkOut(state);
    }
    default:
      throw new Error();
  }
}
