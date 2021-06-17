import {useState} from "react";
import styles from "./styles/CardsListing.module.css";
import PreviewCard from "./PreviewCard";
import { Button, Tablist, Tab, NewPersonIcon } from 'evergreen-ui';
import {Link} from "react-router-dom";

const CardsListing = ({contacts, addSampleData, searchTerm, sortAlphabetically, sortByDate, sortByBirthday}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const tabs = ['Alphabetical', 'Most Recent', 'Soonest Birthday'];

    function handleTabSelect(index) {
        setSelectedIndex(index)
        if (index === 0) {
            sortAlphabetically();
        } else if (index === 1) {
            sortByDate();
        } else {
            sortByBirthday();
        }
    }

    return (
        <div className={styles.content_container}>
            <div className={styles.list_container}>
                <div className={styles.sort_container}>
                    <h2 className={styles.sort_title}>Sort by: </h2>
                    <div className={styles.tabs_container}>
                        <Tablist>
                            {tabs.map((tab, index) => (
                                <Tab
                                    key={tab}
                                    id={tab}
                                    disabled={contacts.length === 0}
                                    onSelect={() => handleTabSelect(index)}
                                    isSelected={index === selectedIndex}
                                    aria-controls={`panel-${tab}`}
                                >
                                    {tab}
                                </Tab>
                            ))}
                        </Tablist>
                    </div>
                </div>
                {contacts.length > 0 ? (
                    contacts.map(item => <PreviewCard info={item} key={item.id} />)
                ) : (<>
                    {searchTerm.length === 0 ? (<>
                        <h1>You don't have any contacts!</h1>
                        <h2>Add new contacts to get started.</h2>
                        <Link style={{textDecoration: 'none'}} to='/newContact'>
                            <Button iconBefore={NewPersonIcon}>Add contact</Button>
                        </Link>
                        <h2>Or click below to generate sample contacts.</h2>
                        <Button onClick={addSampleData}>Generate Sample Data</Button>
                    </>) : (
                        <div style={{marginTop: '10%'}}>
                            <h1>No Results</h1>
                        </div>
                    )}
                </>)}
            </div>
        </div>
    )
}

export default CardsListing;
