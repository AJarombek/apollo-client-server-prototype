/**
 * Component representing the front page of the flower shop.
 * @author Andrew Jarombek
 * @since 5/15/2020
 */

import React, {useMemo, useReducer, useState} from 'react';
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

interface CartItem {
    id: number;
    count: number;
}

type CartActionTypes = 'add'
interface CartAction {
    type: CartActionTypes;
    id: number;
}

const reducer = (state: CartItem[], action: CartAction): CartItem[] => {
    if (action.type === 'add') {
        const existingItems = state.filter((item) => item.id === action.id);

        if (existingItems.length > 0) {
            return [
                ...state,
                {
                    id: existingItems[0].id,
                    count: existingItems[0].count + 1
                }
            ]
        } else {
            return [
                ...state,
                {
                    id: action.id,
                    count: 1
                }
            ]
        }
    }
};

const StoreFront: React.FunctionComponent = () => {
    const { loading, data } = useQuery<FlowersData>(GET_FLOWERS);

    const [showFlowerDetails, setShowFlowerDetails] = useState(false);
    const [selectedFlower, setSelectedFlower] = useState(null);
    const [cart, dispatchCart] = useReducer(reducer, []);

    const cartSize = useMemo(
        () => cart.reduce<number>((acc: number, item: CartItem) => acc + item.count, 0),
        [cart]
    );

    return (
        <div className="store-front">
            <div className="header">
                <h1>Jarombek Flower Store</h1>
                <div className="cart">
                    <div className="cart-icon">
                        <ShoppingCartOutlinedIcon/>
                        <p>Cart</p>
                    </div>
                    {cartSize && <NotifyCount count={cartSize} />}
                </div>
            </div>
            <div className="body">
                {!loading && !!data && data.flowers.map((flower) => (
                    <FlowerCard
                        flower={flower}
                        onShowDetails={() => {
                            setSelectedFlower(flower);
                            setShowFlowerDetails(true);
                        }}
                        onAddToCart={() => dispatchCart({ type: 'add', id: flower.id })}
                    />
                ))}
            </div>
        </div>
    );
};

export default StoreFront;
