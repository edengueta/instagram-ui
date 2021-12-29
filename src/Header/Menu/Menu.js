import React from 'react';
import './Menu.scss'
import { Link } from 'react-router-dom';
import { BiImageAdd, BiHomeCircle , BiSearchAlt} from 'react-icons/bi';
import Popup from 'reactjs-popup';
import PostCreate from "../../PostCreate/PostCreate";
import { isMobile } from "react-device-detect";



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
                    <Popup trigger={<div ><BiImageAdd className="post-icon"/></div>} nested={!isMobile} modal={isMobile} lockScroll>
                        {
                            close => ( <PostCreate close={close}/>)
                        }
                    </Popup>
                </li>
            </ul>    
    );
}

export default Menu;