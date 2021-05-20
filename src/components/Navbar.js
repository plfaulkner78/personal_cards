import React from 'react';
import styles from "./styles/Navbar.module.css";

const Navbar = () => {
    return (
        <div className={styles.navbar_container}>
            <p style={{marginBottom: 0, marginTop: 0}}>Navbar</p>
            {/* <h1 className={styles.test}>Hey man</h1> */}
        </div>
    )
}

export default Navbar;
