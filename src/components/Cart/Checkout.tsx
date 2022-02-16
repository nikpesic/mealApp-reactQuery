import useInput from '../../hooks/use-input';
import classes from './Checkout.module.css';

export type OrderType = {
  [key: string]: string;
};

export type CheckoutProps = {
  onConfirm: (order: OrderType) => void;
  onClose: () => void;
};

const Checkout: React.FC<CheckoutProps> = (props) => {
  const {
    value: nameInput,
    isValid: nameInputIsValid,
    hasError: nameInputHasError,
    reset: nameInputReset,
    enteredValueHandler: nameInputHandler,
    enteredValueBlurHandler: nameInputBlurHandler,
  } = useInput((value) => value.trim() !== '');

  const {
    value: streetInput,
    isValid: streetInputIsValid,
    hasError: streetInputHasError,
    reset: streetInputReset,
    enteredValueHandler: streetInputHandler,
    enteredValueBlurHandler: streetInputBlurHandler,
  } = useInput((value) => value.trim() !== '');

  const {
    value: postalInput,
    isValid: postalInputIsValid,
    hasError: postalInputHasError,
    reset: postalInputReset,
    enteredValueHandler: postalInputHandler,
    enteredValueBlurHandler: postalInputBlurHandler,
  } = useInput((value) => value.trim() !== '');

  const {
    value: cityInput,
    isValid: cityInputIsValid,
    hasError: cityInputHasError,
    reset: cityInputReset,
    enteredValueHandler: cityInputHandler,
    enteredValueBlurHandler: cityInputBlurHandler,
  } = useInput((value) => value.trim() !== '');

  let formIsValid = false;
  if (
    nameInputIsValid &&
    streetInputIsValid &&
    postalInputIsValid &&
    cityInputIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      nameInputHasError ||
      streetInputHasError ||
      postalInputHasError ||
      cityInputHasError
    ) {
      return;
    }

    props.onConfirm({
      name: nameInput,
      street: streetInput,
      postalCode: postalInput,
      city: cityInput,
    });

    nameInputReset();
    streetInputReset();
    postalInputReset();
    cityInputReset();
  };

  const nameControlClasses = nameInputHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const streetControlClasses = streetInputHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const postalControlClasses = postalInputHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const cityControlClasses = cityInputHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameInputHandler}
          onBlur={nameInputBlurHandler}
          value={nameInput}
        />
        {nameInputHasError && (
          <p className={classes.errormsg}>Please entered valid name!</p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input
          type='text'
          id='street'
          onChange={streetInputHandler}
          onBlur={streetInputBlurHandler}
          value={streetInput}
        />
        {streetInputHasError && (
          <p className={classes.errormsg}>Please entered valid street!</p>
        )}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postalCode'>Postal Code</label>
        <input
          type='text'
          id='postalCode'
          onChange={postalInputHandler}
          onBlur={postalInputBlurHandler}
          value={postalInput}
        />
        {postalInputHasError && (
          <p className={classes.errormsg}>Please entered valid postal code!</p>
        )}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          onChange={cityInputHandler}
          onBlur={cityInputBlurHandler}
          value={cityInput}
        />
        {cityInputHasError && (
          <p className={classes.errormsg}>Please entered valid city!</p>
        )}
      </div>

      <div className={classes.actions}>
        <button
          type='button'
          className={classes.btnCancel}
          onClick={props.onClose}
        >
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
