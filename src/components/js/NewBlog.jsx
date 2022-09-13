import React, { useState } from "react";
import "../css/bootstrap.min.css";
import "../css/form.css";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  return (
    <fieldset className="border-top mt-3 p-3 main">
      <legend className="text-center w-50">
        <h4>Create New Blog</h4>
      </legend>
      <form
        className="form mt-1 container border px-5 py-4"
        onSubmit={(e) => submitBlogData(e, title, description, author)}
      >
        <div className="form-group">
          <label htmlFor="">
            {" "}
            <h5>Title</h5>
          </label>

          <input
            type="text"
            value={title}
            placeholder="Enter Blog Title"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">
            {" "}
            <h5>Description</h5>
          </label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Blog Description"
            className="form-control"
            rows={6}
          ></textarea>
        </div>
        <div className="form-group">
          <label className="font-weight-bold" htmlFor="">
            <h5>Author</h5>
          </label>

          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter Blog Author"
            className="form-control"
          />
        </div>
        <button className="btn-outline-primary btn w-100 mt-3">
          Save blog
        </button>
      </form>
    </fieldset>
  );

  async function submitBlogData(e, title, description, author) {
    e.preventDefault();

    const blogPost = {
      title,
      description,
      author,
    };
    blogPost.id = crypto.randomUUID();
    blogPost.date = new Date().toLocaleDateString();

    const requestConfigurations = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogPost),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/blogs",
        requestConfigurations
      );

      if (!response.ok) {
        throw new Error("Could not find resources...");
        // const data = await response.json();
        // console.log(data);
      }
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }
};

export default NewBlog;
