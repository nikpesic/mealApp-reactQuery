import React, { useRef } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

type MealItemFormType = {
  id: string;
  onAddToCart: (amountNum: number) => void;
};

const MealItemForm: React.FC<MealItemFormType> = (props) => {
  const amountInputRef = useRef<HTMLInputElement>(null);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current!.value;
    const enteredAmountNumber = Number(enteredAmount);

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    )
      return;

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+Add</button>
    </form>
  );
};

export default MealItemForm;
