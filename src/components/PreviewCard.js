import React from 'react';
import styles from "./styles/PreviewCard.module.css";
import {Link} from "react-router-dom";
import { Avatar } from 'evergreen-ui';

// TODO: still need to figure out what to display in details
// perhaps I could make a field called knowFrom which would tell you where you know this
// person from or what their relevance is if necessary (i.e. wouldn't be necessary for a good friend)

const PreviewCard = ({info}) => {
    return (
        <div className={styles.card_container}>
            <div className={styles.avatar_section}>
                <Avatar name={info.name} size={70} marginRight={16} />
            </div>
            <div className={styles.divider_decoration} />  
            <div className={styles.content_section}>
                <h1>{info.name}</h1>
                <p>{info.reasonForKnowing}</p>
                <Link style={{color: '#34b7eb'}} to={`/details/${info.id}`}>
                    <p>Details</p>
                </Link>
            </div>
        </div>
    )
}

export default PreviewCard;