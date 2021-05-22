import React from 'react';
import styles from "./styles/Navbar.module.css";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={styles.navbar_container}>
            <Link to="/">
                <p className={styles.home_logo}>Navbar</p>
            </Link>
        </div>
    )
}

export default Navbar;
