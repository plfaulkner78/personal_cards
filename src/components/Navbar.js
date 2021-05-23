import React from 'react';
import styles from "./styles/Navbar.module.css";
import {Link} from "react-router-dom";
import { SearchInput, Button, NewPersonIcon } from 'evergreen-ui';

const Navbar = ({onSearchInputChange}) => {
    return (
        <div className={styles.navbar_container}>
            <Link className={styles.logo_link} to="/">
                <p className={styles.home_logo}>Personal Cards</p>
            </Link>
            <div className={styles.buttons_container}>
                <Link style={{textDecoration: 'none'}} to='/newContact'>
                    <Button className={styles.add_contact_button} iconBefore={NewPersonIcon}>Add contact</Button>
                </Link>
                <SearchInput
                    onChange={onSearchInputChange}
                    style={{width: '100%'}}
                    placeholder="Search by name"
                />
            </div>
        </div>
    )
}

export default Navbar;
