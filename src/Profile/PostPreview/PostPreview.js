import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import './PostPreview.scss';


function PostPreview({image, id, username, createdAt, caption}) {
    if (caption === "") {
        caption= "No caption"
    }
    return (
        <div className="PostPreview">
            <Link to={'/post/' + id}>
                <img src={image} alt={username +"'s post"}/>
                <div className="post-info">
                    <p className='caption'>  {caption} </p>
                    <p className="date">Posted <Moment fromNow>{createdAt}</Moment></p>
                </div>
            </Link>


        </div>

    );
}

export default PostPreview;