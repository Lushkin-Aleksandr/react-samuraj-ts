import React from 'react';
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";


type PropsType = {
    isAuth: boolean,
    login: string | null
}

const Header: React.FC<PropsType> = (props) => {
    return (
        <header className={styles.header}>
            <img className={styles.logo} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png" alt=""/>
            <div className={styles.loginBlock}>
                {props.isAuth
                    ? props.login
                    : <NavLink to={'login'}>Login</NavLink>}
            </div>
        </header>
    );
};

export default Header;