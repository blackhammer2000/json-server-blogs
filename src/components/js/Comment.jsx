import React from "react";
import "../css/bootstrap.min.css";
import "../css/font-awesome-4.7.0/css/font-awesome.css";
import "../css/comment.css";

const Comment = () => {
  return (
    <form className="form container-fluid d-flex justify-content-center align-items-center">
      <div className="form-group w-100 row mt-2 border">
        <input
          className="border-0 pl-2"
          type="text"
          placeholder="Add a comment..."
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
