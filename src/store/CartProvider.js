import ReactContext from "./cart-context";
import React from "react";
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedItems = state.items.concat(action.item);
        const updatedTotal =
            state.totalAmount + action.item.price * action.item.amount;

        return {
            items: updatedItems,
            totalAmount: updatedTotal,
        };
    }
    //   if ((action.type = "REMOVE")) {
    //   }
    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addItemHandler = (item) => {
        dispatchCartAction({ type: "ADD", item });
    };

    const removeItemHandler = (id) => {
        dispatchCartAction({ type: "REMOVE", id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
    };

    return (
        <ReactContext.Provider value={cartContext}>
            {props.children}
        </ReactContext.Provider>
    );
};

export default CartProvider;
