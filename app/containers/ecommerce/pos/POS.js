import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import debounce from "lodash/debounce";
import { API_STATE, useApi } from "../../../libs/hooks/useApi";
import EcommerceProductApi from "../../../libs/apis/ecommerce/ecommerce-product.api";
import Price from "../../../components/common/Price";
import { imagePath } from "../../../libs/apis/image.api";
import "./pos.scss";
import { addProduct, posInitialState, posReducer } from "./pos.reduce";
import {
  PosDispatchContext,
  PosListOrderContext,
  PosOrderContext,
} from "./pos.context";
import PosListOrder from "./pos-list-order";
import PosOrderForm from "./pos-order.form";

const POS = () => {
  const { state: productListState, exec: listProductExec } = useApi(
    EcommerceProductApi.search,
  );
  const [filter, setFilter] = useState({
    page: 1,
    size: 12,
    filter: {
      search: "",
    },
  });

  const [posState, dispatch] = useReducer(
    posReducer,
    null,
    () => posInitialState,
  );

  const getProductList = useCallback(debounce(listProductExec, 300), [
    listProductExec,
  ]);

  const onProductClick = useCallback(
    product => {
      dispatch(addProduct(product));
    },
    [dispatch],
  );
  const productList = useMemo(() => {
    if (productListState.status === API_STATE.SUCCESS) {
      return (
        <div className="container">
          <div className="row">
            {productListState.resp.rows.map((t, i) => (
              <div
                tabIndex={i}
                onKeyDown={() => onProductClick(t)}
                role="button"
                className="col-md-3 product-item"
                key={`product${t.id}`}
                onClick={() => onProductClick(t)}
              >
                <div className="card">
                  <img
                    className="card-img-top"
                    src={imagePath(t.product.thumbnail)}
                    alt="thumbnail"
                  />
                  <div className="card-body">
                    <p className="card-text">{t.webDisplayName}</p>
                    <Price amount={t.price} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (productListState.status === API_STATE.FAIL) {
      return (
        <div className="alert alert-danger">
          {productListState.errors.map(t => t.message || t.code).join("\n")}
        </div>
      );
    }
    return null;
  }, [productListState]);

  useEffect(() => {
    console.log(filter);
    getProductList(filter);
  }, [filter]);

  const scrollOptions = {
    scrollbars: {
      autoHide: "scroll",
    },
    paddingAbsolute: true,
  };

  return (
    <PosDispatchContext.Provider value={dispatch}>
      <div className="row">
        <div className="col-6 product-list-wrapper">
          <div className="filter">
            <div className="row">
              <div className="col">
                <input
                  className="form-control"
                  type="text"
                  value={filter.filter.search}
                  onChange={e => {
                    const { value } = e.target;
                    setFilter(prev => ({
                      ...prev,
                      filter: { search: value },
                    }));
                  }}
                />
              </div>
            </div>
          </div>

          <OverlayScrollbarsComponent
            className="product-list"
            options={scrollOptions}
          >
            {productList}
          </OverlayScrollbarsComponent>
        </div>
        <div className="col-6 p-0">
          <div className="order border-primary border">
            <PosOrderContext.Provider
              value={posState.orders[posState.currentOrder]}
            >
              <PosOrderForm />
            </PosOrderContext.Provider>
            <PosListOrderContext.Provider value={posState}>
              <PosListOrder />
            </PosListOrderContext.Provider>
          </div>
        </div>
      </div>
    </PosDispatchContext.Provider>
  );
};

POS.propTypes = {};

export default POS;
