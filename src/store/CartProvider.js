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
        amount: existingCartItem.amount + action.payload.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemsIndex] = updatedItem;
    }else{
      updatedItems = state.items.concat(action.payload);
    }
    

    return {
      items: updatedItems,
      totalAmount: updatedTotal,
    };
  }

  if(action.type === 'REMOVE_ITEM') {
    const existingItemsIndex = state.items.findIndex((item) => item.id === action.id);  
    
    // debugger;
    const existingCartItem = state.items[existingItemsIndex];
    const updatedTotal = state.totalAmount - existingCartItem.price;

    let updatedItems;

    if(existingCartItem.amount === 1){
      updatedItems = state.items.filter(item => item.id !== action.id);
    }else{
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1
      };
      updatedItems = [...state.items];
      updatedItems[existingItemsIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotal,
    };
  }

  if(action.type === 'Clear_Cart') {
    return {
      items: [],  
      totalAmount: 0,
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
    dispatchCartAction({type: 'REMOVE_ITEM', id: id});
  };

  const clearCartHandler = () => {
    dispatchCartAction({type: 'Clear_Cart'});
  };

  const cartCxt = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemToCart,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartCxt}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
