import React, { useContext } from "react";

import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
    const cartContext = useContext(CartContext);

    const addToCartHandler = (amount) => {
        cartContext.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: amount,
        });
    };

    return (
        <li className={styles.meal}>
            <h3>{props.name}</h3>
            <p className={styles.description}>{props.description}</p>
            <p className={styles.price}>{"£" + props.price.toFixed(2)}</p>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
            </div>
        </li>
    );
};

export default MealItem;
