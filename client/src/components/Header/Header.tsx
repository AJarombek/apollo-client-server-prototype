/**
 * Reusable component representing the header for the application.
 * @author Andrew Jarombek
 * @since 8/20/2020
 */

import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import NotifyCount from "../NotifyCount/NotifyCount";
import {useHistory} from "react-router-dom";

const handleScroll = (ref: React.RefObject<any>, setStickyHeader: (isSticky: boolean) => void) => {
    if (ref.current) {
        setStickyHeader(ref.current.getBoundingClientRect().top <= -100);
    }
};

interface IProps {
    cartSize: number;
    bodyRef: React.RefObject<any>;
}

const Header: React.FunctionComponent<IProps> = ({ cartSize, bodyRef }) => {
    const history = useHistory();

    const [stickyHeader, setStickyHeader] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('scroll', () => handleScroll(bodyRef, setStickyHeader));

        return () => {
            window.removeEventListener('scroll', () => handleScroll(bodyRef, setStickyHeader));
        };
    }, []);

    return (
        <>
            <div
                className={
                    classNames("header-nav", stickyHeader ? "header-sticky" : "header-dry")
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
