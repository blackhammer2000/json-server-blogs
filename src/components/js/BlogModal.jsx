import React, { useState } from "react";
import "../css/bootstrap.min.css";

const BlogModal = ({
  blog,
  setSelectedBlog,
  error,
  setError,
  blogToEditID,
  ...props
}) => {
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editAuthor, setEditAuthor] = useState("");

  if (!blog) return null;
  const { title, description, author, date } = blog;

  setEditTitle(title);
  setEditDescription(description);
  setEditAuthor(author);

  return (
    <>
      {error && !blog && !blogToEditID && (
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
        </div>
      )}
      {blog && !error && blogToEditID && (
        <form {...props} onSubmit={(e) => submitEdit(e)}>
          <div className="container border-bottom pb-2 d-flex justify-content-around mt-3">
            <h3>Edit Blog</h3>
            <button
              className="btn btn-outline-danger"
              onClick={() => setSelectedBlog(null)}
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
            />
          </div>
          <div className="form-group container">
            <label htmlFor="">Author</label>
            <input
              type="text"
              value={editAuthor}
              className="form-control"
              onChange={(e) => updateState(e, setEditAuthor)}
            />
          </div>
          <button className="btn btn-outline-info w-50 text-center">
            Edit blog
          </button>
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
        `http://localhost:8000/blog/${blog.id}`,
        patchConfigurations
      );
      if (!res.ok) {
        throw new Error("Server Error, Could Not Find Resources To Patch...");
      }
      console.log(`Blog ${blog.id} successfully edited...`);
    } catch (error) {
      setError(error.message);
    }
  }
};

export default BlogModal;
