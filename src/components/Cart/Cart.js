import React, { useContext, useState } from "react";

import CartContext from "../../store/cart-context";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem/CartItem";
import CartForm from "./Form/CartForm";

const Cart = (props) => {
    const cartContext = useContext(CartContext);
    const [orderClicked, setOrderClicked] = useState(false);
    const [ordering, setOrdering] = useState(false);
    const [ordered, setOrdered] = useState(false);

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

    // send user data and order to the backend
    const submitOrderHandler = async (userData) => {
        setOrdering(true)

        const request = await fetch(
            "https://food-order-app-e6381-default-rtdb.firebaseio.com/orders.json",
            {
                method: "POST",
                body: JSON.stringify({
                    user: userData,
                    orderItems: cartContext.items,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await request.json();
        setOrdering(false);
        setOrdered(true);
        cartContext.clearCart();
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

    const modalActions = (
        <React.Fragment>
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
        </React.Fragment>
    )

    const modalJSX = (
        <React.Fragment>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {!orderClicked && modalActions}
            {orderClicked && <CartForm
                onCancelFood={hideCheckoutForm}
                onOrder={submitOrderHandler}
            />}
        </React.Fragment>
    );

    const loadingJSX = <p>Sending order...</p>;

    const foodOrderedJSX = <React.Fragment>
        <p>Order successfully placed!</p>
        <div className={styles.actions}>
            <button className={styles.button} onClick={props.onHideCart}>
                Close
            </button>
        </div>
    </React.Fragment>

    return (
        <Modal onClick={props.onHideCart}>
            {!ordering && !ordered && modalJSX}
            {ordering && loadingJSX}
            {!ordering && ordered && foodOrderedJSX}
        </Modal>
    );
};

export default Cart;