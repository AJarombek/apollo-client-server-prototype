/**
 * Component representing the front page of the flower shop.
 * @author Andrew Jarombek
 * @since 5/15/2020
 */

import React, {useEffect, useMemo, useReducer, useRef, useState} from 'react';
import {useQuery} from 'react-apollo';
import gql from 'graphql-tag';
import classNames from 'classnames';
import {Flower} from "../../types";
import FlowerCard from "../FlowerCard/FlowerCard";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import NotifyCount from "../NotifyCount/NotifyCount";

const GET_FLOWERS = gql`
    query allFlowers {
        flowers {
            id
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
                ...state.filter((item) => item.id !== action.id),
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

    const ref = useRef(null);

    const [stickyHeader, setStickyHeader] = useState(false);
    const [showFlowerDetails, setShowFlowerDetails] = useState(false);
    const [selectedFlower, setSelectedFlower] = useState(null);
    const [cart, dispatchCart] = useReducer(reducer, []);

    const handleScroll = () => {
        if (ref.current) {
            setStickyHeader(ref.current.getBoundingClientRect().top <= 0);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);

    const cartSize = useMemo(
        () => cart.reduce<number>((acc: number, item: CartItem) => acc + item.count, 0),
        [cart]
    );

    return (
        <div className="store-front" ref={ref}>
            <div
                className={
                    classNames("header", stickyHeader ? "header-sticky" : "header-dry")
                }
            >
                <h1>Jarombek Flower Store</h1>
                <div className="cart">
                    <div className="cart-icon">
                        <ShoppingCartOutlinedIcon/>
                        <p>Cart</p>
                    </div>
                    {!!cartSize && <NotifyCount count={cartSize} />}
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
