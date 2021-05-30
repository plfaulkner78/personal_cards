import React, {useState, useEffect, useRef} from 'react';
import {useHistory} from "react-router-dom";
import { TextInputField, Avatar, Button, Pane, Label, Textarea, SelectMenu, DeleteIcon, Tooltip } from 'evergreen-ui';
import styles from "./styles/NewEditContact.module.css";
import DefaultAvatar from '../images/defaultAvatar.jpeg';

const NewContact = ({onNewContactAdd}) => {
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

    const [birthDayError, setBirthDayError] = useState(false);
     
    const history = useHistory();
    const birthdayRef = useRef();

    function handleFormSubmit(e) {
        e.preventDefault();

        // If you entered a birthMonth but not a date, you won't be able to submit
        if (birthMonth !== "" && birthDate === "") {
            setBirthDayError(true);
            birthdayRef.current.scrollIntoView();
            return;
        }

        let contactInfo = {
            name, reasonForKnowing, education, work, hometown, birthMonth, birthDate, interests, mutualFriends, 
            additionalInfo, createdAt: Date.now(), id: `${Date.now()}_${Math.floor(Math.random() * 100)}`
        }

        onNewContactAdd(contactInfo);

        console.log("Newly created contact: ", contactInfo);

        history.push('/');
        window.scrollTo(0, 0);
    }

    // Whenever birthMonth changes, set the dateOptions for that unique month
    // e.g. when user selects February, set dateOptions to an array of ints from 1-29
    useEffect(() => {
        let rangeArr = [...Array(days_in_months[birthMonth]).keys()].map(x => ++x);
        setDateOptionsArr(rangeArr);
    }, [birthMonth]);

    // Need this mapping so I know how many days to display in the dates select menu
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
            <div className={styles.avatar_container}>
                {name ? (
                    <Avatar className={styles.avatar} name={name} size={150} color='green' marginRight={16} />
                    ) : (<Avatar className={styles.avatar} src={DefaultAvatar} size={150} marginRight={16} />)}
            </div>
            <form className={styles.form_container} onSubmit={handleFormSubmit}>
                <div className={styles.contact_form}>
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

                    <label className={styles.birthday_label}>Birthday</label>
                    <div ref={birthdayRef} className={styles.birthday_container}>
                        <div>
                            <SelectMenu
                                title="Select month"
                                options={Object.keys(days_in_months).map((label) => ({ label, value: label }))}
                                selected={birthMonth}
                                onSelect={(item) => {
                                    setBirthDate('');
                                    setBirthMonth(item.value);
                                    setBirthDayError(false);
                                }}
                            >
                                <Button type="button">
                                    {birthMonth || "Select month..."}
                                </Button>
                            </SelectMenu>
                        </div>
                        <div className={styles.birthDateInput}>
                            <SelectMenu
                                title="Select date"
                                required
                                options={dateOptionsArr.map((label) => ({ label, value: label }))}
                                selected={birthDate}
                                onSelect={(item) => {
                                    setBirthDate(item.value);
                                    setBirthDayError(false);
                                }}
                            >   
                                <Tooltip content="Choose a date or remove birthday" isShown={birthDayError}>
                                    <Button type="button" disabled={birthMonth === ""}>
                                        {birthDate || "Select date..."}
                                    </Button>
                                </Tooltip>
                            </SelectMenu>
                        </div>
                        <div className={styles.delete_icon_container}>
                            {birthMonth && (
                                <Tooltip position="right" content="Remove birthday">
                                    <DeleteIcon
                                        color="#101840"
                                        onClick={() => {
                                            setBirthDayError(false);
                                            setBirthDate('');
                                            setBirthMonth('');
                                        }}
                                    />
                                </Tooltip>
                            )}
                        </div>
                    </div>

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
                    <div className={styles.submit_btn_container}>
                        <Button
                            type="submit"
                            marginRight={16} 
                            appearance="primary" 
                            intent="success"
                        >Create</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NewContact;
