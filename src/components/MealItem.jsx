import React, { useContext, useState, useEffect } from "react";
import { currencyFormatter } from "../util/Formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import ModalSuccess from "./UI/ModalSuccess";

const MealItem = ({ meal }) => {
  const cartCtx = useContext(CartContext);

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    console.log("Is added status: ", isAdded);
  }, [isAdded]);

  const handleAddMealToCart = () => {
    cartCtx.addItem(meal);
    setIsAdded(true);
  };

  const handleCloseModal = (event) => {
    if(event.target.closest("#modal-success") === null){
      setIsAdded(false)
    }
  };

  return (
    <>
      {isAdded && <ModalSuccess open={isAdded} onClose={() => handleCloseModal} />}
      <li className="meal-item">
        <article>
          <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
          <div>
            <h3>{meal.name}</h3>
            <p className="meal-item-price">
              {currencyFormatter.format(meal.price)}
            </p>
            <p className="meal-item-description">{meal.description}</p>
          </div>
          <p className="meal-item-actions">
            <Button onClick={handleAddMealToCart}>Add to Cart</Button>
          </p>
        </article>
      </li>
    </>
  );
};

export default MealItem;
