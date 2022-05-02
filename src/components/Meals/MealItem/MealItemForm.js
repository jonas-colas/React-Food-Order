import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
  const qtyInputRef = useRef();

  const [qtyIsValid, setQtyIsValid] = useState(true);

  const submitHandler = e => {
    e.preventDefault();
    
    const enteredQty = qtyInputRef.current.value;
    const enteredQtyNumber = +enteredQty;

    if(enteredQty.trim().length === 0 || enteredQtyNumber < 1 || enteredQtyNumber > 5) {
      setQtyIsValid(false);
      return;
    }

    props.onAddToCart(enteredQtyNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input 
        ref={qtyInputRef}
        value={qtyIsValid}
        label="Amount" 
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          value: props.amount,
          changed: props.changed,
          min: '1',
          max: '10',
          step: '1',
          defaultValue: '1'
        }}
      />
      <button>+ Add</button>
      {!qtyInputRef && <p>Please enter a valid qty(1-5)</p>}
    </form>
  )
}

export default MealItemForm