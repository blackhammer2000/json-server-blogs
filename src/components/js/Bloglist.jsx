import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs }) => {
  return (
    <div className="container-fluid">
      {blogs.map((blog) => {
        return <Blog blog={blog} key={blog.id} />;
      })}
    </div>
  );
};

export default BlogList;
