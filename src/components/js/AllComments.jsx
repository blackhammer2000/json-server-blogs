import React from "react";

const CommentsList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => {
        return <CommentListItem key={comment.id} />;
      })}
    </div>
  );
};

export default CommentsList;
