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
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import NotifyCount from "../NotifyCount/NotifyCount";

const GET_FLOWERS = gql`
    query allFlowers {
        flowers {
            name
            image
            price
            salePrice
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
                <div className="cart">
                    <div className="cart-icon">
                        <ShoppingCartOutlinedIcon/>
                        <p>Cart</p>
                    </div>
                    <NotifyCount count={0} />
                </div>
            </div>
            <div className="body">
                {!loading && !!data && data.flowers.map((flower) => (
                    <FlowerCard flower={flower}/>
                ))}
            </div>
        </div>
    );
};

export default StoreFront;
