import ReactContext from "./cart-context";
import React from "react";
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedTotal =
            state.totalAmount + action.item.price * action.item.amount;

        // check if item already exists
        const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const existingItem = state.items[existingItemIndex];

        let newItems;

        // if item is already in cart
        if (existingItem) {
            // update existing item amount to take in new amount + original
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount,
            };
            // find existing item and update it to the new amount of item
            newItems = [...state.items];
            newItems[existingItemIndex] = updatedItem;
        } else {
            newItems = state.items.concat(action.item);
        }
        return {
            items: newItems,
            totalAmount: updatedTotal,
        };
    }
    if ((action.type = "REMOVE")) {
        // get index of existing item
        const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        const existingItem = state.items[existingItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
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
