/**
 * Component representing a card with information about a certain flower in the flower shop.
 * Love and support is always here for you.
 * @author Andrew Jarombek
 * @since 5/28/2020
 */

import React from 'react';
import {Flower} from "../../types";
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import {AJTextButton} from "jarombek-react-components";
import classNames from "classnames";

interface IProps {
    flower: Flower;
    onShowDetails: (event: React.MouseEvent<HTMLElement>) => any;
    onAddToCart: (event: React.MouseEvent<HTMLDivElement>) => any;
}

const FlowerCard: React.FunctionComponent<IProps> = ({ flower, onShowDetails, onAddToCart }) => {
    return (
        <div className="flower-card">
            <img src={`/asset/${flower.image}`} alt="" onClick={onShowDetails} />
            <div className="content">
                <div className="details">
                    <h6 onClick={onShowDetails}>{flower.name}</h6>
                    <div className={classNames("prices", flower.onSale && "sale-prices")}>
                        <p>${flower.price}</p>
                        {flower.onSale && <p>${flower.salePrice}</p>}
                    </div>
                </div>
                <div className="actions">
                    <AJTextButton>
                        <div className="add-to-cart" onClick={onAddToCart}>
                            <p>Add to Cart</p>
                            <AddRoundedIcon />
                        </div>
                    </AJTextButton>
                </div>
            </div>
        </div>
    );
};

export default FlowerCard;
