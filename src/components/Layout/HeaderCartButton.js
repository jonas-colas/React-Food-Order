import { useContext, useEffect } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';
import { useState } from 'react';

const HeaderCartButton = props => {
  const ctx = useContext(CartContext);

  const [btnBump, setBtnBump] = useState(false);

  const { items } = ctx;

  const itemsQty = items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);

  const bntClasses = `${classes.button} ${btnBump ? classes.bump : ''}`;

  useEffect(() => {
    if(items.length === 0) {
      return;
    }
    setBtnBump(true);
    const timer = setTimeout(() => {
      setBtnBump(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  } , [items]);

  return (
    <button className={bntClasses} onClick={props.onClick} >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{itemsQty}</span>
    </button>
  )
};

export default HeaderCartButton;