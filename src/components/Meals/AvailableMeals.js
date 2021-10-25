import React from "react";

import styles from './AvailableMeals.module.css';

const AvailableMeals = () => {
    const meals = [
        {
            id: 'm1',
            name: 'Sushi',
            description: 'Finest fish and veggies',
            price: 22.99,
        },
        {
            id: 'm2',
            name: 'Schnitzel',
            description: 'A german specialty!',
            price: 16.5,
        },
        {
            id: 'm3',
            name: 'Barbecue Burger',
            description: 'American, raw, meaty',
            price: 12.99,
        },
        {
            id: 'm4',
            name: 'Green Bowl',
            description: 'Healthy...and green...',
            price: 18.99,
        },
    ];

    const mealsList = meals.map(meal => <li>{meal.name}</li>)

    return (
        <ul className={styles.meals}>
            {mealsList}
        </ul>
    )
}

export default AvailableMeals;