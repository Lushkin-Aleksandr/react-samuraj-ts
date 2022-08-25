import React from 'react';
import styles from '../../cssModules/Navbar.module.css'
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li className={styles.item}>
                    <NavLink to={'/profile'} activeClassName={styles.activeItem}>
                        Profile
                    </NavLink>
                </li>
                <li className={styles.item}>
                    <NavLink to={'/dialogs'} activeClassName={styles.activeItem}>
                        Messages
                    </NavLink>
                </li>
                <li className={styles.item}>
                    <NavLink to={'/news'} activeClassName={styles.activeItem}>
                        News
                    </NavLink>
                </li>
                <li className={styles.item}>
                    <NavLink to={'/music'} activeClassName={styles.activeItem}>
                        Music
                    </NavLink>
                </li>
                <li className={styles.item}>
                    <NavLink to={'/settings'} activeClassName={styles.activeItem}>
                        Settings
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;