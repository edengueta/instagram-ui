import { useContext, useEffect, useState } from 'react';
import { UserService } from '../../services/user.service';
import { UserContext } from '../../user-context';

import './FollowButton.scss';


function FollowButton({userId}) {

    const { user } = useContext( UserContext );
    const ownUserId= user._id;
    const[isFollow, setFollow]= useState(null);


    useEffect ( ()=> {

        async function getIsFollow() {
            if (ownUserId === userId) {
                return;
            }
            try {
                setFollow ( await UserService.isFollow(userId) );

            } catch(err) {
                console.log(err)
            }
        }
        getIsFollow()

    },[userId]);


    async function toggleFollow() {

        try{
            if (!isFollow) {
                await UserService.follow(userId);
                setFollow(true);   
                return
            }
            await UserService.unfollow(userId);
            setFollow(false);   

        } catch(err){
            console.log(err)
        }
    }
    function isOwnProfile(){
        if (ownUserId !== userId) {
            return false
        }
        return true
    }
    return (<> { !isOwnProfile() &&
                    <div className="FollowButton">
                        {
                            <button onClick={toggleFollow} className={ `btn ${!isFollow ? "follow-btn" : "unfollow-btn"}` }>
                                {!isFollow ? "Follow" : "Unfollow"}
                            </button>
                        }
                    </div>
                }
            </>
    );
}

export default FollowButton;