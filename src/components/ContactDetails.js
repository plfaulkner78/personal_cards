import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from "react-router-dom";
import styles from "./styles/NewEditContact.module.css";
import { TextInputField, Avatar, Button, Pane, Label, Textarea, Spinner } from 'evergreen-ui';

const ContactDetails = ({contacts, setContactState}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [contact, setContact] = useState({});

    const [name, setName] = useState('');
    const [reasonForKnowing, setReasonForKnowing] = useState('');
    const [education, setEducation] = useState('');
    const [work, setWork] = useState('');
    const [hometown, setHometown] = useState('');
    const [birthday, setBirthday] = useState('');
    const [interests, setInterests] = useState('');
    const [mutualFriends, setMutualFriends] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');

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

    function setStateFromContact(contact_obj) {
        setName(contact_obj.name);
        setReasonForKnowing(contact_obj.reasonForKnowing);
        setEducation(contact_obj.education);
        setWork(contact_obj.work);
        setHometown(contact_obj.hometown);
        setBirthday(contact_obj.birthday);
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
            birthday, 
            interests, 
            mutualFriends, 
            additionalInfo
        };

        // Update the contacts state array
        let newContactArr = contacts.map(item => {
            if (item.id == updatedContact.id) {
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
                        {/* TODO: fix the datepicker below so it only show the month and day, not the year */}
                        <TextInputField
                            label="Birthday"
                            placeholder="When is their birthday?"
                            value={birthday}
                            onChange={e => setBirthday(e.target.value)}
                            width="50vh"
                            disabled={!isEditing}
                            type="date"
                        />
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
