import React from "react";
import classes from "./Card.module.css";

const Cart: React.FC = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Cart;
