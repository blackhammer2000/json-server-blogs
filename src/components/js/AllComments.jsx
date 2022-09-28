import React from "react";
import CommentListItem from "./CommentListItem";

const CommentsList = ({ comments }) => {
  return (
    <div className="d-flex flex-column">
      {comments.map((comment) => {
        return <CommentListItem comment={comment} key={comment.id} />;
      })}
    </div>
  );
};

export default CommentsList;
