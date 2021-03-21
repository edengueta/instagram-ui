import "./Comments.scss";
import CommentAdd from './CommentAdd/CommentAdd';
import Comment from "./Comment/Comment";
import { useEffect, useState } from "react";
import { PostService } from "../../services/post.service";


function Comments({postId}) {

    const [comments,setComments] = useState([]);


    useEffect(()=>{
        async function getComments(){
            try{
                const commentsArr = await PostService.getComments(postId);
                setComments(commentsArr);
            }catch(err){
                console.log(err)
            } 
        }
        getComments()
        
    },[postId]);

    function onCommentAdd(comment){
        setComments([...comments, comment])
    }
    function isManyComments(){
        if (comments.length > 8) {
            return true
        }
        return false
    }

    return (
        <div className="Comments">
            <CommentAdd postId={postId} onCommentAdd={onCommentAdd}/>
            { comments.map( comment => <Comment key={comment._id} comment={comment}/> ) }
        </div>
    );
}

export default Comments;





