import React from 'react';
import './PreviewGallery.scss'

function PreviewGallery({posts, postClicked}) {
    return (
        <div className="PreviewGallery">
        {
            posts.map(post => {
                return <img className="image"
                            key={ post._id }
                            src={ post.image }
                            alt={ post.user.username +"'s post" }
                            onClick={() => postClicked(post.image) } />
            })
        }
		</div>    );
}

export default PreviewGallery;