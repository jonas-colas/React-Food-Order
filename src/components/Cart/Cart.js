import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const itemsExist = cartCtx.items.length > 0;

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const resp = await fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          user: userData,
          orderedItems: cartCtx.items,
        }),
      });
  
      await resp.json();
      setSuccess(true);
      cartCtx.clearCart();
    } catch (error) {
      setError(error.message || 'Something went wrong');
    }
    setIsSubmitting(false);

  };

  // const errorHandler = () => <p className="error">{error}</p>

  const cartItems = cartCtx.items?.map((item) => (
    <CartItem
      key={item.id}
      {...item}
      onRemove={removeItemHandler.bind(null, item.id)}
      onAdd={addItemHandler.bind(null, item)}
    />
  ));

  return (
    <>
      {!isSubmitting && !success && 
        <Modal onClose={props.onClose}>
          <ul className={classes["cart-items"]}>{cartItems}</ul>
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          {isCheckout ? (
            <Checkout onCancel={props.onClose} onConfirm={orderHandler} />
            ) : (
            <div className={classes.actions}>
              <button className={classes["button--alt"]} onClick={props.onClose}>
                Close
              </button>
              {itemsExist && (
                <button
                className={classes.button}
                onClick={() => setIsCheckout(true)}
                >
                  Order
                </button>
              )}
            </div>
          )}
        </Modal>
      } 
      {isSubmitting && <p>Sending order data...</p> } 
      {!isSubmitting && success && <p>Successfully sent the order!</p> }
    </>
  );
};

export default Cart;
