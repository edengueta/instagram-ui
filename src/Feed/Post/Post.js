import React, { useState } from 'react';
import './Post.scss'
import Avatar from '../../common/Avatar/Avatar';
import Username from '../../common/Username/Username';
import PostLike from '../../common/PostLike/PostLike';
import CreatedAt from '../../common/CreatedAt/CreatedAt';
import {Image, Transformation} from 'cloudinary-react';




function Post({data}) {

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
                    <Avatar size="md" image={data.user.avatar} link={data.user.username}/>
                    <div className="col-10">
                        <Username username={data.user.username}/>
                    </div>
                </div>
                <div onDoubleClick={onDoubleClick} onTouchEnd={checkDoubleTap} className="image-wrapper">
                    <Image className="image" cloudName="edengueta" publicId={data.image}>
                        <Transformation height="800" width="800" crop="fill" />
                    </Image>
                </div>
                <div className="footer">
                    { data.caption &&
                        <p className="caption">
                            <Username username={data.user.username}/>
                            {" " +data.caption}
                        </p>
                    }
                    <PostLike postId={data._id} likesCount={data.likes.length} />
                    <CreatedAt link={"/post/"+data._id} date={data.createdAt}/>
                </div>
            </article>
    );
}
export default Post;