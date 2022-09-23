import React from "react";
import "../css/bootstrap.min.css";
import "../css/font-awesome-4.7.0/css/font-awesome.css";

const Comment = () => {
  return (
    <form className="form">
      <div className="form-group row">
        <input type="text" placeholder="Add a comment" required />
        <button className="btn btn-outline-info">
          <i className="fa fa-send"></i>
        </button>
      </div>
    </form>
  );
};

export default Comment;
