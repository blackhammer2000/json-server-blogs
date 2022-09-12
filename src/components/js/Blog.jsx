import React from "react";
import "../css/bootstrap.min.css";
import "../css/font-awesome-4.7.0/css/font-awesome.css";
import "../css/blog.css";

const Blog = ({ blog }) => {
  const { id, author, description, title } = blog;
  return (
    <article className="container-fluid border col mb-3">
      <button className="delete btn btn-outline-danger">
        <i className="fa fa-trash"></i>
      </button>
      <button className="edit btn btn-outline-primary">
        <i className="fa fa-edit"></i>
      </button>
      <div className="container-fluid">
        <h3>
          {id}: {title}
        </h3>
      </div>
      <div className="container-fluid">
        <p>{description}</p>
      </div>
      <div className="container-fluid">
        <h6>Written by {author}</h6>
      </div>
    </article>
  );
};

export default Blog;
