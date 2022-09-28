import React, { useState } from "react";
import "../css/bootstrap.min.css";
import CommentsList from "./AllComments";
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

  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editAuthor, setEditAuthor] = useState(author);

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
        <form {...props} onSubmit={(e) => submitEdit(e)}>
          <div className="container border-bottom pb-2 d-flex justify-content-around mt-3">
            <h3>Edit Blog</h3>
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                editBlog(null);
                setSelectedBlog(null);
              }}
            >
              X
            </button>
          </div>
          <div className="form-group container">
            <label htmlFor="">Title</label>
            <input
              type="text"
              value={editTitle}
              className="form-control"
              onChange={(e) => updateState(e, setEditTitle)}
              required
            />
          </div>
          <div className="form-group container">
            <label htmlFor="">Description</label>
            <textarea
              type="text"
              value={editDescription}
              className="form-control"
              rows={6}
              onChange={(e) => updateState(e, setEditDescription)}
              required
            />
          </div>
          <div className="form-group container">
            <label htmlFor="">Author</label>
            <input
              type="text"
              value={editAuthor}
              className="form-control"
              onChange={(e) => updateState(e, setEditAuthor)}
              required
            />
          </div>
          <div className="form-group container text-center mt-3">
            <button
              type="submit"
              className="btn btn-outline-info w-75 text-center"
            >
              Edit blog
            </button>
          </div>
        </form>
      )}
    </>
  );

  function updateState(e, setter) {
    setter(e.target.value);
  }

  async function submitEdit(e) {
    e.preventDefault();
    const newBlog = {
      title: editTitle,
      description: editDescription,
      author: editAuthor,
    };

    const patchConfigurations = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    };

    try {
      const res = await fetch(
        `http://localhost:8000/blogs/${blog.id}`,
        patchConfigurations
      );
      if (!res.ok) {
        throw new Error("Server Error, Could Not Find Resources To Patch...");
      }
      console.log(`Blog ${blog.id} successfully edited...`);

      window.location.pathname.includes("home")
        ? window.location.pathname.replace("home", "")
        : window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  }
};

export default BlogModal;
