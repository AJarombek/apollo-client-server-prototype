/**
 * Component representing detailed flower information.
 * @author Andrew Jarombek
 * @since 8/2/2020
 */

import React from 'react';
import {FlowerData} from "../../types";
import {AJButton, AJModal} from "jarombek-react-components";
import gql from "graphql-tag";
import {useQuery} from "react-apollo";
import classNames from "classnames";

const GET_FLOWER_DETAILS = gql`
    query flowerDetails($id: ID!) {
        flower(id: $id) {
            id
            name
            type
            price
            salePrice
            onSale
            count
            description
        }
    }
`;

interface IProps {
    flowerId: number;
}

const FlowerDetails: React.FunctionComponent<IProps> = ({ flowerId }) => {
    const { loading, data: { flower } = {} } = useQuery<FlowerData>(GET_FLOWER_DETAILS, {
        variables: { id: flowerId }
    });

    return (
        <AJModal className="flower-details-modal">
            {!loading && flower && (
                <div className="flower-details">
                    <div className="header">
                        <p className="name">{flower.name}</p>
                        <div className="header-info">
                            <p className="type">{flower.type}</p>
                            <p className="spread">&#x5e;</p>
                            <p
                                className={classNames(
                                    "price", flower.onSale ? "salePrice" : "normalPrice"
                                )}
                            >
                                ${flower.onSale ? flower.salePrice : flower.price}
                            </p>
                        </div>
                    </div>
                    <div className="body">
                        <div className="status">
                            {flower.count > 0 ? (
                                <>
                                    <p className="in-stock">&#xe052;</p>
                                    <p>In Stock</p>
                                </>
                            ): (
                                <>
                                    <p className="out-of-stock">&#xe051;</p>
                                    <p>Out of Stock</p>
                                </>
                            )}
                        </div>
                        <p>Quantity: {flower.count}</p>
                        <p>{flower.description}</p>
                    </div>
                    <div className="footer">
                        <AJButton type="contained" onClick={() => {}} disabled={false}>
                            Add to Cart
                        </AJButton>
                        <AJButton type="text" onClick={() => {}} disabled={false}>
                            Return
                        </AJButton>
                    </div>
                </div>
            )}
        </AJModal>
    );
};

export default FlowerDetails;
