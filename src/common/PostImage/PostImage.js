import React, { useEffect, useState } from 'react';
import './PostImage.scss';
import {  useParams } from 'react-router-dom';
import PostLike from '../PostLike/PostLike';
import PostLikeDC from '../PostLikeDC/PostLikeDC';


function PostImage({post}) {

    const {id} = useParams();


    const [isDoubleClicked, setIsDoubleClick] = useState(false);

    // check double tap
        let timeout;
        let lastTap = 0;
        function checkDoubleTap(e){
            let currentTime = new Date().getTime();
            let tapLength = currentTime - lastTap;
            clearTimeout(timeout);
            if (tapLength < 400 && tapLength > 0) {
                onDoubleClick(e);
                console.log('DC')
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
            setIsDoubleClick(!isDoubleClicked);
        }


    useEffect(()=> {


    },[id])


    return (
        <> {
            post &&
            <div onDoubleClick={onDoubleClick} onTouchEnd={checkDoubleTap} className="PostImage">
                <PostLikeDC postId={post._id} likes={post.likes} setIsDoubleClick={setIsDoubleClick} isDoubleClicked={isDoubleClicked}/>
                <img className="image" src={post.image} alt={post.user.username +"'s post"}/>

            </div>
            } 
        </>
);
}

export default PostImage;