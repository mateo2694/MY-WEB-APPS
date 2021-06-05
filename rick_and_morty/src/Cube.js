import React from 'react';
import './Cube.css';
import loading from './assets/loading.gif';
import heartbeat from './assets/icon-heartbeat.png';
import question from './assets/icon-question.png';
import skull from './assets/icon-skull.png';
import warning from './assets/icon-warning.png';


function Cube(props) {
    let statusIcon = warning;
    let status = 'Warning';

    return (
        <div className='character'>
            <div className='cube'>
                <img className='character__image' src={loading} alt='Loading' />
                <div className='character__info text--small text--contrast'>
                    ID: {props.id}<br />{props.name}
                    <img className='character__status' src={statusIcon} alt={status} />
                </div>
            </div>
        </div>
    );
}

export default Cube;