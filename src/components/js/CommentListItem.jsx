import React from "react";

const CommentListItem = ({ comment }) => {
  return (
    <div className="d-flex flex-column border border-light mt-2">
      <h5>{comment.name}</h5>
      <blockquote>{comment.comment.body}</blockquote>
      <h6>{comment.time_posted}</h6>
    </div>
  );
};

export default CommentListItem;
