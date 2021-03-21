import React from 'react';
import './SearchResult.scss';
import Avatar from '../../common/Avatar/Avatar';
import Username from '../../common/Username/Username';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';



function SearchResult({user}) {
    return (
        <div className="SearchResult">
            <Link to={"/profile/" + user.username}>
                <div className="user">
                    <Avatar size="md" image={user.avatar} link={user.username}/>
                    <Username className="mx-2" username={user.username}/>
                    <p>{user.bio}</p>     
                    <p className="date">Signed up <Moment fromNow>{user.createdAt}</Moment> </p>
                </div>
            </Link>
        </div>

    );
}

export default SearchResult;