import React from 'react';
import './Link.css';


function Link(props) {
    return (
        <a className='link' href={props.link} target='_blank' rel='noreferrer'>{props.text}</a>
    );
}

export default Link;