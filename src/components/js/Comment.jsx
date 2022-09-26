import React, { useState } from "react";
import "../css/bootstrap.min.css";
import "../css/font-awesome-4.7.0/css/font-awesome.css";
import "../css/comment.css";
import { Comment as UserComment } from "../../classes/comment";
import { updateDatabase } from "../../hooks/useReactionData";

const Comment = ({ userData, blog }) => {
  const [comment, setComment] = useState("");

  return (
    <form
      className="form container-fluid d-flex justify-content-center align-items-center"
      onSubmit={(e) => handleCommentSubmit(e, comment, blog, userData)}
    >
      <div className="form-group w-100 row mt-2 border">
        <input
          className="border-0 pl-2"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button className="text-center btn btn-outline-primary border-0">
          <i className="text-light fa fa-send"></i>
        </button>
      </div>
    </form>
  );
};
export default Comment;

async function handleCommentSubmit(e, comment, blog, userData) {
  e.preventDefault();
  const { name, email } = userData;
  const newComment = new UserComment(name, email, comment);

  if (comment) {
    updateDatabase(newComment, blog, "comments", "UPDATE", setData);
  }
}
