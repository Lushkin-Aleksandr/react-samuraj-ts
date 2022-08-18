import React from 'react';
import styles from '../cssModules/Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li className={`${styles.item} ${styles.activeItem}`}>Profile</li>
                <li className={styles.item}>Messages</li>
                <li className={styles.item}>News</li>
                <li className={styles.item}>Music</li>
                <li className={styles.item}>Settings</li>
            </ul>
        </nav>
    );
};

export default Navbar;