import React from 'react';
import './Menu.scss'
import { Link } from 'react-router-dom';
import { BiImageAdd, BiHomeCircle , BiSearchAlt} from 'react-icons/bi';


function Menu() {
    return (
            <ul className="navbar-nav">
                <li className="navbar-item">
                    <Link className="nav-link d-none d-md-block" to="/">
                        <BiHomeCircle/>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link className="nav-link" to="/search">
                        <BiSearchAlt/>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link className="nav-link" to="/post/create">
                        <BiImageAdd/>
                    </Link>
                </li>
            </ul>    
    );
}

export default Menu;