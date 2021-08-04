import produce from 'immer';

export const SHOP_ACTION = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
};

const initialState = {
  products: [],
};

export function addToCart(product) {
  return {
    type: SHOP_ACTION.ADD_TO_CART,
    payload: product,
  };
}

export function removeFromCart(product, index) {
  return {
    type: SHOP_ACTION.REMOVE_FROM_CART,
    payload: index,
  };
}

/* eslint-disable default-case, no-param-reassign */
export const shopReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHOP_ACTION.ADD_TO_CART:
        draft.products.push(action.payload);
        break;
      case SHOP_ACTION.REMOVE_FROM_CART:
        draft.products.splice(action.payload, 1);
        break;
    }
  });
