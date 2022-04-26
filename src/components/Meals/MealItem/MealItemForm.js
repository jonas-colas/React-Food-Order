import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
  return (
    <form className={classes.form}>
      <Input label="Amount" input={{
        id: 'amount_' + props.id,
        type: 'number',
        value: props.amount,
        changed: props.changed,
        min: '1',
        max: '10',
        step: '1',
        defaultValue: '1'
      }} />
      <button>+ Add</button>
    </form>
  )
}

export default MealItemForm