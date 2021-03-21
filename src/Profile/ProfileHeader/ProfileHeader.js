import React, { useEffect, useState } from 'react';
import { UserService } from '../../services/user.service';
import './ProfileHeader.scss'
import Avatar from '../../common/Avatar/Avatar';
import FollowButton from '../../common/FollowButton/FollowButton';


function ProfileHeader({ username, postsCount}) {

    const[user, setUser]= useState({})


    useEffect ( ()=> {

        async function getUser() {
            try {
                const user= await UserService.get(username);
                setUser(user);

            } catch(err) {
                console.log(err)
            }
        }
        getUser()

    },[username]);

    return (
        <div className="ProfileHeader">
            <Avatar className="profile-image" image={user.avatar} size="lg"/>
            <div className="profile-info">
                <h2 className="profile-username">{user.username}</h2>
                <div className="profile-numbers">
                    <p><span className="numbers">{postsCount}</span> posts</p>    
                </div>
            </div>
            <FollowButton userId={user._id}/>
        </div>
    );
}

export default ProfileHeader;