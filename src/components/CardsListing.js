import React from 'react';
import styles from "./styles/CardsListing.module.css";
import PreviewCard from "./PreviewCard";

const CardsListing = ({contacts}) => {
    return (
        <div className={styles.content_container}>
            <h1>Sort by section</h1>
            <div className={styles.list_container}>
                {contacts.map(item => (
                    <PreviewCard info={item} key={item.id} />
                ))}
            </div>
        </div>
    )
}

export default CardsListing;
