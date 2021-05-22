import React from 'react';
import {useParams} from "react-router-dom";

// TODO: get the details from local storage in the useEffect hook.
const ContactDetails = () => {
    const params = useParams();

    return (
        <div>
            <h1>This is the contact's id: {params.id}</h1>
        </div>
    )
}

export default ContactDetails;
