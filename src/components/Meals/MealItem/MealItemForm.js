import React, { useRef, useState } from "react";

import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
    // error state
    const [amountIsValid, setAmountIsValid] = useState(false);

    const amountRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();

        const currentAmount = amountRef.current.value;
        const amountNum = +currentAmount;

        // validation
        if (amountNum < 1 || amountNum > 5 || currentAmount.length === 0) {
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(amountNum);
    };

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input
                ref={amountRef}
                label="amount"
                input={{
                    id: "amount_" + props.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button>+ Add</button>
            {!amountIsValid ? <p>Please enter a valid amount</p> : ""}
        </form>
    );
};

export default MealItemForm;
