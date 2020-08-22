/**
 * Component for a checkout item (flower) that is about to be purchased.
 * @author Andrew Jarombek
 * @since 8/21/2020
 */

import React, {useEffect, useState} from 'react';
import {Flower} from "../../types";

interface IProps {
    flower?: Flower;
    quantity: number;
    cartSet: (id: number, count: number) => void;
    cartDelete: (id: number) => void;
}

const CheckoutItem: React.FunctionComponent<IProps> = ({
    flower,
    quantity,
    cartSet,
    cartDelete
}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(quantity);
    }, [quantity]);

    const onChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newCount = +e.target.value;

        if (newCount > flower.count) {
            newCount = flower.count;
        }

        if (newCount < 0) {
            newCount = 0;
        }

        cartSet(flower.id, newCount);
        setCount(newCount);
    };

    if (quantity === -1) {
        return null;
    } else {
        return (
            <div className="checkout-item">
                <p className="remove-icon" onClick={() => cartDelete(flower.id)}>&#x4d;</p>
                <img src={`/asset/${flower.image}`} alt="" />
                <div className="details">
                    <p className="flower-name">{flower.name}</p>
                    <div className="flower-quantity">
                        <p>Qty:</p>
                        <input
                            type="number"
                            value={count}
                            step={1}
                            max={flower.count}
                            min={0}
                            onChange={onChangeQuantity}
                        />
                    </div>
                    <div className="flower-prices">
                        <p>${flower.price}</p>
                        {flower.onSale && <p>${flower.salePrice}</p>}
                    </div>
                </div>
                <p className="total-cost">
                    ${((flower.onSale ? flower.salePrice : flower.price) * count).toFixed(2)}
                </p>
            </div>
        );
    }
};

export default CheckoutItem;
