import React from "react";
import "../css/bootstrap.min.css";

const BlogModal = ({ blog, setSelectedBlog, error, ...props }) => {
  if (!blog) return null;

  const { title, description, author } = blog;
  return (
    <>
      {error && (
        <div {...props}>
          <div className="container-fluid border-bottom pb-2 d-flex justify-content-around mt-3">
            <h5>{error}</h5>
          </div>
        </div>
      )}
      {blog && !error && (
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
            <h6 className="font-weight-lighter">Published by {author}</h6>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogModal;
