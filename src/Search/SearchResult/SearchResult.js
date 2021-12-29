import React, { useContext } from 'react';
import './SearchResult.scss';
import Avatar from '../../common/Avatar/Avatar';
import Username from '../../common/Username/Username';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import FollowButton from '../../common/FollowButton/FollowButton';
import { UserContext } from '../../user-context';


function SearchResult({data}) {
    const { user } = useContext( UserContext );
    const ownUserId= user._id;

    function isOwnProfile(){
        if (ownUserId !== data._id) {
            return false
        }
        return true
    }

    return (
        <div className="SearchResult">
            <Link to={"/profile/" + data.username}>
                <div className={`user-result ${isOwnProfile() && "own-user"}`}>
                    <p className="date">Signed up <Moment fromNow>{data.createdAt}</Moment></p>
                    <Avatar size="md" image={data.avatar} link={data.username}/>
                    <Username className="mx-2" username={data.username}/>
                    <p className="bio">{data.bio}</p>     
                </div>
            </Link>
            <FollowButton userId={data._id} followers={data.followers}/>
        </div>

    );
}

export default SearchResult;