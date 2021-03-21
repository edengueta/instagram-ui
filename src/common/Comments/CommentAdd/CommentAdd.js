import React, { useContext, useState } from 'react';
import { BiCommentAdd } from 'react-icons/bi';

import { PostService } from '../../../services/post.service';
import { UserContext } from '../../../user-context';
import "./CommentAdd.scss"


function CommentAdd({postId, onCommentAdd}) {

    const { user } = useContext( UserContext );
    const [content,setContent] =useState("");

    async function submit(e) {
        e.preventDefault();
        try {
            const comment = await PostService.createComment(postId,content);
            onCommentAdd(comment);
        } catch(err){
            console.log(err);
        }
        setContent("");
    }

    function submitByEnter(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit(e);
          }
    }


    return (
        <div className="CommentAdd">
            <form onSubmit={submit} >
                <BiCommentAdd className="icon" />
                <textarea
                    rows="1"
                    onKeyDown={submitByEnter}
                    placeholder={ "Reply as " + user.username}
                    onChange={ (e) => setContent(e.target.value) }
                    value={ content }
                    required>
                </textarea>
                <button className="btn" type="submit" disabled={!content}>Post</button>
            </form>
        </div>
    );
}

export default CommentAdd;