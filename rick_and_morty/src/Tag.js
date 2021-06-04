import React from 'react';
import './Tag.css';


function Tag(props) {
    return (
        <span className={'text--small ' + props.tagType}>{props.content}</span>
    );
}

export default Tag;