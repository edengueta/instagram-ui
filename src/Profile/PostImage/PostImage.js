import React from 'react';
import { Link } from 'react-router-dom';
import './PostImage.scss';
import { Image,Transformation } from 'cloudinary-react';


function PostImage({image, id}) {
    return (
        <div className="PostImage">
            <Link  to={'/post/' + id}>
                <div className="post-info"></div>
                <img src={'data:; base64,' + image} alt=""/>
            </Link>   
        </div>

    );
}

export default PostImage;