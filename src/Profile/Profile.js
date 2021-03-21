import React, { useEffect, useState } from 'react';
import './Profile.scss';
import { UserService } from '../services/user.service';
import PostImage from './PostImage/PostImage';
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
                return;
            }
        } catch (err){
            console.log('something went wrong please try again');
        }
    }
    getPost();

},[username])


    return (
        <div className="Profile">
            <ProfileHeader username={username} postsCount={posts.length}/>
            <hr/>
            <div className="gallery">
                {
                    posts.map(post => {
                        return <PostImage image={post.image} key={post._id} id={post._id}/>
                    })
                }
            </div>
        </div>
    );
}

export default Profile;