import React from "react";

import styles from './Header.module.css';
import mealImg from '../../assets/meals.jpg'
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return (
        <React.Fragment>
            <header className={styles.header}>
                <h1>React meals</h1>
                <HeaderCartButton />
            </header>
            <div>
                <img className={styles['main-image']} src={mealImg} alt='food on table' />
            </div>
        </React.Fragment>
    );
};

export default Header;