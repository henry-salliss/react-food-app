import ReactContext from "./cart-context";
import React from "react";
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === 'TEST') {
        console.log('runs ');
    }

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
    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'CLEAR') {
        return defaultCartState;
    }
    return defaultCartState;
};


const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: "ADD", item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: "REMOVE", id });
    };

    const clearCartHandler = () => {
        dispatchCartAction({ type: 'CLEAR' })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    };

    return (
        <ReactContext.Provider value={cartContext}>
            {props.children}
        </ReactContext.Provider>
    );
};

export default CartProvider;
