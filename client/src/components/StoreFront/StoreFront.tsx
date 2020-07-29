/**
 * Component representing the front page of the flower shop.
 * @author Andrew Jarombek
 * @since 5/15/2020
 */

import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_FLOWERS = gql`
    query allFlowers {
        flowers {
            name
            url
        }
    }
`;

const StoreFront: React.FunctionComponent = () => {
    return (
        <Query query={GET_FLOWERS}>
            { () => (
                <div className="store-front">
                    <div className="header">
                        <h1>Jarombek Flower Store</h1>
                    </div>
                    <div className="body">

                    </div>
                </div>
            )}
        </Query>
    );
};

export default StoreFront;
