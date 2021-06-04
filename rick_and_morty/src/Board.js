import React from 'react';
import './Board.css';
import Cube from './Cube.js';


function Board(props) {
    let content = new Array(props.cubes).fill(null).map((element, i) => <Cube key={i}/>);

    return (
        <section className='grid'>
            {content}
        </section>
    );
}

export default Board;