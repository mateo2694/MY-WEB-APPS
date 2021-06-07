import React from 'react';
import './Bubble.css';
import loading from './assets/loading.gif';
import bursting from './assets/stars-bursting.gif';


function Bubble(props) {
    const burstingEffect = props.isBursting ?
        <img className='stars-bursting-effect' src={bursting} alt='Stars bursting effect' /> :
        null;

    const character = props.isBursting ?
        <img className='target-character__image scale-up-animation' src={props.character.image} alt={props.altText} /> :
        <img className='target-character__image' src={loading} alt='Loading' />;

    return (
        <div className='target-character float-animation'>
            {character}
            {burstingEffect}
        </div>
    );
}

export default Bubble;