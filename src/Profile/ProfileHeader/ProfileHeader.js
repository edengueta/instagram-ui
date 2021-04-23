import React, { useContext, useEffect, useState } from 'react';
import { UserService } from '../../services/user.service';
import './ProfileHeader.scss'
import Avatar from '../../common/Avatar/Avatar';
import { BiPencil } from 'react-icons/bi';
import FollowButton from '../../common/FollowButton/FollowButton';
import { UserContext } from '../../user-context';
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import './popup.scss'

import UploadAvatar from './UploadAvatar/UploadAvatar'

function ProfileHeader({ username, postsCount}) {

    const { user } = useContext( UserContext );

    const[requestedUser, setRequestedUser]= useState({});
    const[followers, setFollowers]=useState([]);

    useEffect ( ()=> {

        async function getUser() {
            try {
                const user= await UserService.get(username);
                setRequestedUser(user);
                setFollowers(user.followers);

            } catch(err) {
                console.log(err)
            }
        }
        getUser()

    },[username]);

    function isOwnProfile(){
        if (requestedUser._id !== user._id) {
            return false
        }
        return true
    }
    return (
        <div className="ProfileHeader">
            <div className="profile-image">
                { isOwnProfile() &&
                <Popup trigger={<div className="upload-icon"><BiPencil/></div>} position="center center" modal lockScroll>
                    {
                        close => ( <UploadAvatar close={close}/>)
                    }
                </Popup>
                // <Link to="/avatar">
                //     <div className="upload-icon"><BiPencil/></div>
                // </Link>
                }
                <Avatar image={requestedUser.avatar} size="lg"/>
            </div>
            <div className="profile-info">
                <h2 className="profile-username">{requestedUser.username}</h2>
                <div className="profile-numbers">
                    <p><span className="numbers">{postsCount}</span> posts</p>
                    <p><span className="numbers">{followers.length}</span> followers</p>    
                </div>
            </div>
            <FollowButton setFollowers={setFollowers} userId={requestedUser._id} followers={followers}/>
        </div>
    );
}

export default ProfileHeader;