import React, { useState } from "react";
import "../css/bootstrap.min.css";
import CommentsList from "./AllComments";
import EditBlog from "./EditBlog";
// import { useHistory } from "react-router-dom";

const BlogModal = ({
  blog,
  setSelectedBlog,
  error,
  setError,
  blogToEditID,
  editBlog,
  ...props
}) => {
  const { title, description, author, date, reactions } = blog;

  return (
    <>
      {error && !blogToEditID && (
        <div {...props}>
          <div className="container-fluid border-bottom pb-2 d-flex justify-content-around mt-3">
            <h5>{error}</h5>
            <button
              className="btn btn-outline-danger"
              onClick={() => setError(null)}
            >
              X
            </button>
          </div>
        </div>
      )}
      {blog && !error && !blogToEditID && (
        <div {...props}>
          <div className="container-fluid border-bottom pb-2 d-flex justify-content-around mt-3">
            <h3>{title}</h3>
            <button
              className="btn btn-outline-danger"
              onClick={() => setSelectedBlog(null)}
            >
              X
            </button>
          </div>
          <div className="w-sm-50 w- 75 ml-3 font-italic mt-2">
            <p>{description}</p>
          </div>
          <div className="container-fluid text-center mt-3">
            <h6 className="font-weight-lighter">
              Published by {author} on {date}
            </h6>
          </div>
          <div className="container-fluid">
            <CommentsList comments={reactions.comments} />
          </div>
        </div>
      )}
      {blog && !error && blogToEditID && (
        <div {...props}>
          <EditBlog
            blog={blog}
            setSelectedBlog={setSelectedBlog}
            editBlog={editBlog}
            setError={setError}
            {...props}
          />
        </div>
      )}
    </>
  );
};

export default BlogModal;
