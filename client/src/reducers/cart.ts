/**
 * Cart reducer used with a React hook.
 * @author Andrew Jarombek
 * @since 8/20/2020
 */

import { CartAction, CartAddAction, CartItem, CartRestoreAction, CartSetAction } from '../types';

const cartAddReducer = (state: CartItem[], action: CartAddAction): CartItem[] => {
  const existingItems = state.filter((item) => item.id === action.id);
  let newState;

  if (existingItems.length > 0) {
    newState = [
      ...state.filter((item) => item.id !== action.id),
      {
        id: existingItems[0].id,
        count: existingItems[0].count + 1
      }
    ];
  } else {
    newState = [
      ...state,
      {
        id: action.id,
        count: 1
      }
    ];
  }

  localStorage.setItem('cart', JSON.stringify(newState));
  return newState;
};

const cartSetReducer = (state: CartItem[], action: CartSetAction): CartItem[] => {
  const newState = [...state];

  const item = newState.filter((item) => item.id === action.id)[0];
  item.count = action.count;

  localStorage.setItem('cart', JSON.stringify(newState.filter((item) => item.count >= 0)));
  return newState;
};

const cartRestoreReducer = (state: CartItem[], action: CartRestoreAction): CartItem[] => {
  return action.items;
};

export const cartEmptyReducer = (): CartItem[] => {
  localStorage.setItem('cart', JSON.stringify([]));
  return [];
};

export const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'add':
      return cartAddReducer(state, action);
    case 'restore':
      return cartRestoreReducer(state, action);
    case 'set':
      return cartSetReducer(state, action);
    case 'empty':
      return cartEmptyReducer();
  }
};
