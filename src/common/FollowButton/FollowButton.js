import { useContext, useEffect, useState } from 'react';
import { UserService } from '../../services/user.service';
import { UserContext } from '../../user-context';

import './FollowButton.scss';

function FollowButton({userId ,followers, setFollowers}) {

    const { user } = useContext( UserContext );
    const[isFollow, setFollow]= useState(false);

    useEffect ( ()=> {
                setFollow ( followers.includes(user._id) );

    },[followers,user]);


    async function toggleFollow() {

        try{
            if (!isFollow) {
                const user = await UserService.follow(userId);
                setFollow(true);   
                setFollowers(user.followers);

                return
            }
            const user = await UserService.unfollow(userId);
            setFollow(false);
            setFollowers(user.followers);

        } catch(err){
            console.log(err)
        }
    }

    function isOwnProfile(){
        if (user._id !== userId) {
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