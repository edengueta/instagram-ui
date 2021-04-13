import React from 'react';
import { Link } from 'react-router-dom';
import './PostImage.scss';


function PostImage({image, id, username}) {
    return (
        <div className="PostImage">
            <Link  to={'/post/' + id}>
                <div className="post-info"></div>
                <img src={image} alt={username +"'s post"}/>
            </Link>   
        </div>

    );
}

export default PostImage;