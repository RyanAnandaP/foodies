import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/Formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleCloseCart = () => {
    progressCtx.hideCart();
  };

  const handleGoToCheckout = () => {
    progressCtx.showCheckout();
  };
  
  return (
    <Modal
      className="cart"
      open={progressCtx.progress === "cart"}
      onClose={progressCtx.progress === 'cart' ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((items) => (
          <CartItem
            key={items.id}
            name={items.name}
            quantity={items.quantity}
            price={items.price}
            onIncrease={() => cartCtx.addItem(items)}
            onDecrease={() => cartCtx.removeItem(items.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
