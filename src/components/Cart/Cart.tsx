import React, { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import { ItemType } from '../../store/cart-context';
import Checkout from './Checkout';
import { OrderType } from './Checkout';
import axios from 'axios';
import { MealObj } from '../Meals/AvailableMeals';

const postMealsItem = async (userData: OrderType) => {
  try {
    const response = await axios.post(
      'https://mealapp-typescript-default-rtdb.firebaseio.com/orders.json',
      userData
    );
    return response;
  } catch (err) {
    console.log('Something went wrong');
  }
};

const Cart: React.FC<{ onClose: () => void }> = (props) => {
  const { mutate, isSuccess, isError, isLoading, error } =
    useMutation(postMealsItem);

  const [showCheckout, setShowCheckout] = useState(false);

  const cartCtx = useContext(CartContext);

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item: ItemType) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setShowCheckout(true);
  };

  const submitOrderHandler = (userData: OrderType) => {
    const postUserData: any = {
      orderedItems: cartCtx.items,
      user: userData,
    };
    mutate(postUserData);
  };

  const totalAmount = `$${cartCtx.totalAmount?.toFixed(2)}`;

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const hasItem = cartCtx.items.length > 0;

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout onClose={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!showCheckout && (
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onClose}>
            Close
          </button>
          {hasItem && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  const cartSubmittionContent = (
    <div className={classes.cartSubmit}>
      <p>SUBMITTING!</p>
    </div>
  );

  const didSubmitContent = (
    <div style={{ textAlign: 'center' }}>
      <h2 className={classes['cart_success-submit']}>Successfully submited!</h2>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {isError && <p className={classes.httpError}>{isError}</p>}
      {!isLoading && !isSuccess && !isError && cartModalContent}
      {isLoading && !isError && cartSubmittionContent}
      {isSuccess && !isError && didSubmitContent}
    </Modal>
  );
};

export default Cart;

// const [isSubmitting, setIsSubmitting] = useState(false);
// const [didSubmit, setDidSubmit] = useState(false);
// const [httpError, setHttpError] = useState('');

// const submitOrderHandler = async (userData: OrderType) => {
//   // setIsSubmitting(true);
//   try {
//     const response = await fetch(
//       'https://mealapp-835ab-default-rtdb.firebaseio.com/orders.json',
//       {
//         method: 'POST',
//         body: JSON.stringify({
//           orderedItems: cartCtx.items,
//           user: userData,
//         }),
//       }
//     );
//     // setDidSubmit(true);
//     cartCtx.clearItems();
//     if (!response.ok) {
//       throw new Error('Something went wrong!');
//     }
//   } catch (error: any) {
//     // setHttpError(error?.message);
//   }
//   // setIsSubmitting(false);
// };
