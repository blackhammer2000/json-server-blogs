import React from "react";
import Blog from "./Blog";
import "../css/bloglist.css";
// import BlogModal from "./Blog";
// import { useFullBlogData } from "../../hooks/useFullBlogData";

const BlogList = ({ blogs, setError }) => {
  // const { selectedBlogID, setSelectedBlogID } = useFullBlogData();

  return (
    <div className="container-fluid relative">
      {blogs.map((blog, index) => {
        return <Blog blog={blog} index={index} key={blog.id} blogs={blogs} />;
      })}
    </div>
  );

  // function showModal(id) {
  //   setSelectedBlogID(blogs.find((blog) => blog.id === id));
  //   console.log(id);
  // }
};

export default BlogList;
