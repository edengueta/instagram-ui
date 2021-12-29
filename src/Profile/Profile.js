import React, { useEffect, useState } from 'react';
import './Profile.scss';
import { UserService } from '../services/user.service';
import PostPreview from './PostPreview/PostPreview';
import { useParams } from 'react-router-dom';
import ProfileHeader from './ProfileHeader/ProfileHeader';


function Profile() {

    const {username} = useParams();
    const [posts, setPosts] = useState([]);

useEffect( ()=> {

    async function getPost() {
        try {
            const posts =  await UserService.getPosts(username);
            if (posts) {
                setPosts(posts);
                // console.log(posts)
                return;
            }
        } catch (err){
            console.log('something went wrong please try again ',err);
        }
    }
    getPost();

},[username])


    return (
        <div className="Profile">
            <ProfileHeader username={username} postsCount={posts.length} posts={posts}/>
            <hr/>
            <div className="gallery">
                {
                    posts.map(post => {
                        return <PostPreview
                        key={post._id}
                        username={username}
                        image={post.image}
                        id={post._id}
                        createdAt={post.createdAt}
                        caption={post.caption}/>
                    })
                }
            </div>
        </div>
    );
}

export default Profile;