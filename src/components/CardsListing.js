import React from 'react';
import styles from "./styles/CardsListing.module.css";
import PreviewCard from "./PreviewCard";
import {Link} from "react-router-dom";

const testArr = [
    {"name": "Steve", "details": "zookeeper", id: 1},
    {"name": "Jane", "details": "lawyer", id: 2}
];

const CardsListing = () => {
    return (
        <div className={styles.listing_container}>
            {testArr.map(item => (
                <Link to={`/details/${item.id}`} key={item.id}>
                    <PreviewCard info={item} />
                </Link>
            ))}
        </div>
    )
}

export default CardsListing;
