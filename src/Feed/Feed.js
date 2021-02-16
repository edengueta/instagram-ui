import React, { useEffect, useState } from 'react';
import { PostService } from '../services/post.service';
import './Feed.scss'

function Feed() {
const [posts,setPosts]= useState([])

    useEffect(() => {

        async function getPosts() {
            const posts = await PostService.feed()
            setPosts(posts);
        }
        getPosts();

    },[])

    return (
        <div>
            Feed:
            {posts}
        </div>
    );
}

export default Feed;