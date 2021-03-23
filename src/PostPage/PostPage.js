import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import Avatar from '../common/Avatar/Avatar';
import Comments from '../common/Comments/Comments';
import CreatedAt from '../common/CreatedAt/CreatedAt';
import PostLike from '../common/PostLike/PostLike';
import Username from '../common/Username/Username';
import { PostService } from '../services/post.service';
import { BiArrowToBottom } from "react-icons/bi";

import './PostPage.scss';

function PostPage() {

    const {id} = useParams();
    const history = useHistory();
    const [post,setPost] = useState(null);
    const [isFade,setFade] = useState(true);


    useEffect(()=> {

        async function getPost() {
            try {
                const post = await PostService.get(id);
                if (post) {
                    setPost(post);

                    return;
                }
                history.push('/')
            } catch (err){
                console.log('something went wrong please try again');
            }
        }
        getPost();

    },[id,history])

    function onScroll(e){
        if (e.target.scrollTop > 10) {
            setFade (false);
            return;
        }
        setFade (true);
    }

    return (
        <>
        { post && (

            <article className="PostPage mx-auto d-flex flex-column flex-lg-row col col-lg-10">
                <div className="image-wrapper">
                    <img className="image" src={'data:; base64,' + post.image} alt={post.user.username +"'s photo"}/>
                </div>
                <div className="post-details col col-lg-4 ">
                    <div className="header">
                        <Avatar size="md" image={post.user.avatar} link={post.user.username}/>
                        <div className="username-date">
                            <Username username={post.user.username}/>
                            <CreatedAt link={"/post/"+post._id} date={post.createdAt}/>
                        </div>
                        <div className="likes">
                            <PostLike postId={post._id} likesCount={post.likes.length}/>
                        </div>
                    </div>
                    { post.caption &&
                        <div className="caption">
                            <span>{post.caption}</span>
                        </div>
                    }
                    <div onScroll={onScroll} className="comments">
                        <Comments postId={post._id}/>
                    </div>
                    { isFade && <div className={"fade-out"}></div> }
                </div>
            </article>

        )}
        </>
    );
}

export default PostPage;