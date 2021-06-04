import React from 'react';
import './Bubble.css';
import loading from './assets/loading.gif';
import bursting from './assets/stars-bursting.gif';


function Bubble(props) {
    return (
        <div className='target-character float-animation'>
            <img className='target-character__image' src={loading} alt='Loading' />
            <img className='stars-bursting-effect' src={bursting} alt='Stars bursting effect' />
        </div>
    );
}

export default Bubble;