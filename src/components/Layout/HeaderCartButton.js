import React, { useContext } from "react";

import CartContext from "../../store/cart-context";
import CartIcon from '../Cart/CartIcon'
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const cartContext = useContext(CartContext);
    const numOfCartItems = cartContext.items.reduce((current, item) => {
        return current + item;
    }, 0)
    return (
        <button className={styles.button} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numOfCartItems}</span>
        </button >
    )
}

export default HeaderCartButton