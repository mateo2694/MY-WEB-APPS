import React from 'react';
import './Footer.css';
import Link from './Link.js';


function Footer(props) {
    return (
        <footer className='footer lateral-padding'>
            Powered by <Link link='https://rickandmortyapi.com/' text='The Rick and Morty API' />
        </footer>
    );
}

export default Footer;