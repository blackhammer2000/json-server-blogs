import React from "react";
import CommentListItem from "./CommentListItem";

const CommentsList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => {
        return <CommentListItem comment={comment} key={comment.id} />;
      })}
    </div>
  );
};

export default CommentsList;
