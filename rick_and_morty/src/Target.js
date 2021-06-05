import React from 'react';
import './Target.css';
import Bubble from './Bubble.js'


function Target(props) {
    return (
        <section>
            <h1 className='text--large text-animation'>
                Can you find <span className='text--focus'>{props.name}</span> ?
            </h1>
            <Bubble />
        </section>
    );
}

export default Target;