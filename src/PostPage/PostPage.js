import React, { useEffect, useState } from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { useHistory, useParams } from 'react-router-dom';
import Avatar from '../common/Avatar/Avatar';
import Comments from '../common/Comments/Comments';
import CreatedAt from '../common/CreatedAt/CreatedAt';
import PostLike from '../common/PostLike/PostLike';
import Username from '../common/Username/Username';
import { PostService } from '../services/post.service';
import {Image, Transformation} from 'cloudinary-react';


import './PostPage.scss';

function PostPage() {

    const {id} = useParams();
    const history = useHistory();
    const [post,setPost] = useState(null);
    const [commentsCount, setCommentsCount]=useState(0);

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


    return (
        <>
        { post && (

            <article className="PostPage mx-auto d-flex flex-column flex-lg-row col col-lg-10">
                <div className="image-wrapper">
                    <Image className="image" cloudName="edengueta" publicId={post.image}>
                        <Transformation height="800" width="800" crop="fill" />
                    </Image>
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
                        <div><BiCommentDetail className="comments-count"/> {commentsCount}</div>
                    </div>
                    { post.caption &&
                        <div className="caption">
                            <span>{post.caption}</span>
                        </div>
                    }
                    <div className="comments">
                        <Comments setCommentsCount={setCommentsCount} postId={post._id}/>
                    </div>

                </div>
            </article>

        )}
        </>
    );
}

export default PostPage;