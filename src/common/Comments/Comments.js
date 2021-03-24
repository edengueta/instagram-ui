import "./Comments.scss";
import CommentAdd from './CommentAdd/CommentAdd';
import Comment from "./Comment/Comment";
import { useEffect, useState } from "react";
import { PostService } from "../../services/post.service";


function Comments({ postId , setCommentsCount }) {

    const [comments,setComments] = useState([]);

    useEffect(()=>{
        async function getComments(){
            try{
                const commentsArr = await PostService.getComments(postId);
                setComments(commentsArr);
                setCommentsCount(commentsArr.length);

            }catch(err){
                console.log(err)
            } 
        }
        getComments()
        
    },[postId,setCommentsCount]);

    function onCommentAdd(comment){
        setCommentsCount(comments.length + 1 );
        setComments([...comments, comment]);
    }

    return (
        <div className="Comments">
            <CommentAdd postId={postId} onCommentAdd={onCommentAdd}/>
            { comments.map( comment => <Comment key={comment._id} comment={comment}/> ) }
        </div>
    );
}

export default Comments;





