import React from 'react';
import styles from "./styles/CardsListing.module.css";
import PreviewCard from "./PreviewCard";

const testArr = [
    {"name": "Steve Jobs", "details": "zookeeper", id: 1},
    {"name": "Jane Jackson", "details": "lawyer", id: 2},
    {"name": "Jane", "details": "lawyer", id: 3},
    {"name": "Jane", "details": "lawyer", id: 4},
    {"name": "Jane", "details": "lawyer", id: 5},
    {"name": "Jane", "details": "lawyer", id: 6},
    {"name": "Jane", "details": "lawyer", id: 7},
    {"name": "Jane", "details": "lawyer", id: 8},
    {"name": "Jane", "details": "lawyer", id: 9},
    {"name": "Jane", "details": "lawyer", id: 10},
    {"name": "Jane", "details": "lawyer", id: 11},
    {"name": "Jane", "details": "lawyer", id: 12},
    {"name": "Jane", "details": "lawyer", id: 13},
    {"name": "Jane", "details": "lawyer", id: 14},
    {"name": "Jane", "details": "lawyer", id: 15},
];

const CardsListing = () => {
    return (
        <div className={styles.content_container}>
            <h1>Sort by section</h1>
            <div className={styles.list_container}>
                {testArr.map(item => (
                    <PreviewCard info={item} key={item.id} />
                ))}
            </div>
        </div>
    )
}

export default CardsListing;
