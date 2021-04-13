import React, { useEffect, useState } from 'react';
import Post from './Post/Post';
import { PostService } from '../services/post.service';
import './Feed.scss'

function Feed() {
const [posts,setPosts]= useState([])

    useEffect(() => {

        async function getPosts() {
            const posts = await PostService.feed();
            setPosts(posts);
        }
        getPosts();

    },[])

    return (
        <div className='Feed'>
            {
                posts.map(post => {
                    return <Post post={post} key={post._id}/>
                })
            }

        </div>
    );
}

export default Feed;