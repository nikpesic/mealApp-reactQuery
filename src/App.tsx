import React, { useState, Suspense } from 'react';

const Header = React.lazy(() => import('./components/Layout/Header'));
const Meals = React.lazy(() => import('./components/Meals/Meals'));
const Cart = React.lazy(() => import('./components/Cart/Cart'));
const CartProvider = React.lazy(() => import('./store/CartProvider'));

export const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Suspense
      fallback={
        <p style={{ color: 'white', textAlign: 'center', fontSize: '1.5rem' }}>
          Loading....
        </p>
      }
    >
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>
          <Meals />
        </main>
      </CartProvider>
    </Suspense>
  );
};
