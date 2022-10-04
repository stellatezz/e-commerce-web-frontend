import React, { useReducer, createContext, useEffect } from "react";
import axios from 'axios';

export const CartStateContext = createContext();
export const CartDispatchContext = createContext();

const cartInitState = {
  cartItems:[],
  totalAmount: 0.0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
      let cartItems = null;
      let totalAmount = 0;
      action.item = {
        name: action.item.name,
        pid: action.item.pid,
        price: action.item.price,
        quantity: action.item.quantity,
      }
      let pid = action.item.pid;
      let isExist = state.cartItems.map((item) => item.pid).includes(pid);
      if (isExist) {
        let items = state.cartItems.map((item) => {
          if (item.pid === pid) {
            return {
              ...item,
              quantity: parseInt(item.quantity) + 1
            };
          }
          return item;
        });
        cartItems = [...items];
      } else {
        cartItems = [...state.cartItems, action.item];
      }
      totalAmount = cartItems.map(item => item.price*item.quantity).reduce((prev, curr) => prev + curr, 0);
      setLocalStorage(cartItems);
      return {
        cartItems: cartItems,
        totalAmount: totalAmount.toFixed(2),
      };
    case 'EDIT_PRODUCT':
      let cartItemsE = null;
      let itemId = action.itemId;
      let quantity = action.quantity;
      if (quantity >= 1) {
        let items = state.cartItems.map((item) => {
          if (item.pid === itemId) {
            if (action.name) {
              return {
                ...item,
                name: action.name,
                price: action.price,
                quantity: quantity
              };
            } else {
              return {
                ...item,
                quantity: quantity
              };
            }
          }
          return item;
        });
        cartItemsE = [...items];
      } else {
        let items = state.cartItems.filter(
          (item) => item.pid !== itemId
        )
        cartItemsE = [...items];
      }
      let totalAmountE = cartItemsE.map(item => item.price*item.quantity).reduce((prev, curr) => prev + curr, 0);
      setLocalStorage(cartItemsE);
      return {
        cartItems: cartItemsE,
        totalAmount: totalAmountE.toFixed(2),
      };
    case 'CLEAR_PRODUCT':
      setLocalStorage([]);
      return {
        cartItems:[],
        totalAmount: 0.0,
      };
    default:
      throw new Error();
  };
};

function setLocalStorage(value) {
  let temp = value.map((item)=> {return {pid: item.pid, quantity: item.quantity}})
  try {
    window.localStorage.setItem('cartItems', JSON.stringify(temp));
  } catch (error) {
    throw error;
  }
}

export function addCartItem(dispatch, item) {
  let newitem = { ...item, quantity: 1 }
  return dispatch({
    type: "ADD_PRODUCT",
    item: newitem
  });
};

export function editCartItem(dispatch, itemId, quantity) {
  return dispatch({
    type: "EDIT_PRODUCT",
    itemId: itemId,
    quantity: quantity
  });
};

export function clearCartItem(dispatch) {
  return dispatch({
    type: "CLEAR_PRODUCT",
  });
};

export default function CartProvider({children}) {
  let localStorageItem = window.localStorage.getItem('cartItems');
  
  const fetchProducts = async (productId, quantity) => {
    await axios.get(`https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/products/${productId}`).then(({data})=>{
      dispatch({
        type: "EDIT_PRODUCT",
        itemId: data[0].pid,
        name: data[0].name,
        price: data[0].price,
        quantity: quantity
      });
    })
  }

  if (localStorageItem) {
    let localCartItems = JSON.parse(localStorageItem);
    localStorageItem = { cartItems: localCartItems, totalAmount: 0.0};
  } else {
    localStorageItem = cartInitState;
  }
  const [state, dispatch] = useReducer(reducer, localStorageItem);

  useEffect(() => {
    localStorageItem.cartItems.map((item) => {
      fetchProducts(item.pid, item.quantity);
    });
  }, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}
