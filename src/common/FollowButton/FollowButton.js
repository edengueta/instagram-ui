import { useContext, useEffect, useState } from 'react';
import { UserService } from '../../services/user.service';
import { UserContext } from '../../user-context';

import './FollowButton.scss';


function FollowButton({userId ,followers, setFollowers}) {

    const { user } = useContext( UserContext );
    const ownUserId= user._id;
    const[isFollow, setFollow]= useState(false);

    useEffect ( ()=> {
                setFollow ( followers.includes(ownUserId) );
                console.log("---did set---" + isFollow );

    },[followers]);


    async function toggleFollow() {

        try{
            if (!isFollow) {
                const user = await UserService.follow(userId);
                setFollowers(user.followers);
                setFollow(true);   

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
                                {console.log("---render--- state- " + isFollow +". includes: " + followers.includes(ownUserId) + followers.length)}
                            </button>
                        }
                    </div>
                }
            </>
    );
}

export default FollowButton;