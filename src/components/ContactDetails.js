import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from "react-router-dom";
import styles from "./styles/NewEditContact.module.css";
import { TextInputField, Avatar, Button, Pane, Label, Textarea, Spinner, SelectMenu } from 'evergreen-ui';

const ContactDetails = ({contacts, setContactState}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [contact, setContact] = useState({});

    const [name, setName] = useState('');
    const [reasonForKnowing, setReasonForKnowing] = useState('');
    const [education, setEducation] = useState('');
    const [work, setWork] = useState('');
    const [hometown, setHometown] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [interests, setInterests] = useState('');
    const [mutualFriends, setMutualFriends] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');

    const [dateOptionsArr, setDateOptionsArr] = useState([]);

    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        let filtered_contact = contacts.filter(item => item.id == params.id)[0];

        if (filtered_contact == undefined) {
            // If the id param in the url doesn't exist in the contact, redirect to 404 page.
            history.push('/error');
        } else {

            window.scrollTo(0, 0);
            
            setContact(filtered_contact);
            setStateFromContact(filtered_contact);
            setIsLoading(false);
        }
    }, []);

    // Whenever birthMonth changes, set the dateOptions for that unique month
    // e.g. when user selects February, set dateOptions to an array of ints from 1-29
    useEffect(() => {
        let rangeArr = [...Array(days_in_months[birthMonth]).keys()].map(x => ++x);
        setDateOptionsArr(rangeArr);
    }, [birthMonth]);

    function setStateFromContact(contact_obj) {
        setName(contact_obj.name);
        setReasonForKnowing(contact_obj.reasonForKnowing);
        setEducation(contact_obj.education);
        setWork(contact_obj.work);
        setHometown(contact_obj.hometown);
        setBirthMonth(contact_obj.birthMonth);
        setBirthDate(contact_obj.birthDate);
        setInterests(contact_obj.interests);
        setMutualFriends(contact_obj.mutualFriends);
        setAdditionalInfo(contact_obj.additionalInfo);
    }

    function handleCancel() {
        setIsEditing(false);
        setStateFromContact(contact);
    }

    function handleSaveChanges() {
        let updatedContact = {
            ...contact, 
            name, 
            reasonForKnowing, 
            education, 
            work, 
            hometown, 
            birthMonth,
            birthDate, 
            interests, 
            mutualFriends, 
            additionalInfo
        };

        // Update the contacts state array
        let newContactArr = contacts.map(item => {
            if (item.id === updatedContact.id) {
                return updatedContact;
            } else {
                return item
            }
        });

        setContact(updatedContact);
        setContactState(newContactArr);

        setIsEditing(false);
        window.scrollTo(0, 0);
    }

    const days_in_months = {
        "January": 31,
        "February": 29,
        "March": 31,
        "April": 30,
        "May": 31,
        "June": 30,
        "July": 31,
        "August": 31,
        "September": 30,
        "October": 31,
        "November": 30,
        "December": 31
    };

    return (
        <div className={styles.content_container}>
            {isLoading ? (
                <div className={styles.spinner_container}>
                    <Spinner size={50} />
                </div>
            ) : (<>
                <div className={styles.avatar_container}>
                    <Avatar className={styles.avatar} name={contact.name} size={150} marginRight={16} />
                </div>
                <div className={styles.form_container}>
                    <div className={styles.contact_form}>
                        <div className={styles.title_button_container}>
                            <h1>{contact.name}</h1>
                            {isEditing ? (
                                <Button onClick={handleCancel}>Cancel</Button>
                            ) : <Button onClick={() => setIsEditing(true)}>Edit</Button>}
                        </div>
                        <TextInputField
                            label="Name"
                            required
                            disabled={!isEditing}
                            placeholder="Enter a name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            width="50vh"
                        />
                        <TextInputField
                            label="How do you know this person?"
                            placeholder="e.g. Met in a college accounting class"
                            value={reasonForKnowing}
                            onChange={(e) => setReasonForKnowing(e.target.value)}
                            disabled={!isEditing}
                            width="50vh"
                        />

                        <label className={styles.birthday_label}>Birthday</label>
                        <div className={styles.birthday_container}>
                            <div>
                                <SelectMenu
                                    title="Select month"
                                    options={Object.keys(days_in_months).map((label) => ({ label, value: label }))}
                                    selected={birthMonth}
                                    onSelect={(item) => {
                                        setBirthMonth(item.value);
                                        setBirthDate('');
                                    }}
                                >
                                    <Button disabled={!isEditing}>{birthMonth || "Select month..."}</Button>
                                </SelectMenu>
                            </div>
                            <div className={styles.birthDateInput}>
                                <SelectMenu
                                    title="Select date"
                                    options={dateOptionsArr.map((label) => ({ label, value: label }))}
                                    selected={birthDate}
                                    onSelect={(item) => setBirthDate(item.value)}
                                >
                                    <Button disabled={birthMonth === "" || !isEditing}>{birthDate || "Select date..."}</Button>
                                </SelectMenu>
                            </div>
                        </div>
                        
                        {/* <TextInputField
                            label="Birthday"
                            placeholder="When is their birthday?"
                            value={birthday}
                            onChange={e => setBirthday(e.target.value)}
                            width="50vh"
                            disabled={!isEditing}
                            type="date"
                        /> */}

                        <TextInputField
                            label="Hometown"
                            placeholder="Where are they from?"
                            value={hometown}
                            onChange={e => setHometown(e.target.value)}
                            disabled={!isEditing}
                            width="50vh"
                        />
                        <TextInputField
                            label="What do they do for work?"
                            placeholder="Job Title, Company, etc."
                            value={work}
                            onChange={e => setWork(e.target.value)}
                            disabled={!isEditing}
                            width="50vh"
                        />
                        <TextInputField
                            label="Education"
                            placeholder="Where did they go to school?"
                            value={education}
                            onChange={e => setEducation(e.target.value)}
                            disabled={!isEditing}
                            width="50vh"
                        />
                        <TextInputField
                            label="What have they expressed interest in?"
                            placeholder="e.g. New tech trends, career moves, etc."
                            value={interests}
                            onChange={e => setInterests(e.target.value)}
                            disabled={!isEditing}
                            width="50vh"
                        />
                        <TextInputField
                            label="Do you have any mutual friends?"
                            placeholder="e.g. We both know John Smith"
                            value={mutualFriends}
                            onChange={e => setMutualFriends(e.target.value)}
                            disabled={!isEditing}
                            width="50vh"
                        />
                        <Pane>
                            <Label htmlFor="textarea" marginBottom={4} display="block">Additional Notes</Label>
                            <Textarea 
                                id="textarea" 
                                placeholder="Anything else that would be useful to remember?"
                                value={additionalInfo}
                                onChange={e => setAdditionalInfo(e.target.value)}
                                disabled={!isEditing}
                            />
                        </Pane>
                        {/* TODO: restyle the Button better so it's not absolute positioning */}
                        <Button
                            marginRight={16} 
                            appearance="primary" 
                            intent="success"
                            onClick={handleSaveChanges}
                        >Save Changes</Button>
                    </div>
                </div>
                </>
            )}
        </div>
    )
}

export default ContactDetails;
