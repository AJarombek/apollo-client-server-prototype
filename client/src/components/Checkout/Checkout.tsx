/**
 * Component representing a page that allows users to checkout and purchase flowers in their cart.
 * @author Andrew Jarombek
 * @since 8/20/2020
 */

import React, {useEffect, useMemo, useReducer, useRef} from 'react';
import {useLazyQuery} from 'react-apollo';
import Header from "../Header";
import {cartReducer} from "../../reducers/cart";
import {CartItem, Flower} from "../../types";
import gql from "graphql-tag";
import CheckoutItem from "../CheckoutItem";
import {AJButton} from "jarombek-react-components";
import classNames from "classnames";

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
                <div className="cart-items">
                    <div>
                        {!loading && !!data && data.flowersIn.map((flower: Flower) => (
                            <CheckoutItem
                                key={flower.id}
                                flower={flower}
                                quantity={cart.filter(item => item.id === flower.id)[0].count}
                            />
                        ))}
                        <div className="grand-total">
                            <p>Total:</p>
                            <p>$0.00</p>
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <AJButton
                        type="contained"
                        onClick={() => {}}
                        disabled={!cartSize}
                        className={classNames(
                            cartSize ? "place-order-enabled" : "place-order-disabled"
                        )}
                    >
                        Place Order
                    </AJButton>
                    <AJButton
                        type="text"
                        onClick={() => {}}
                        disabled={false}
                    >
                        Continue Shopping
                    </AJButton>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
