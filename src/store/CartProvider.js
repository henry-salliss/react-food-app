import ReactContext from './cart-context';
import React from 'react';

const CartProvider = props => {
    const addItemHandler = (item) => { }

    const removeItemHandler = (id) => { }


    const cartContext = {
        items: [],
        quanitity: 0,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
    };

    return (
        <ReactContext.Provider value={cartContext}>
            {props.children}
        </ReactContext.Provider>
    )
};

export default CartProvider;