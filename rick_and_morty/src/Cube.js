import React from 'react';
import './Cube.css';
import loading from './assets/loading.gif';
import warning from './assets/icon-warning.png';


function Cube(props) {
    return (
        <div className='character'>
            <div className='cube'>
                <img className='character__image' src={loading} alt='Loading' />
                <div className='character__info text--small text--contrast'>
                    <img className='character__status' src={warning} alt='Warning' />
                </div>
            </div>
        </div>
    );
}

export default Cube;