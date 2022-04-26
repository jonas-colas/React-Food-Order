import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if(action.type === 'ADD_ITEM') {
    
    const updatedTotal = state.totalAmount + action.payload.price * action.payload.amount;
    const existingItemsIndex = state.items.findIndex(item => item.id === action.payload.id);
    
    const existingCartItem = state.items[existingItemsIndex];
    
    // let updatedItem;
    let updatedItems;

    if(existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1 //action.payload.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemsIndex] = updatedItem;
    }else{
      // updatedItem = {...action.payload, amount: action.payload.amount};
      // updatedItems = [...state.items, updatedItem];
      updatedItems = state.items.concat(action.payload);
    }
    

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
