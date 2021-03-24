import React, { useContext, useEffect, useState } from 'react';
import './PostLike.scss';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { PostService } from '../../services/post.service';
import { UserContext } from '../../user-context';
        

function PostLike({postId, likesCount}) {
        
    const { user } = useContext( UserContext );

    const [isLiked, setLike] = useState(false);
    const [counter, setCounter] = useState(likesCount);


    useEffect(()=> {

        async function getIsLiked() {
            try{
                const res=await PostService.isLiked(postId, user._id);
                if (!res) {
                    setLike(false);
                    return;
                }
                setLike(true);
            }catch(err){
                console.log(err)
            }
        }
        getIsLiked();
        
    },[postId]);

    
    function likeToggle(){
        if (!isLiked) {
           addLike(); 
        } else {
            removeLike()
        };
        setLike(!isLiked);
    }

    async function addLike(){
        try{
            await PostService.like(postId, user._id);
        }catch(err){
            console.log(err)
        }
        console.log("added"); 
        setCounter(counter+1);
    }

    async function removeLike(){
        try{
            await PostService.unlike(postId, user._id);
        }catch(err){
            console.log(err)
        }
        console.log("removed");
        setCounter(counter-1);
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
