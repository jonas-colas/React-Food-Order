import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartCtx= useContext(CartContext);
  
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const itemsExist = cartCtx.items.length > 0;

  const cartItems = cartCtx.items?.map(item => <li>{ item.name}</li>);
  


  return (
    <Modal onClose={props.onClose}>
      <ul className={classes['cart-items']}>
        {cartItems}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose} >Close</button>
        {itemsExist && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
