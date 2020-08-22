/**
 * Component for a checkout item (flower) that is about to be purchased.
 * @author Andrew Jarombek
 * @since 8/21/2020
 */

import React from 'react';
import {Flower} from "../../types";

interface IProps {
    flower?: Flower;
    quantity: number;
}

const CheckoutItem: React.FunctionComponent<IProps> = ({ flower, quantity }) => {
    return (
        <div className="checkout-item">
            <p className="remove-icon">&#x4d;</p>
            <img src={`/asset/${flower.image}`} alt="" />
            <div className="details">
                <p className="flower-name">{flower.name}</p>
                <div className="flower-quantity">
                    <p>Qty:</p>
                    <input type="number" value={quantity} max={flower.count} onClick={() => {}} />
                </div>
                <div className="flower-prices">
                    <p>${flower.price}</p>
                    {flower.onSale && <p>${flower.salePrice}</p>}
                </div>
            </div>
            <p className="total-cost">
                ${(flower.onSale ? flower.salePrice : flower.price) * quantity}
            </p>
        </div>
    );
};

export default CheckoutItem;
