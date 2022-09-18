import React, { useState } from "react";
import "../css/bootstrap.min.css";
import "../css/font-awesome-4.7.0/css/font-awesome.css";
import "../css/blog.css";
import { setBlogModal } from "../../utilities/setBlogModal";
import BlogModal from "./BlogModal";
import Reaction from "./Reaction";
// import { Routes, Route, Link } from "react-router-dom";

const Blog = ({ blog, index, deleteBlog, editBlog, blogToEditID }) => {
  const { id, author, description, title, date } = blog;
  const { likes, comments, shares } = blog.reactions;
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [error, setError] = useState(null);
  return (
    <>
      <article
        className="container bg-light py-2 col mb-3"
        onClick={(e) =>
          !e.target.classList.contains("btn" || "fa" || "reactions")
            ? setBlogModal(
                id,
                setSelectedBlog,
                blogToEditID,
                editBlog,
                setError
              )
            : null
        }
      >
        <button
          className="delete btn btn-outline-danger"
          onClick={() => deleteBlog(id, setError)}
        >
          <i className="fa fa-trash"></i>
        </button>
        <button
          className="edit btn btn-outline-primary"
          onClick={() => {
            editBlog(id);
            setBlogModal(id, setSelectedBlog, blogToEditID, editBlog, setError);
            console.log(blogToEditID);
          }}
        >
          <i className="fa fa-edit"></i>
        </button>
        <div className="container-fluid border-bottom pb-2">
          <h3>
            {index + 1}: {title}...
          </h3>
        </div>
        <div className="w-sm-50 w-75 ml-3 font-italic mt-2">
          <p>
            {description.slice(0, Math.round(description.length / 3))}...{" "}
            <span className="text-info">Read More</span>
          </p>
        </div>
        <div className="container-fluid">
          <h6 className="font-weight-lighter">
            Published by {author} on {date}
          </h6>
        </div>
        <div className="reactions container-fluid d-flex justify-content-center  mt-4">
          <div className="w-75 row justify-content-center w-sm-100">
            <Reaction reaction="likes" reactionData={likes} blog={blog} />
            <Reaction reaction="comments" reactionData={comments} blog={blog} />
            <Reaction reaction="shares" reactionData={shares} blog={blog} />
            {/* <div className="likes w-25 text-center">
              <button className="btn btn-outline-primary border-light w-75 text-light">
                <i className="fa fa-thumbs-up"></i>
                <span className="likes-count count font-weight-bold ml-2">
                  {likes.lenght
                    ? likes.length < 1000
                      ? likes.length
                      : `${likes.length / 1000}K`
                    : null}
                </span>
              </button>
            </div>
            <div className="comments w-25 text-center">
              <button className="btn btn-outline-primary border-light w-75 text-light">
                <i className="fa fa-comment"></i>{" "}
                <span className="comments comments-count font-weight-bold ml-2">
                  {comments.length
                    ? comments.length < 1000
                      ? comments.length
                      : `${comments.length / 1000}K`
                    : null}
                </span>
              </button>
            </div>
            <div className="share w-25 text-center">
              <button className="btn btn-outline-primary border-light w-75 text-light">
                <i className="fa fa-share"></i>{" "}
                <span className="comments comments-count font-weight-bold ml-2">
                  {comments.length
                    ? comments.length < 1000
                      ? comments.length
                      : `${comments.length / 1000}K`
                    : null}
                </span>
              </button>
            </div> */}
          </div>
        </div>
      </article>
      {(selectedBlog || error) && (
        <BlogModal
          className="modal pb-2 d-flex flex-column"
          blog={selectedBlog}
          setSelectedBlog={setSelectedBlog}
          error={error}
          editBlog={editBlog}
          setError={setError}
          blogToEditID={blogToEditID}
        />
      )}
    </>
  );
};

export default Blog;
