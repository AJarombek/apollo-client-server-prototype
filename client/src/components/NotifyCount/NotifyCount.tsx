/**
 * Component for a notification circle with the number of notifications displayed.  In this case,
 * a "notification" is an item in the users cart.
 * @author Andrew Jarombek
 * @since 8/1/2020
 */

import React from 'react';

interface IProps {
    count?: number
}

const NotifyCount: React.FunctionComponent<IProps> = ({ count = 0 }) => {
    return (
        <div className="notify-count">
            <p>{count}</p>
        </div>
    );
};

export default NotifyCount;
