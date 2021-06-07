import React from 'react';
import './Header.css';
import logo from './assets/logo-rick-and-morty-explorer.svg';
import Tag from './Tag.js';


function Header(props) {
    let tagType = props.serverStatus === 'UP' ?
        'tag--right' :
        props.serverStatus === 'DOWN' ?
            'tag--wrong' :
            'tag--neutral';

    return (
        <header className='header lateral-padding'>
            <img className='logo' src={logo} alt='Rick and Morty Explorer logo' />
            <ul className='header__list'>
                <li className='list__item text--emphasis text--large'>
                    The Rick and Morty API <span className='text--focus hue-animation'>Random Explorer</span>
                </li>
                <li className='list__item'>
                    API server status: <Tag tagType={tagType} content={props.serverStatus} />
                </li>
                <li className='list__item'>
                    Characters: <Tag tagType='tag--neutral' content={props.numberOfCharacters} />
                </li>
            </ul>
        </header>
    );
}

export default Header;