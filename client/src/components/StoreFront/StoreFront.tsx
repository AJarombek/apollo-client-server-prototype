/**
 * Component representing the front page of the flower shop.
 * @author Andrew Jarombek
 * @since 5/15/2020
 */

import React from 'react';
import {useQuery} from 'react-apollo';
import gql from 'graphql-tag';
import {Flower} from "../../types";
import FlowerCard from "../FlowerCard/FlowerCard";

const GET_FLOWERS = gql`
    query allFlowers {
        flowers {
            name
            image
        }
    }
`;

interface FlowersData {
    flowers: Flower[]
}

const StoreFront: React.FunctionComponent = () => {
    const { loading, data } = useQuery<FlowersData>(GET_FLOWERS);

    return (
        <div className="store-front">
            <div className="header">
                <h1>Jarombek Flower Store</h1>
            </div>
            <div className="body">
                {!loading && data.flowers.map((flower) => (
                    <FlowerCard flower={flower}/>
                ))}
            </div>
        </div>
    );
};

export default StoreFront;
