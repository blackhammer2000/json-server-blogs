import React from "react";

const CommentListItem = ({ comment }) => {
  return (
    <div>
      <h5>{comment.name}</h5>
      <br />
      <blockquote>{comment.comment.body}</blockquote>
      <br />
      <h6>{comment.time_posted}</h6>
    </div>
  );
};

export default CommentListItem;
