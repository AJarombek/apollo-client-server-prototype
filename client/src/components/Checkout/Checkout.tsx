/**
 * Component representing a page that allows users to checkout and purchase flowers in their cart.
 * @author Andrew Jarombek
 * @since 8/20/2020
 */

import React, {useEffect, useMemo, useReducer, useRef} from 'react';
import {useLazyQuery} from 'react-apollo';
import Header from "../Header";
import {cartReducer} from "../../reducers/cart";
import {CartItem} from "../../types";
import gql from "graphql-tag";

const GET_FLOWERS_FOR_CHECKOUT = gql`
    query flowersForCheckout($in: [ID]!) {
        flowersIn(in: $in) {
            id
            name
            image
            price
            salePrice
            onSale
            count
        }
    }
`;

const Checkout: React.FunctionComponent = () => {
    const ref = useRef(null);

    const [getFlowers, { loading, data }] = useLazyQuery(GET_FLOWERS_FOR_CHECKOUT);

    const [cart, dispatchCart] = useReducer(cartReducer, []);

    useEffect(() => {
        const existingCart = localStorage.getItem('cart');

        if (existingCart) {
            dispatchCart({ type: 'restore', items: JSON.parse(existingCart) });
        }
    }, []);

    useEffect(() => {
        if (cart.length) {
            getFlowers({ variables: { in: cart.map(item => +item.id) } })
        }
    }, [cart]);

    const cartSize = useMemo(
        () => cart.reduce<number>((acc: number, item: CartItem) => acc + item.count, 0),
        [cart]
    );

    return (
        <div className="checkout" ref={ref}>
            <Header cartSize={cartSize} bodyRef={ref} />
            <div className="body">

            </div>
        </div>
    );
};

export default Checkout;
