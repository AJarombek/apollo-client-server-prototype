/**
 * Cart reducer used with a React hook.
 * @author Andrew Jarombek
 * @since 8/20/2020
 */

import {CartAction, CartItem} from "../types";

export const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
    if (action.type === 'add') {
        const existingItems = state.filter((item) => item.id === action.id);
        let newState;

        if (existingItems.length > 0) {
            newState = [
                ...state.filter((item) => item.id !== action.id),
                {
                    id: existingItems[0].id,
                    count: existingItems[0].count + 1
                }
            ]
        } else {
            newState = [
                ...state,
                {
                    id: action.id,
                    count: 1
                }
            ]
        }

        localStorage.setItem('cart', JSON.stringify(newState));
        return newState;
    }

    if (action.type === 'set') {

    }

    if (action.type === 'restore') {
        return action.items;
    }
};
