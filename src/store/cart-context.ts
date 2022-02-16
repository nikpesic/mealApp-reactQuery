import React from 'react';

export type ItemType = {
  id: string;
  name: string;
  amount: number;
  description?: string;
  price: number;
};

export type CartContextType = {
  items: ItemType[];
  totalAmount?: number;
  addItem: (item: ItemType) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
};

const contextDefaultValues: CartContextType = {
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearItems: () => {},
};

const CartContext = React.createContext<CartContextType>(contextDefaultValues);

export default CartContext;
