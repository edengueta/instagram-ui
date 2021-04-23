import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo2.svg';
import './Header.scss';
import HeaderAvatar from './HeaderAvatar/HeaderAvatar';
import Menu from './Menu/Menu';


function Header(props) {
	return (
		<header className="Header">
			<nav className="navbar navbar-expand-lg py-0 container-md">
				<Link to="/">
					<img src={logo} alt="logo-insta" className="navbar-brand logo"/>
				</Link>
				<Menu/>
				<div className="nav">
					<HeaderAvatar />
				</div>
			</nav>
		</header>
	);

}

export default Header;


