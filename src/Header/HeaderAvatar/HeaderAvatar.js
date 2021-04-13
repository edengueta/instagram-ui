import React, { useContext } from 'react';
import Avatar from '../../common/Avatar/Avatar';
import './HeaderAvatar.scss'
import { UserContext } from '../../user-context';
import { Link } from 'react-router-dom';

function HeaderAvatar() {

    const { user } = useContext( UserContext );

    return (
        <div className="HeaderAvatar ">
            <Link className="nav-link" to={'/profile/' + user.username}>
                <Avatar size="sm" image={user.avatar}/>
                <span className="mx-2 d-none d-md-inline">{ user.username }</span>
            </Link>
        </div>
    );
}

export default HeaderAvatar;