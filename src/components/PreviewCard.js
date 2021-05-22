import React from 'react';

const PreviewCard = ({info}) => {
    return (
        <div>
            <h1>{info.name}</h1>
            <h3>{info.details}</h3>
        </div>
    )
}

export default PreviewCard;