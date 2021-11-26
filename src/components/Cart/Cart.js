import React, { useContext, useState } from "react";

import CartContext from "../../store/cart-context";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem/CartItem";
import CartForm from "./Form/CartForm";

const Cart = (props) => {
    const cartContext = useContext(CartContext);
    const [orderClicked, setOrderClicked] = useState(false);

    const orderFoodHandler = () => {
        setOrderClicked(true);
    };

    const hideCheckoutForm = () => {
        setOrderClicked(false);
    };

    const cartItemAddHandler = (item) => {
        cartContext.addItem(item);
    };
    const cartItemRemoveHandler = (id) => {
        cartContext.removeItem(id);
    };

    const cartItems = (
        <ul className={styles["cart-items"]}>
            {cartContext.items.map((item) => {
                return (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        amount={item.amount}
                        onAdd={cartItemAddHandler.bind(null, item)}
                        onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    />
                );
            })}
        </ul>
    );

    const totalAmount = `£${cartContext.totalAmount.toFixed(2)}`;

    const hasItems = cartContext.items.length > 0;

    if (!orderClicked)
        return (
            <Modal onClick={props.onHideCart}>
                {cartItems}
                <div className={styles.total}>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
                <div className={styles.actions}>
                    <button className={styles["button--alt"]} onClick={props.onHideCart}>
                        Close
                    </button>
                    {hasItems ? (
                        <button onClick={orderFoodHandler} className={styles.button}>
                            Order
                        </button>
                    ) : (
                        ""
                    )}
                </div>
                <div></div>
            </Modal>
        );

    if (orderClicked)
        return (
            <Modal>
                <CartForm onOrderFood={hideCheckoutForm} />
            </Modal>
        );
};

export default Cart;