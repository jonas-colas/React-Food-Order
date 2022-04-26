import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
  const cartCxt = useContext(CartContext);

  const priceFormatted = `$${props.price.toFixed(2)}`;

  const addToCartHandler = qty => {
    cartCxt.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: qty,
    });
  };
  

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{priceFormatted}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
