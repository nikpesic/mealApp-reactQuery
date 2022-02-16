import { useState } from 'react';

const useInput = (validateInput: (enteredValue: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateInput(enteredValue);

  const hasError = !isValid && isTouched;

  const enteredValueHandler = (event: React.FormEvent<HTMLElement>) => {
    let inputTarget = event.target as HTMLButtonElement;
    setEnteredValue(inputTarget.value);
  };

  const enteredValueBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isTouched,
    isValid,
    hasError,
    reset,
    enteredValueHandler,
    enteredValueBlurHandler,
  };
};

export default useInput;
