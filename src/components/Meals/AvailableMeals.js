import React, { useEffect, useState } from "react";

import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true);
        const fetchMeals = async () => {
            try {
                const request = await fetch(
                    "https://food-order-app-e6381-default-rtdb.firebaseio.com/meals.json"
                );

                const data = await request.json();
                const meals = [];
                for (const meal in data) {
                    meals.push({
                        id: meal,
                        description: data[meal].description,
                        name: data[meal].name,
                        price: data[meal].price,
                    });
                }

                setMeals(meals);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        };

        fetchMeals();
    }, []);

    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
            key={meal.id}
        />
    ));

    return (
        <section className={styles.meals}>
            <Card>
                {isLoading ? <p>Loading...</p> : <ul className={styles.meals}>{mealsList}</ul>}

            </Card>
        </section>
    );
};

export default AvailableMeals;