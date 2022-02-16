import { ItemType } from '../../store/cart-context';
import classes from './CartItem.module.css';

type CartItemType = {
  price: number;
  name: string;
  amount: number;
  // ?
  onRemove: (id: any) => void;
  onAdd: (item: any) => void;
};

const CartItem: React.FC<CartItemType> = (props) => {
  const price = `$${Number(props.price).toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
