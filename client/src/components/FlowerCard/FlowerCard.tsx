/**
 * Component representing a card with information about a certain flower in the flower shop.
 * Love and support is always here for you.
 * @author Andrew Jarombek
 * @since 5/28/2020
 */

import React from 'react';
import {Flower} from "../../types";

interface IProps {
    flower: Flower
}

const FlowerCard: React.FunctionComponent<IProps> = ({ flower }) => {
    return (
        <div className="flower-card">
            <img src={`https://asset.apollo.proto.jarombek.com/${flower.image}`} alt="" />
            <h6>{flower.name}</h6>
        </div>
    );
};

export default FlowerCard;
