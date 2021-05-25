import styles from "./styles/CardsListing.module.css";
import PreviewCard from "./PreviewCard";
import { Button } from 'evergreen-ui';

const CardsListing = ({contacts, addSampleData}) => {
    return (
        <div className={styles.content_container}>
            <h1>Sort by section</h1>
            <div className={styles.list_container}>
                {contacts.length > 0 ? (
                    contacts.map(item => <PreviewCard info={item} key={item.id} />)
                ) : (<>
                {/* TODO: style this better */}
                    <h1>You don't have any contacts!</h1>
                    <h2>Add contacts to get started</h2>
                    <h2>Or click below to generate sample data.</h2>
                    <Button onClick={addSampleData}>Generate Sample Data</Button>
                </>)}
            </div>
        </div>
    )
}

export default CardsListing;
