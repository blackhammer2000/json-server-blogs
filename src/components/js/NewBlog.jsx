import React from "react";
import "../css/bootstrap.min.css";
import "../css/form.css";

const NewBlog = () => {
  return (
    <fieldset className="border-top mt-3 p-3 main">
      <legend className="text-center w-50">
        <h4>Create New Blog</h4>
      </legend>
      <form className="form mt-1 container border px-5 py-4">
        <div className="form-group">
          <label htmlFor="">
            {" "}
            <h5>Title</h5>
          </label>

          <input
            type="text"
            placeholder="Enter Blog Title"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">
            {" "}
            <h5>Description</h5>
          </label>
          <textarea
            type="text"
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
};

export default NewBlog;
