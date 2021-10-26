import React from "react";

import styles from './Cart.module.css';
import Modal from "../UI/Modal";

const Cart = (props) => {
    const cartItems = <ul className={styles['cart-items']}>{[{ name: 'sushi', price: 24.99, amount: 2 }].map(item => {
        return (<li>{item.name}</li>)
    })}</ul>

    return (
        <Modal onClick={props.onHideCart}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>100</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
                <button className={styles.button}>Order</button>
            </div>
            <div></div>
        </Modal>
    )
}

export default Cart;