import React from 'react';
import { Link } from 'react-router-dom';
import './Username.scss'

function Username(props) {

    const {username} = props;

    return (
            <Link className= {"Username " + props.className} to={"/profile/" + username}>
                {username}
            </Link>
    );
}

export default Username;