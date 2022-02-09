import React from "react";
import { Button } from "reactstrap";

import s from "./CartNotification.module.scss";
import OrderProduct from "./OrderProduct";
// import useSocketIO from '../../libs/hooks/partner/socket';

const CartNotification = () => (
  <section className={`${s.notifications} navbar-notifications`}>
    <header className={[s.cardHeader, "card-header"].join(" ")}>
      <div className="text-center mb-0">
        <strong>You have 13 notifications</strong>
      </div>
    </header>
    <OrderProduct />
    <footer className={[s.cardFooter, "text-center", "card-footer"].join(" ")}>
      <Button
        outline
        color="warning"
        className="py-0"
        id="load-notifications-btn"
      >
        <i className="fa fa-shopping-cart" /> Check out
      </Button>
    </footer>
  </section>
);

CartNotification.propTypes = {};

export default CartNotification;
