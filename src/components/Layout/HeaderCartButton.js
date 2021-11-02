import React, { useContext, useEffect, useState } from "react";

import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
    const cartContext = useContext(CartContext);

    const [btnAnimated, setBtnAnimated] = useState(false);

    const numOfCartItems = cartContext.items.reduce((current, item) => {
        return current + item.amount;
    }, 0);

    const btnClasses = `${styles.button} ${btnAnimated ? styles.bump : ''}`

    useEffect(() => {
        if (cartContext.items.length === 0) return;
        setBtnAnimated(true);

        const timer = setTimeout(() => {
            setBtnAnimated(false)
        }, 300);

        return () => {
            clearTimeout(timer)
        }
    }, [cartContext.items])


    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
