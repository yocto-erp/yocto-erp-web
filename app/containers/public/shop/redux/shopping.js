import produce from "immer";
import { toast } from "react-toastify";

export const SHOP_ACTION = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
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

export function removeFromCart(index) {
  return {
    type: SHOP_ACTION.REMOVE_FROM_CART,
    payload: index,
  };
}

/* eslint-disable default-case, no-param-reassign */
export const shopReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHOP_ACTION.ADD_TO_CART: {
        let existedProd = draft.products.find(
          t => t.product.id === action.payload.id,
        );
        if (!existedProd) {
          existedProd = {
            product: action.payload,
            qty: 0,
          };
          draft.products.push(existedProd);
        }
        existedProd.qty += 1;
        toast.success(`Add Product ${action.payload.webDisplayName} success`);
        break;
      }
      case SHOP_ACTION.REMOVE_FROM_CART:
        draft.products.splice(action.payload, 1);
        break;
    }
  });
