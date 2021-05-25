import React from 'react';
import {useParams} from "react-router-dom";

const ContactDetails = ({contacts}) => {
    const params = useParams();

    const contact = contacts.filter(item => item.id == params.id)[0];

    return (
        <div>
            <h1>This is the contact's id: {params.id}</h1>
            <h1>This is the contact's Name: {contact.name}</h1>
        </div>
    )
}

export default ContactDetails;
