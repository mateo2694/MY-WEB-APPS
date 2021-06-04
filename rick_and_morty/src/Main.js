import React from 'react';
import './Main.css';
import Target from './Target.js';
import Board from './Board.js';


function Main(props) {
    return (
        <main className='main lateral-padding'>
            <Target characterName='Mateo'/>
            <Board cubes={48} />
        </main>
    );
}

export default Main;