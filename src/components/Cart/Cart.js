import React, { useContext } from "react";

import CartContext from '../../store/cart-context'
import styles from './Cart.module.css';
import Modal from "../UI/Modal";
import CartItem from "./CartItem/CartItem";

const Cart = (props) => {
    const cartContext = useContext(CartContext)

    const cartItemAddHandler = (item) => { }
    const cartItemRemoveHandler = (id) => { }

    const cartItems = <ul className={styles['cart-items']}>{cartContext.items.map(item => {
        return (
            <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
                onAdd={cartItemAddHandler.bind(null, item)}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
            />
        )
    })}</ul>;

    const totalAmount = `£${cartContext.totalAmount.toFixed(2)}`;

    const hasItems = cartContext.items.length > 0;

    return (
        <Modal onClick={props.onHideCart}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
                {hasItems ? <button className={styles.button}>Order</button> : ''}
            </div>
            <div></div>
        </Modal>
    )
}

export default Cart;