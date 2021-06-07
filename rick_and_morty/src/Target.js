import React from 'react';
import './Target.css';
import Bubble from './Bubble.js'
import loading from './assets/loading.gif';


function Target(props) {
    let character;
    let altText;

    if (props.character === null) {
        character = {
            name: null,
            image: loading
        };
        altText = 'Loading';
    } else {
        character = props.character;
        altText = character.name;
    }

    return (
        <section>
            <h1 className='text--large text-animation'>
                Can you find <span className='text--focus'>{character.name}</span> ?
            </h1>
            <Bubble isBursting={props.isBursting} character={character} altText={altText} />
        </section>
    );
}

export default Target;