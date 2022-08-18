import React from 'react';
import styles from '../../cssModules/Header.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
            <img className={styles.logo} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png" alt=""/>
        </header>
    );
};

export default Header;