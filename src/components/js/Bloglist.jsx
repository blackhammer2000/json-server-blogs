import React from "react";
import "../css/bootstrap.min.css";

const Bloglist = ({ blogs }) => {
  return (
    <div className="preview border text-warning">
      {blogs.map((blog, index) => {
        return (
          <div className="container border col">
            <div className="row text-left">
              <h1>
                {index + 1}: {blog.title}
              </h1>
            </div>
            <div className="row text-left">
              <h1>{blog.description}</h1>
            </div>
            <div className="row text-left">
              <h1>Written by {blog.author}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Bloglist;
