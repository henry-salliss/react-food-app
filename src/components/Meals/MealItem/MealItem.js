import React from "react";

import styles from './MealItem.module.css';
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
    return (
        <li className={styles.meal}>
            <h3>{props.name}</h3>
            <p className={styles.description}>
                {props.description}
            </p>
            <p className={styles.price}>
                {'£' + props.price.toFixed(2)}
            </p>
            <div>
                <MealItemForm />
            </div>
        </li>
    )
};

export default MealItem;