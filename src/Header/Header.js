import React from 'react';
import logo from '../logo.svg';
import './Header.scss';


function Header(props) {
    return (
        <header className="Header">
            <img src={logo} alt="logo-insta" className="logo"/>
        </header>
    );
}

export default Header;