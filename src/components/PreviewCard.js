import React from 'react';
import styles from "./styles/PreviewCard.module.css";
import {Link} from "react-router-dom";
import { Avatar, Tooltip } from 'evergreen-ui';
import GreenCake from '../images/green_cake.png';
import moment from 'moment';

const PreviewCard = ({info}) => {

    const todayMonth = moment().format("MMMM");
    const todayDate = parseInt(moment().format("DD"));

    return (
        <div className={styles.card_container}>
            <div className={styles.avatar_section}>
                <Avatar name={info.name} size={70} marginRight={16} />
            </div>
            <div className={styles.divider_decoration} />  
            <div className={styles.content_section}>
                <div className={styles.outer_name_container}>
                    <div className={styles.contact_name_container}>
                        <h1 className={styles.contact_name}>{info.name}</h1>
                    </div>
                </div>
                {info.reasonForKnowing ? <p style={{marginTop: '0px'}}>{info.reasonForKnowing}</p> : <></>}
                <Link style={{color: '#34b7eb'}} to={`/details/${info.id}`}>
                    <p>Details</p>
                </Link>
            </div>
            {(todayMonth === info.birthMonth && todayDate === info.birthDate) && (
                <div className={styles.birthday_icon_container}>
                    <Tooltip content={`It's ${info.name}'s birthday today!`}>
                        <img className={styles.cake_icon} src={GreenCake} />
                    </Tooltip>
                </div>
            )}
        </div>
    )
}

export default PreviewCard;