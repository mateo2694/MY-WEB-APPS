import React from 'react';
import './Cube.css';
import loading from './assets/loading.gif';
import heartbeat from './assets/icon-heartbeat.png';
import question from './assets/icon-question.png';
import skull from './assets/icon-skull.png';
import warning from './assets/icon-warning.png';


function Cube(props) {
    let statusIcon = warning;
    const { id, name, status, image } = (props.character === null) ?
        { id: null, name: 'Loading', status: 'Warning', image: loading } :
        props.character;

    return (
        <div className='character' >
            <div className='cube'>
                <img className='character__image' src={image} alt={name} />
                <div className='character__info text--small text--contrast'>
                    ID: {id}<br />{name}
                    <img className='character__status' src={statusIcon} alt={status} />
                </div>
            </div>
        </div >
    );
}

export default Cube;