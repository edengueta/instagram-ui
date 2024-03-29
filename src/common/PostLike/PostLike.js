import React, { useContext, useEffect, useState } from 'react';
import './PostLike.scss';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { PostService } from '../../services/post.service';
import { UserContext } from '../../user-context';
        

function PostLike({postId, likesCount, likes, isDoubleClicked, setIsDoubleClick}) {
        
    const { user } = useContext( UserContext );
    const [isLiked, setLike] = useState(likes.includes(user._id));
    const [counter, setCounter] = useState(likesCount);


    useEffect ( ()=> {
        
        if (isDoubleClicked){
            likeToggle();
            setIsDoubleClick(false);
        }
        
    },[isDoubleClicked,likes]);

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
            setCounter(res.likes.length);
        }catch(err){
            console.log(err)
        }
    }

    async function removeLike(){
        try{
            const res=await PostService.unlike(postId, user._id);
            console.log("removed");
            setCounter(res.likes.length);
        }catch(err){
            console.log(err)
        }

    }

    return (
            <div className="PostLike">
                <span onClick={likeToggle}>
                    {!isLiked && <AiOutlineHeart className="like-button unliked"/>}
                    {isLiked && <AiFillHeart className="like-button liked"/>}
                </span>
    
                <span className="counter">{counter}</span>
            </div>     
    );
}

export default PostLike;
