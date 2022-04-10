import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { toast } from "react-toastify";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import debounce from "lodash/debounce";
import { API_STATE, useApi } from "../../../../libs/hooks/useApi";
import EcommerceProductApi from "../../../../libs/apis/ecommerce/ecommerce-product.api";
import Price from "../../../../components/common/Price";
import { cloudImageUrl } from "../../../../libs/apis/image.api";
import "./pos.scss";
import { addProduct, posInitialState, posReducer } from "./pos.reduce";
import {
  PosDispatchContext,
  PosListOrderContext,
  PosOrderContext,
} from "./pos.context";
import PosListOrder from "./pos-list-order";
import PosOrderForm from "./pos-order.form";
import { PRODUCT_CACHE_LRU } from "./constants";

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
      console.log(PRODUCT_CACHE_LRU);
      if (PRODUCT_CACHE_LRU.has(product.id)) {
        return dispatch(addProduct(PRODUCT_CACHE_LRU.get(product.id)));
      }
      return EcommerceProductApi.read(product.id)
        .then(t => {
          PRODUCT_CACHE_LRU.set(t.id, t);
          return dispatch(addProduct(t));
        })
        .catch(e => {
          let message;
          if (e && e.errors && e.errors.length) {
            message = e.errors.map(t => t.message || t.code).join("\n");
          } else if (e.error) {
            // eslint-disable-next-line prefer-destructuring
            message = e.error.message;
          } else {
            message = e.message || e.statusText;
          }
          toast.error(message);
        });
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
                    src={cloudImageUrl(t.thumbnail)}
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
  }, [productListState, onProductClick]);

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
                  placeholder="Tìm kiếm sản phẩm"
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
