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
            <p>&#x4d;</p>
            <img src={`/asset/${flower.image}`} alt="" />
            <div>
                <p>{flower.name}</p>
                <div>
                    <p>Qty:</p>
                    <input type="number" value={quantity} max={flower.count} onClick={() => {}} />
                    <div>
                        <p>${flower.price}</p>
                        {flower.onSale && <p>${flower.salePrice}</p>}
                    </div>
                </div>
            </div>
            <p>${(flower.onSale ? flower.salePrice : flower.price) * quantity}</p>
        </div>
    );
};

export default CheckoutItem;
