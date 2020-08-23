/**
 * Types used throughout the front-end application
 * @author Andrew Jarombek
 * @since 7/30/2020
 */

export type PlantType = "ANNUAL" | "PERENNIAL" | "SHRUB";

export type Flower = {
    id: number;
    name: string;
    image: string;
    type: PlantType;
    inStock?: boolean;
    onSale?: boolean;
    count?: number;
    price?: number;
    salePrice?: number;
    description?: string;
}

export type FlowersData = {
    flowers: Flower[];
}

export type FlowerData = {
    flower: Flower;
}

export interface CartItem {
    id: number;
    count: number;
}

export type CartAddActionType = 'add';
export type CartRestoreActionType = 'restore';
export type CartSetActionType = 'set';
export type CartDeleteActionType = 'delete';
export type CartEmptyActionType = 'empty';

export interface CartAddAction {
    type: CartAddActionType;
    id: number;
}

export interface CartRestoreAction {
    type: CartRestoreActionType;
    items: CartItem[];
}

export interface CartSetAction {
    type: CartSetActionType;
    id: number;
    count: number;
}

export interface CartDeleteAction {
    type: CartDeleteActionType;
    id: number;
}

export interface CartEmptyAction {
    type: CartEmptyActionType;
}

export type CartAction =
    CartAddAction |
    CartRestoreAction |
    CartSetAction |
    CartDeleteAction |
    CartEmptyAction;
