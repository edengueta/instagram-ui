import Avatar from "../../Avatar/Avatar";
import CreatedAt from "../../CreatedAt/CreatedAt";
import Username from "../../Username/Username";
import "./Comment.scss"

function Comment({comment}) {


return (
        <div className="Comment">
            <Avatar size="sm" image={comment.user.avatar} link={comment.user.username}/>
            <Username className="mx-2" username={comment.user.username}/>
            <span className="content">{comment.content}</span>
            <CreatedAt date={comment.createdAt} link="#"/>
        </div>
    );
}

export default Comment;