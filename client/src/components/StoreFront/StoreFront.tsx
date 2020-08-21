/**
 * Component representing the front page of the flower shop.
 * @author Andrew Jarombek
 * @since 5/15/2020
 */

import React, {useEffect, useMemo, useReducer, useRef, useState} from 'react';
import {useQuery} from 'react-apollo';
import gql from 'graphql-tag';
import {Flower, FlowersData, CartItem} from "../../types";
import FlowerCard from "../FlowerCard/FlowerCard";
import FlowerDetails from "../FlowerDetails/FlowerDetails";
import Header from "../Header/Header";
import {cartReducer} from "../../reducers/cart";

const GET_FLOWERS = gql`
    query allFlowers {
        flowers {
            id
            name
            image
            price
            salePrice
            onSale
        }
    }
`;

const StoreFront: React.FunctionComponent = () => {
    const { loading, data } = useQuery<FlowersData>(GET_FLOWERS);

    const ref = useRef(null);

    const [showFlowerDetails, setShowFlowerDetails] = useState<boolean>(false);
    const [selectedFlower, setSelectedFlower] = useState<Flower>(null);

    const [cart, dispatchCart] = useReducer(cartReducer, []);

    useEffect(() => {
        const existingCart = localStorage.getItem('cart');

        if (existingCart) {
            dispatchCart({ type: 'restore', items: JSON.parse(existingCart) });
        }
    }, []);

    const cartSize = useMemo(
        () => cart.reduce<number>((acc: number, item: CartItem) => acc + item.count, 0),
        [cart]
    );

    return (
        <div className="store-front" ref={ref}>
            <Header cartSize={cartSize} bodyRef={ref} />
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
            {showFlowerDetails && (
                <FlowerDetails
                    flowerId={selectedFlower.id}
                    onClose={() => setShowFlowerDetails(false)}
                    onAddToCart={() => dispatchCart({ type: 'add', id: selectedFlower.id })}
                />
            )}
        </div>
    );
};

export default StoreFront;
