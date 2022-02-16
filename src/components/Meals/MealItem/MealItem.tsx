import React from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import { MealObj } from '../AvailableMeals';
import { useContext } from 'react';
import CartContext from '../../../store/cart-context';

export const MealItem: React.FC<MealObj> = ({
  id,
  name,
  // amount,
  price,
  description,
}) => {
  const cartCtx = useContext(CartContext);
  const _price = price.toFixed(2);

  const addToCartHandler = (amount: number) => {
    cartCtx.addItem({
      id,
      name,
      amount,
      price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>${_price}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};
