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

interface IProps {
    flower: Flower
}

const FlowerCard: React.FunctionComponent<IProps> = ({ flower }) => {
    return (
        <div className="flower-card">
            <img src={`/asset/${flower.image}`} alt="" onClick={() => {}} />
            <div className="content">
                <div className="details">
                    <h6 onClick={() => {}}>{flower.name}</h6>
                    <p>${flower.price}</p>
                </div>
                <div className="actions">
                    <AJTextButton>
                        <div className="add-to-cart">
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
