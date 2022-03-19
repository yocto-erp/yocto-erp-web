const POS_ACTION = {
  ADD_ORDER: "ADD_ORDER",
  REMOVE_ORDER: "REMOVE_ORDER",
  REMOVE_CURRENT_ORDER: "REMOVE_CURRENT_ORDER",
  SELECT_ORDER: "SELECT_ORDER",
  ADD_PRODUCT: "ADD_PRODUCT",
  REMOVE_PRODUCT: "REMOVE_PRODUCT",
  CHANGE_QTY: "CHANGE_QTY",
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
  SELECT_CUSTOMER: "SELECT_CUSTOMER",
};

export const posInitialState = {
  orders: [],
  currentOrder: -1,
};

const initProduct = prod => ({
  product: prod,
  qty: 0,
  tax: 0,
  total: 0,
});

const initOrder = index => ({
  id: index,
  name: `Order ${index}`,
  customer: null,
  products: [],
  total: 0,
  tax: 0,
  email: "",
  phone: "",
  address: "",
});

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

export function increaseProduct(index) {
  return {
    type: POS_ACTION.INCREASE,
    data: index,
  };
}

export function decreaseProduct(index) {
  return {
    type: POS_ACTION.DECREASE,
    data: index,
  };
}

/**
 * Return: {
 *   total,
 *   tax,
 *   totalTax
 * }
 * @param order
 */
export function calculateOrder(order) {
  const rs = {
    total: 0,
    tax: [],
    totalTax: 0,
  };
  if (order) {
    const { products } = order;
    for (let i = 0; i < products.length; i += 1) {
      const { qty, product } = products[i];
      rs.total += qty * product.price;
    }
  }

  return rs;
}

export function posReducer(state, action) {
  switch (action.type) {
    case POS_ACTION.ADD_ORDER: {
      return {
        orders: [...state.orders, initOrder(state.orders.length + 1)],
        currentOrder: state.orders.length,
      };
    }
    case POS_ACTION.REMOVE_ORDER: {
      state.orders.splice(action.data, 1);
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
        orders = [initOrder(1)];
        currentOrder = 0;
      }
      const order = orders[currentOrder];
      let existedProd = order.products.find(t => t.product.id === product.id);
      if (!existedProd) {
        existedProd = initProduct(product);
        order.products.push(existedProd);
      }
      existedProd.qty += 1;
      return { orders: [...orders], currentOrder };
    }
    case POS_ACTION.REMOVE_PRODUCT: {
      const { data } = action;
      const order = state.orders[state.currentOrder];
      order.products.splice(data, 1);
      return { ...state, orders: [...state.orders] };
    }
    case POS_ACTION.INCREASE: {
      const { data } = action;
      const order = state.orders[state.currentOrder];
      order.products[data].qty += 1;

      return { ...state, orders: [...state.orders] };
    }
    case POS_ACTION.DECREASE: {
      const { data } = action;
      const order = state.orders[state.currentOrder];
      order.products[data].qty -= 1;
      return { ...state, orders: [...state.orders] };
    }
    case POS_ACTION.SELECT_CUSTOMER: {
      console.log("onselect customer", action);
      const { orders } = state;
      const { data: customer } = action;
      const order = orders[state.currentOrder];
      order.id = new Date().getTime();
      order.customer = customer;
      order.email = customer.email;
      order.phone = customer.gsm;
      order.address = customer.address;
      if (customer) {
        order.name = `Order - ${customer.firstName} ${customer.lastName}`;
      } else {
        order.name = `Order - ${state.currentOrder}`;
      }
      orders[state.currentOrder] = { ...order };
      return {
        orders: [...state.orders],
        currentOrder: state.currentOrder,
      };
    }
    default:
      throw new Error();
  }
}
