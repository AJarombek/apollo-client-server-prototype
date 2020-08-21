/**
 * Reusable component representing the header for the application.
 * @author Andrew Jarombek
 * @since 8/20/2020
 */

import React from 'react';
import classNames from "classnames";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import NotifyCount from "../NotifyCount/NotifyCount";
import {useHistory} from "react-router-dom";

interface IProps {
    cartSize: number;
    stickyHeader: boolean;
}

const Header: React.FunctionComponent<IProps> = ({ cartSize, stickyHeader }) => {
    const history = useHistory();

    return (
        <>
            <div
                className={
                    classNames("header", stickyHeader ? "header-sticky" : "header-dry")
                }
            >
                <h1>Jarombek Flower Store</h1>
                <div className="cart">
                    <div className="cart-icon" onClick={() => history.push("/checkout")}>
                        <ShoppingCartOutlinedIcon/>
                        <p>Cart</p>
                    </div>
                    {!!cartSize && <NotifyCount count={cartSize} />}
                </div>
            </div>
            {stickyHeader && <div className="hidden"> </div>}
        </>
    );
};

export default Header;
