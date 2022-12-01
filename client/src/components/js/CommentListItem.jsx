import React from "react";

const CommentListItem = ({ comment }) => {
  return (
    <div className="container d-flex flex-column border border-dark mt-2 p-2 bg-dark font-italic">
      <div className="container text-black-50">
        <h5>{comment.name}</h5>
      </div>
      <div className="container mt-1 text-white">
        <p>{comment.body}</p>
      </div>

      <div className="container-fluid comment_reactions row border-top px-0 pt-2 ml-1">
        <button className="btn btn-outline-primary border-light">
          <i className="fa fa-thumbs-up"></i>{" "}
          <span>
            {comment.comment_reactions.comment_likes.length > 0
              ? comment.comment_reactions.comment_likes.length
              : "Like"}
          </span>
        </button>
        <button className="btn btn-outline-primary border-light ml-3">
          <i className="fa fa-reply"></i> <span>Reply</span>
        </button>
      </div>
      <div className="container border-botttom d-flex justify-content-start align-items-center mt-2 px-2">
        <h6>{comment.time_posted}</h6>
      </div>
    </div>
  );
};

export default CommentListItem;
