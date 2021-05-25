import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import { TextInputField, Avatar, Button, Pane, Label, Textarea } from 'evergreen-ui';
import styles from "./styles/NewEditContact.module.css";
import DefaultAvatar from '../images/defaultAvatar.jpeg';

const NewContact = ({onNewContactAdd}) => {
    const [name, setName] = useState('');
    const [reasonForKnowing, setReasonForKnowing] = useState('');
    const [education, setEducation] = useState('');
    const [work, setWork] = useState('');
    const [hometown, setHometown] = useState('');
    const [birthday, setBirthday] = useState('mm/dd/----');
    const [interests, setInterests] = useState('');
    const [mutualFriends, setMutualFriends] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');

    const history = useHistory();

    function handleFormSubmit(e) {
        e.preventDefault();

        let id = Date.now() + "_" + name.split(' ').join('_');
        let contactInfo = {
            name, reasonForKnowing, education, work, hometown, birthday, interests, mutualFriends, additionalInfo,
            createdAt: Date.now(), id
        }

        onNewContactAdd(contactInfo);

        history.push('/');
        window.scrollTo(0, 0);
    }

    return (
        <div className={styles.content_container}>
            <div className={styles.avatar_container}>
                {name ? (
                    <Avatar className={styles.avatar} name={name} size={150} color='green' marginRight={16} />
                    ) : (<Avatar className={styles.avatar} src={DefaultAvatar} size={150} marginRight={16} />)}
            </div>
            <div className={styles.form_container}>
                <form className={styles.contact_form} onSubmit={handleFormSubmit}>
                    <h1>New Contact</h1>
                    <TextInputField
                        label="Name"
                        required
                        placeholder="Enter a name"
                        value={name}
                        width="50vh"
                        onChange={e => setName(e.target.value)}
                    />
                    <TextInputField
                        label="How do you know this person?"
                        placeholder="e.g. Met in a college accounting class"
                        value={reasonForKnowing}
                        width="50vh"
                        onChange={e => setReasonForKnowing(e.target.value)}
                    />
                    {/* TODO: fix the datepicker below so it only show the month and day, not the year */}
                    <TextInputField
                        label="Birthday"
                        placeholder="When is their birthday?"
                        value={birthday}
                        width="50vh"
                        type="date"
                        onChange={e => setBirthday(e.target.value)}
                    />
                    <TextInputField
                        label="Hometown"
                        placeholder="Where are they from?"
                        value={hometown}
                        width="50vh"
                        onChange={e => setHometown(e.target.value)}
                    />
                    <TextInputField
                        label="What do they do for work?"
                        placeholder="Job Title, Company, etc."
                        value={work}
                        width="50vh"
                        onChange={e => setWork(e.target.value)}
                    />
                    <TextInputField
                        label="Education"
                        placeholder="Where did they go to school?"
                        value={education}
                        width="50vh"
                        onChange={e => setEducation(e.target.value)}
                    />
                    <TextInputField
                        label="What have they expressed interest in?"
                        placeholder="e.g. New tech trends, career moves, etc."
                        value={interests}
                        width="50vh"
                        onChange={e => setInterests(e.target.value)}
                    />
                    <TextInputField
                        label="Do you have any mutual friends?"
                        placeholder="e.g. We both know John Smith"
                        value={mutualFriends}
                        width="50vh"
                        onChange={e => setMutualFriends(e.target.value)}
                    />
                    <Pane>
                        <Label htmlFor="textarea" marginBottom={4} display="block">Additional Notes</Label>
                        <Textarea 
                            id="textarea" 
                            placeholder="Anything else that would be useful to remember?"
                            value={additionalInfo}
                            onChange={e => setAdditionalInfo(e.target.value)}
                        />
                    </Pane>
                    {/* TODO: restyle the Button better so it's not absolute positioning */}
                    <Button
                        type="submit"
                        className={styles.create_btn} 
                        marginRight={16} 
                        appearance="primary" 
                        intent="success"
                        //isLoading={true}
                    >Create</Button>
                </form>
            </div>
        </div>
    )
}

export default NewContact;
