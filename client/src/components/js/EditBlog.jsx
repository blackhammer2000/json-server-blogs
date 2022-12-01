import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditBlog = ({ blog, setSelectedBlog, setError, editBlog }) => {
  const navigate = useNavigate();
  const { title, description, author } = blog;

  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editAuthor, setEditAuthor] = useState(author);

  return (
    <form onSubmit={(e) => submitEdit(e)}>
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
          className="form-control bg-dark"
          onChange={(e) => updateState(e, setEditTitle)}
          required
        />
      </div>
      <div className="form-group container">
        <label htmlFor="">Description</label>
        <textarea
          type="text"
          value={editDescription}
          className="form-control bg-dark"
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
          className="form-control bg-dark"
          onChange={(e) => updateState(e, setEditAuthor)}
          required
        />
      </div>
      <div className="form-group container text-center mt-3">
        <button type="submit" className="btn btn-outline-info w-75 text-center">
          Edit blog
        </button>
      </div>
    </form>
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

      // navigate(-1);

      window.location.pathname.includes("home")
        ? window.location.pathname.replace("home", "")
        : window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  }
};

export default EditBlog;
