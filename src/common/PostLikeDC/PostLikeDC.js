import React, { useContext, useEffect, useState } from 'react';
import './PostLikeDC.scss';
// import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { PostService } from '../../services/post.service';
import { UserContext } from '../../user-context';
        

function PostLikeDC({postId, likes, isDoubleClicked, setIsDoubleClick}) {
        
    const { user } = useContext( UserContext );
    const [isLiked, setLike] = useState(likes.includes(user._id));


    useEffect ( ()=> {
        
        if (isDoubleClicked){
            likeToggle();
            setIsDoubleClick(false);
        }
        
    },[isDoubleClicked,likes,likeToggle]);

    function likeToggle(){
        if (!isLiked) {
           addLike(); 
        } else {
            removeLike();
        };
        setLike(!isLiked);
        console.log(isLiked)

    }

    async function addLike(){
        try{
            const res=await PostService.like(postId);
            console.log("added"); 
        }catch(err){
            console.log(err)
        }
    }

    async function removeLike(){
        try{
            const res=await PostService.unlike(postId, user._id);
            console.log("removed");
        }catch(err){
            console.log(err)
        }

    }

    return (
                <span className="PostLikeDC" onClick={likeToggle}>
                    {/* {!isLiked && <AiOutlineHeart className="like-button unliked"/>}
                    {isLiked && <AiFillHeart className="like-button liked"/>} */}
                </span>

    );
}

export default PostLikeDC;
