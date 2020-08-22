/**
 * Cart reducer used with a React hook.
 * @author Andrew Jarombek
 * @since 8/20/2020
 */

import {
    CartAction,
    CartAddAction,
    CartDeleteAction,
    CartItem,
    CartRestoreAction,
    CartSetAction
} from "../types";

export const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
    switch (action.type) {
        case "add":
            return cartAddReducer(state, action);
        case "restore":
            return cartRestoreReducer(state, action);
        case "set":
            return cartSetReducer(state, action);
        case "delete":
            return cartDeleteReducer(state, action);
    }
};

const cartAddReducer = (state: CartItem[], action: CartAddAction) => {
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
};

const cartSetReducer = (state: CartItem[], action: CartSetAction) => {
    const newState = [...state];

    const item = state.filter((item) => item.id === action.id)[0];
    item.count = action.count;

    return newState;
};

const cartRestoreReducer = (state: CartItem[], action: CartRestoreAction) => {
    return action.items;
};

const cartDeleteReducer = (state: CartItem[], action: CartDeleteAction) => {
    return state.filter((item) => item.id !== action.id);
};
