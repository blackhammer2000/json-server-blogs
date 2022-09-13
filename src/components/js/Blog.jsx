import React, { useState } from "react";
import "../css/bootstrap.min.css";
import "../css/font-awesome-4.7.0/css/font-awesome.css";
import "../css/blog.css";
import { setBlogModal } from "../../utilities/setBlogModal";
import BlogModal from "./BlogModal";

const Blog = ({ blog, index }) => {
  const { id, author, description, title } = blog;
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [error, setError] = useState(null);
  return (
    <>
      <article
        className="container bg-light py-2 col mb-3"
        onClick={() => setBlogModal(id, setSelectedBlog, setError)}
      >
        <button className="delete btn btn-outline-danger">
          <i className="fa fa-trash"></i>
        </button>
        <button className="edit btn btn-outline-primary">
          <i className="fa fa-edit"></i>
        </button>
        <div className="container-fluid border-bottom pb-2">
          <h3>
            {index + 1}: {title}
          </h3>
        </div>
        <div className="w-sm-50 w- 75 ml-3 font-italic mt-2">
          <p>
            {description.slice(0, Math.round(description.length / 3))}...{" "}
            <span className="text-info">Read More</span>
          </p>
        </div>
        <div className="container-fluid">
          <h6 className="font-weight-lighter">Written by {author}</h6>
        </div>
      </article>
      <BlogModal
        className="modal pb-2 d-flex flex-column"
        blog={selectedBlog}
        setSelectedBlog={setSelectedBlog}
        error={error}
      />
    </>
  );
};

export default Blog;
