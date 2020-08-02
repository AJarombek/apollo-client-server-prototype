/**
 * Component representing detailed flower information.
 * @author Andrew Jarombek
 * @since 8/2/2020
 */

import React from 'react';
import {Flower} from "../../types";

interface IProps {
    flower: Flower;
}

const FlowerDetails: React.FunctionComponent<IProps> = ({ flower }) => {
    return (
        <div className="flower-details">

        </div>
    );
};

export default FlowerDetails;
