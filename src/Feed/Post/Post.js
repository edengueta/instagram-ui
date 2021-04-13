import React, { useState } from 'react';
import './Post.scss'
import Avatar from '../../common/Avatar/Avatar';
import Username from '../../common/Username/Username';
import PostLike from '../../common/PostLike/PostLike';
import CreatedAt from '../../common/CreatedAt/CreatedAt';


function Post({post}) {

    const [isLiked, setLiked] = useState(false);

// check double tap
    let timeout;
    let lastTap = 0;
    function checkDoubleTap(e){
        let currentTime = new Date().getTime();
        let tapLength = currentTime - lastTap;
        clearTimeout(timeout);
        if (tapLength < 400 && tapLength > 0) {
            onDoubleClick(e);
        } else {
            timeout = setTimeout(function() {
                clearTimeout(timeout);
            }, 400);
        }
        lastTap = currentTime;
    }
// end check

    function onDoubleClick(e){
        e.preventDefault();
        setLiked(!isLiked);
        console.log(isLiked);
    }

    return (
            <article className="Post mx-auto ">
                <div className="header row g-2">
                    <Avatar size="md" image={post.user.avatar} link={post.user.username}/>
                    <div className="col-10">
                        <Username username={post.user.username}/>
                    </div>
                </div>
                <div onDoubleClick={onDoubleClick} onTouchEnd={checkDoubleTap} className="image-wrapper">
                    <img className="image" src={post.image} alt={post.user.username +"'s post"}/>
                </div>
                <div className="footer">
                    { post.caption &&
                        <p className="caption">
                            <Username username={post.user.username}/>
                            {" " +post.caption}
                        </p>
                    }
                    <PostLike postId={post._id} likesCount={post.likes.length} />
                    <CreatedAt link={"/post/"+post._id} date={post.createdAt}/>
                </div>
            </article>
    );
}
export default Post;