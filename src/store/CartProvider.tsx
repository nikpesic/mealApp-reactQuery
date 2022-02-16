import React, { useReducer } from 'react';
import CartContext from './cart-context';
import { CartContextType } from './cart-context';
import { ItemType } from './cart-context';

export type defaultStateType = {
  items: ItemType[];
  totalAmount: number;
};

type ACTIONTYPE =
  | { type: 'ADD'; payload: ItemType }
  | {
      type: 'REMOVE';
      payload: string;
    }
  | { type: 'CLEAR' };

const defaultCartState: defaultStateType = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state: defaultStateType, action: ACTIONTYPE) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.payload.amount * action.payload.price;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.payload.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.payload.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.payload);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.payload
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.payload);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'CLEAR') {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider: React.FC<React.ReactNode> = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = React.useCallback(
    (item: ItemType) => {
      dispatchCartAction({ type: 'ADD', payload: item });
    },
    [dispatchCartAction]
  );

  const removeItemFromCartHandler = React.useCallback(
    (id: string) => {
      dispatchCartAction({ type: 'REMOVE', payload: id });
    },
    [dispatchCartAction]
  );

  const clearItemsHandler = React.useCallback(() => {
    dispatchCartAction({ type: 'CLEAR' });
  }, [dispatchCartAction]);

  const cartContext: CartContextType = React.useMemo(() => {
    return {
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: addItemToCartHandler,
      removeItem: removeItemFromCartHandler,
      clearItems: clearItemsHandler,
    };
  }, [
    cartState.items,
    cartState.totalAmount,
    addItemToCartHandler,
    removeItemFromCartHandler,
    clearItemsHandler,
  ]);

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
