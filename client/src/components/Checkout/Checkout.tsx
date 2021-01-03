/**
 * Component representing a page that allows users to checkout and purchase flowers in their cart.
 * @author Andrew Jarombek
 * @since 8/20/2020
 */

import React, { useEffect, useMemo, useReducer, useRef } from 'react';
import { useLazyQuery, useMutation, ExecutionResult } from 'react-apollo';
import Header from '../Header';
import { cartReducer } from '../../reducers/cart';
import { CartItem, Flower } from '../../types';
import gql from 'graphql-tag';
import CheckoutItem from '../CheckoutItem';
import { AJButton } from 'jarombek-react-components';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

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

const PURCHASE_FLOWERS = gql`
  mutation purchaseFlowers($purchases: [FlowerPurchase]!) {
    purchaseFlowers(purchases: $purchases)
  }
`;

const Checkout: React.FunctionComponent = () => {
  const history = useHistory();

  const ref = useRef(null);

  const [getFlowers, { loading, data }] = useLazyQuery(GET_FLOWERS_FOR_CHECKOUT);

  const [purchaseFlowers] = useMutation(PURCHASE_FLOWERS, {
    onCompleted() {
      dispatchCart({ type: 'empty' });
      history.push('/');
    }
  });

  const [cart, dispatchCart] = useReducer(cartReducer, []);

  useEffect(() => {
    const existingCart = localStorage.getItem('cart');

    if (existingCart) {
      dispatchCart({ type: 'restore', items: JSON.parse(existingCart) });
    }
  }, []);

  useEffect(() => {
    if (cart.length) {
      getFlowers({ variables: { in: cart.map((item) => +item.id) } });
    }
  }, [cart, getFlowers]);

  const cartSize = useMemo(
    () => cart.reduce<number>((acc: number, item: CartItem) => acc + Math.max(item.count, 0), 0),
    [cart]
  );

  const totalCost = useMemo(() => {
    if (cart && data?.flowersIn) {
      return cart.reduce<number>((total: number, item: CartItem) => {
        const flower: Flower = data.flowersIn.filter((flower: Flower) => flower.id === item.id)[0];

        return total + Math.max(item.count, 0) * (flower.onSale ? flower.salePrice : flower.price);
      }, 0);
    } else {
      return 0;
    }
  }, [cart, data]);

  const sortFlowers = (flowerA: Flower, flowerB: Flower): number => {
    const a = flowerA.name.toLowerCase();
    const b = flowerB.name.toLowerCase();

    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <div className="checkout" ref={ref}>
      <Header cartSize={cartSize} bodyRef={ref} />
      <div className="body">
        <div className="cart-items">
          <div>
            {!loading &&
              !!data &&
              data.flowersIn
                .sort(sortFlowers)
                .map((flower: Flower) => (
                  <CheckoutItem
                    key={flower.id}
                    flower={flower}
                    quantity={(cart.filter((item) => item.id === flower.id)[0] ?? {}).count}
                    cartSet={(id, count): void => dispatchCart({ type: 'set', id, count })}
                    cartDelete={(id): void => dispatchCart({ type: 'set', id, count: -1 })}
                  />
                ))}
            <div className="grand-total">
              <p>Total:</p>
              <p>${totalCost.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="actions">
          <AJButton
            type="contained"
            onClick={(): Promise<ExecutionResult> =>
              purchaseFlowers({
                variables: {
                  purchases: cart.filter((item: CartItem) => item.count > 0)
                }
              })
            }
            disabled={!cartSize}
            className={classNames(cartSize ? 'place-order-enabled' : 'place-order-disabled')}
          >
            Place Order
          </AJButton>
          <AJButton type="text" onClick={(): void => history.push('/')} disabled={false}>
            Continue Shopping
          </AJButton>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
