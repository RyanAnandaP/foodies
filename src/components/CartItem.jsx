import React from "react";
import { currencyFormatter } from "../util/Formatting";

const CartItem = ({ ...props }) => {
  return (
    <li className="cart-item">
      <p>
        {props.name} - {props.quantity} x{" "}
        {currencyFormatter.format(props.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={props.onDecrease}>-</button>
        <span>QTY</span>
        <button onClick={props.onIncrease}>+</button>
      </p>
    </li>
  );
};

export default CartItem;
