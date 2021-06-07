import React from 'react';
import './Main.css';
import Target from './Target.js';
import Board from './Board.js';


function Main(props) {
    let heading = props.error === null ?
        <Target character={props.wantedCharacter} isBursting={props.isBursting} /> :
        <h1 className='text--large text-animation'>{props.error.message}</h1>;

    return (
        <main className='main lateral-padding'>
            {heading}
            <Board characters={props.characters} onGridMount={props.onGridMount} onCubeClick={props.onCubeClick} />
        </main>
    );
}

export default Main;