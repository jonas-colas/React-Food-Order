import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if(action.type === 'ADD_ITEM') {
    const updatedItems = state.items.concat(action.payload);
    const updatedTotal = state.totalAmount + action.payload.price * action.payload.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotal,
    };
  }
  return defaultCartState;
};


const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCart = (item) => {
    dispatchCartAction({type: 'ADD_ITEM', payload: item});
  };
  
  const removeItemToCart = (id) => {
    dispatchCartAction({type: 'REMOVE_ITEM', payload: id});
  };

  const cartCxt = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemToCart,
  };

  return (
    <CartContext.Provider value={cartCxt}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
