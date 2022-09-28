import React from "react";

const CommentListItem = ({ comment }) => {
  return (
    <div className="container d-flex flex-column border border-light mt-2 p-2">
      <h5>{comment.name}</h5>
      <blockquote>{comment.body}</blockquote>
      <h6>{comment.time_posted}</h6>
      <div className="container-fluid comment_reactions row">
        <button className="btn btn-outline-primary border-light">
          {" "}
          <i className="fa fa-thumbs-up"></i>
          <span>
            {comment.comment_reactions.comment_likes.length > 0
              ? comment.comment_reactions.comment_likes.length
              : null}
          </span>
        </button>
        <button className="btn btn-outline-primary border-light ml-2">
          <i className="fa fa-reply"></i>
          <span>Reply</span>
        </button>
      </div>
    </div>
  );
};

export default CommentListItem;
