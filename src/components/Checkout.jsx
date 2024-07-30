import React, { useContext, useState } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/Formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Error from "./Error";

const Checkout = () => {
  const [isNotValidPostal, setIsNotValidPostal] = useState(false);
  const [isNotValidEmail, setIsNotValidEmail] = useState(false);
  const [fetched, setFetched] = useState(false)
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(UserProgressContext);


  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleCloseModal = () => {
    progressCtx.hideCheckout();
  };

  const finishedOrder = () => {
    progressCtx.hideCheckout();
    cartCtx.clearCart()
  }

  const validatePostalCode = (event) => {
    const newPostalCode = event.target.value;
    if (newPostalCode === "") {
      setIsNotValidPostal(false);
    } else if (/^\d+$/.test(newPostalCode)) {
      setIsNotValidPostal(false);
    } else {
      setIsNotValidPostal(true);
    }
  };

  const validateEmail = (event) => {
    const userInput = event.target.value;

    if (userInput === "") {
      setIsNotValidEmail(false);
    } else if (userInput.includes("@")) {
      setIsNotValidEmail(false);
    } else {
      setIsNotValidEmail(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network Response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setFetched(data)
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation: ", error);
      });
  };

  let warningInput = <p className="postal-code-warning">...</p>;

  if (isNotValidEmail) {
    warningInput = <p className="postal-code-warning">Make sure to put '@'</p>;
  } else if (isNotValidPostal) {
    warningInput = (
      <p className="postal-code-warning">Make sure to put a number</p>
    );
  } else {
    warningInput = "";
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseModal}>
        Close
      </Button>
      <Button type="submit">Submit Order</Button>
    </>
  );

  if (fetched) {
    return (
      <Modal open={progressCtx.progress === "checkout"} onClose={finishedOrder}>
        <h2>Order Created!</h2>
        <p>Please sit tight and wait your order to be deliver patiently</p>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={finishedOrder}>
            Close
          </Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progressCtx.progress === "checkout"} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input
          label="Email Address"
          type="email"
          id="email"
          onChange={validateEmail}
        />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input
            label="Postal Code"
            type="text"
            id="postal-code"
            onChange={validatePostalCode}
          />
          <Input label="City" type="text" id="city" />
        </div>

        <div>{warningInput}</div>

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
