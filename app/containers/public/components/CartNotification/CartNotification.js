import React from "react";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import s from "./CartNotification.module.scss";
import OrderProduct from "./OrderProduct";

const CartNotification = () => {
  const history = useHistory();
  const { publicId } = useParams();
  const { products } = useSelector(state => state.shop);
  return React.useMemo(
    () => (
      <section className={`${s.notifications} navbar-notifications`}>
        <header className={[s.cardHeader, "card-header"].join(" ")}>
          <div className="text-center mb-0">
            <strong>
              Order Product{" "}
              {products && products.length > 0 ? products?.length : 0} total
            </strong>
          </div>
        </header>
        <OrderProduct products={products} />
        <footer
          className={[s.cardFooter, "text-center", "card-footer"].join(" ")}
        >
          <Button
            outline
            color="warning"
            className="py-0"
            id="load-notifications-btn"
            onClick={() => {
              history.push(`/cpm/${publicId}/order`);
            }}
          >
            <i className="fa fa-shopping-cart" /> Check out
          </Button>
        </footer>
      </section>
    ),
    [products],
  );
};

CartNotification.propTypes = {};

export default CartNotification;
