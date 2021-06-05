import React from 'react';
import './Main.css';
import Target from './Target.js';
import Board from './Board.js';


function Main(props) {
    return (
        <main className='main lateral-padding'>
            <Target name='Mateo' />
            <Board cubes={14} onGridMount={props.onGridMount} />
        </main>
    );
}

export default Main;